

import ProductModel from '../models/ProductModel.js';
import OrderModel from '../models/OrderModel.js';
import mongoose from 'mongoose';

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
                    vendor: product.Vendor, 
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

const getOrdersForVendor = async (req, res) => {
    try {
       
        const vendorId = req.user.id; 

        if (!vendorId) {
            return res.status(400).json({ success: false, message: 'Vendor ID not found in token payload after authentication.' });
        }

        const orders = await OrderModel.find({ 'items.vendor': vendorId })
            .populate('user', 'name email') 
            .populate({
                path: 'items.product', 
                select: 'Name Image Price QuantityUnit' 
            })
            .sort({ createdAt: -1 }) 
            .lean(); 
        const filteredOrders = orders.map(order => ({
            ...order,
            items: order.items.filter(item => item.vendor && item.vendor.toString() === vendorId.toString())
        })).filter(order => order.items.length > 0); 

        res.json({ success: true, orders: filteredOrders });
    } catch (error) {
        console.error('Get orders for vendor error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching orders.' });
    }
};

const updateOrderItemStatus = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const { status } = req.body;

        const vendorIdFromToken = req.user.id; 

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

        const order = await OrderModel.findOne({ 
            _id: orderId, 
            'items._id': itemId,
            'items.vendor': vendorIdFromToken 
        });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order or item not found, or you do not have permission to update this item.' });
        }

        const item = order.items.id(itemId); 
        if (!item) {
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

const cancelOrderItem = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required for cancellation.' });
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        
        if (order.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only cancel your own orders.' });
        }

        const item = order.items.id(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Order item not found in this order.' });
        }

       
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