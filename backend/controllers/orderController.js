// backend/controllers/orderController.js

import ProductModel from '../models/ProductModel.js';
import OrderModel from '../models/OrderModel.js';
import mongoose from 'mongoose';

// Place order (no change from your provided code)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, address, phone, paymentMethod } = req.body;

        if (!userId || !items || items.length === 0 || !address || !phone || !paymentMethod) {
            return res.status(400).json({ success: false, message: 'Missing required fields for order placement.' });
        }

        if (typeof address !== 'object' || !address.line1 || !address.city || !address.pincode) {
            return res.status(400).json({ success: false, message: 'Invalid address format. Address must be an object with line1, city, and pincode.' });
        }

        const orderItems = await Promise.all(
            items.map(async (item) => {
                const product = await ProductModel.findById(item.productId);
                if (!product) throw new Error(`Product not found: ${item.productId}`);

                return {
                    product: product._id,
                    vendor: product.Vendor, // Ensure product.Vendor is the vendor's ObjectId stored correctly
                    quantity: item.quantity,
                    status: 'Pending',
                };
            })
        );

        const totalAmount = orderItems.reduce((sum, item) => {
            const originalProduct = items.find(i => i.productId.toString() === item.product.toString());
            return sum + (originalProduct ? originalProduct.Price * item.quantity : 0);
        }, 0);

        const order = new OrderModel({
            user: userId,
            items: orderItems,
            totalAmount: totalAmount,
            address: address,
            phone: phone,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(201).json({ success: true, order });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get orders for a specific user (no change from your provided code)
const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID required.' });
        }

        const orders = await OrderModel.find({ user: userId })
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get orders for a vendor (UPDATED)
const getOrdersForVendor = async (req, res) => {
    try {
        // Get the vendor ID from the token payload, attached by authVendor middleware to req.user
        const vendorId = req.user.id; // <--- IMPORTANT CHANGE!

        if (!vendorId) {
            return res.status(400).json({ success: false, message: 'Vendor ID not found in token payload after authentication.' });
        }

        // Find orders where an item's 'vendor' field matches the authenticated vendor's ID
        const orders = await OrderModel.find({ 'items.vendor': vendorId })
            .populate('user', 'name email') // Populate user name and email who placed the order
            .populate({
                path: 'items.product', // Populate product details for each item
                select: 'Name Image Price QuantityUnit' // Select specific fields you need from product
            })
            .sort({ createdAt: -1 }) // Sort by most recent orders first
            .lean(); // Use .lean() for faster query if you don't need Mongoose document methods/virtuals

        // Your existing filtering logic is good for ensuring only relevant items are returned:
        const filteredOrders = orders.map(order => ({
            ...order,
            items: order.items.filter(item => item.vendor && item.vendor.toString() === vendorId.toString())
        })).filter(order => order.items.length > 0); // Filter out orders if they contain no items for this vendor

        res.json({ success: true, orders: filteredOrders });
    } catch (error) {
        console.error('Get orders for vendor error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching orders.' });
    }
};

// Update order item status (vendor only) - UPDATED
const updateOrderItemStatus = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const { status } = req.body;

        // Get the vendor ID from the token payload for authorization
        const vendorIdFromToken = req.user.id; // <--- IMPORTANT CHANGE!

        if (!vendorIdFromToken) {
            return res.status(400).json({ success: false, message: 'Vendor ID not found in token payload.' });
        }

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required.' });
        }

        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        // Find the order AND ensure the specific item being updated belongs to the authenticated vendor
        const order = await OrderModel.findOne({ 
            _id: orderId, 
            'items._id': itemId,
            'items.vendor': vendorIdFromToken // Crucial: ensure this item's vendor matches the token's vendor
        });

        if (!order) {
            // If order or item isn't found, or the item doesn't belong to this vendor
            return res.status(404).json({ success: false, message: 'Order or item not found, or you do not have permission to update this item.' });
        }

        const item = order.items.id(itemId); // Find the item within the order
        if (!item) {
            // This check might be redundant if the findOne query above already found it, but good for safety
            return res.status(404).json({ success: false, message: 'Order item not found in this order.' });
        }

        item.status = status;
        await order.save();

        res.json({ success: true, order });
    } catch (error) {
        console.error('Update order item status error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// User cancels order item (no change from your provided code)
const cancelOrderItem = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const { userId } = req.body; // Ensure user is authorized to cancel their own item

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required for cancellation.' });
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Security check: Ensure the order belongs to the requesting user
        if (order.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only cancel your own orders.' });
        }

        const item = order.items.id(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Order item not found in this order.' });
        }

        // Check current status: Only allow cancellation if status is 'Pending' or 'Processing'
        const cancellableStatuses = ['Pending', 'Processing'];
        if (!cancellableStatuses.includes(item.status)) {
            return res.status(400).json({ success: false, message: `Cannot cancel item with status: ${item.status}. Only Pending or Processing items can be cancelled.` });
        }

        item.status = 'Cancelled';
        await order.save();

        res.json({ success: true, message: 'Order item cancelled successfully.', order });

    } catch (error) {
        console.error('Cancel order item error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, getUserOrders, getOrdersForVendor, updateOrderItemStatus, cancelOrderItem };