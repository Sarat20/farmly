// backend/controllers/vendorController.js

import VendorModel from "../models/VendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ProductModel from "../models/ProductModel.js";
import OrderModel from '../models/OrderModel.js'; // Import OrderModel
import { v2 as cloudinary } from "cloudinary";
import path from 'path';


const vendorlogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const vendor = await VendorModel.findOne({ Email });
        if (!vendor) {
            return res.status(401).json({ success: false, message: "Vendor does not exist" });
        }

        const isMatch = await bcrypt.compare(Password, vendor.Password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({ success: true, message: "Login successful", token, vendorId: vendor._id }); // Add vendorId here
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const vendorRegister = async (req, res) => {
    try {
        const {
            Name,
            Email,
            Mobilenumber,
            Farmname,
            Village,
            District,
            State,
            Pincode,
            Deliveryarea,
            BankAccount,
            IFSC,
            UPI,
            PAN,
            Aadhar,
            Password,
        } = req.body;

        if (
            !Name || !Email || !Mobilenumber || !Farmname || !Village ||
            !District || !State || !Pincode || !Deliveryarea || !BankAccount ||
            !IFSC || !PAN || !Aadhar || !Password
        ) {
            return res.status(400).json({ success: false, message: "Please fill all the details" });
        }

        const existingVendor = await VendorModel.findOne({ Email });
        if (existingVendor) {
            return res.status(400).json({ success: false, message: "Vendor already exists" });
        }

        // Upload profile photo if provided
        let profilePhotoUrl = "";
        if (req.file) {
            const imagePath = path.resolve(req.file.path);
            const result = await cloudinary.uploader.upload(imagePath, {
                resource_type: "image",
                folder: "vendor_profiles"
            });
            profilePhotoUrl = result.secure_url;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newVendor = new VendorModel({
            Name,
            Email,
            Mobilenumber,
            Farmname,
            Village,
            District,
            State,
            Pincode,
            Deliveryarea,
            BankAccount,
            IFSC,
            UPI,
            PAN,
            Aadhar,
            Password: hashedPassword,
            ProfilePhoto: profilePhotoUrl,
        });

        const vendor = await newVendor.save();
        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_KEY);

        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Vendor Registration Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const AddProduct = async (req, res) => {
    try {
        const { Name, Description, Price, Quantity, Type, QuantityUnit } = req.body;

        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // Validate QuantityUnit (optional but recommended)
        const validUnits = ["kgs", "items", "liters", "units"]; // Added more common units
        if (!QuantityUnit || !validUnits.includes(QuantityUnit)) {
            return res.status(400).json({ success: false, message: "Invalid or missing QuantityUnit" });
        }

        const imageFile = req.file;
        console.log("Image File Details:", imageFile);

        const normalizedPath = path.resolve(imageFile.path);
        console.log("Normalized Path:", normalizedPath);

        let imageUrl;
        try {
            const imageUpload = await cloudinary.uploader.upload(normalizedPath, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
            console.log("Image Uploaded to Cloudinary:", imageUrl);
        } catch (error) {
            console.error("Error during Cloudinary upload:", error);
            return res.status(500).json({ success: false, message: "Image upload failed" });
        }

        const newProduct = new ProductModel({
            Vendor: req.user.id,
            Name,
            Description,
            Price: Number(Price),
            Quantity: Number(Quantity),
            QuantityUnit,
            Type: Type.replace(/'/g, ''),
            Image: imageUrl,
        });

        await newProduct.save();

        res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getVendorProducts = async (req, res) => {
    try {
        const vendorId = req.user.id; // From authVendor middleware

        const products = await ProductModel.find({ Vendor: vendorId }).sort({ CreatedAt: -1 });

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching vendor products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const getVendorProfile = async (req, res) => {
    try {
        const vendorId = req.user.id;

        const vendor = await VendorModel.findById(vendorId).select("-Password");

        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        res.status(200).json({ success: true, vendor });
    } catch (error) {
        console.error("Get Vendor Profile Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const updateVendorProfile = async (req, res) => {
    try {
        console.log("Update Profile route hit!");
        const vendorId = req.user.id;
        console.log("Request Body:", req.body);
        const updates = { ...req.body };
        console.log("Updates:", updates);

        if (req.file) {
            console.log("Processing Image Upload...");
            const normalizedPath = path.resolve(req.file.path);
            console.log("Normalized Image Path:", normalizedPath);
            let imageUrl;
            try {
                const uploadResult = await cloudinary.uploader.upload(normalizedPath, {
                    resource_type: 'image',
                });
                console.log("Cloudinary Upload Result:", uploadResult);
                imageUrl = uploadResult.secure_url;
                updates.ProfilePhoto = imageUrl;
            } catch (error) {
                console.error("Error during Cloudinary upload:", error);
                return res.status(500).json({ success: false, message: "Image upload failed" });
            }
        }

        const updatedVendor = await VendorModel.findByIdAndUpdate(
            vendorId,
            updates,
            { new: true, runValidators: true }
        ).select("-Password");

        console.log("Updated Vendor:", updatedVendor);

        if (!updatedVendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        res.status(200).json({ success: true, updatedVendor });
    } catch (error) {
        console.error("Update Vendor Profile Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// NEW: getVendorPayments function
const getVendorPayments = async (req, res) => {
    try {
        const vendorId = req.user.id; // Get vendor ID from authVendor middleware

        if (!vendorId) {
            return res.status(400).json({ success: false, message: 'Vendor ID is required.' });
        }

        // Find all orders that contain items from this vendor
        const orders = await OrderModel.find({ 'items.vendor': vendorId })
            .populate('items.product', 'Name Price') // Populate product details for item calculations
            .lean(); // Use .lean() for faster query as we don't need Mongoose documents

        let totalEarnings = 0;
        let availableForPayout = 0; // Simplified: assume all delivered sales are available
        let pendingEarnings = 0;    // Simplified: sales in 'Pending', 'Processing', 'Shipped'
        let lastPayoutDate = null;
        let lastPayoutAmount = 0;

        const salesTransactions = []; // To build a transaction history

        for (const order of orders) {
            for (const item of order.items) {
                // Ensure the item belongs to this specific vendor
                if (item.vendor.toString() === vendorId) {
                    // Check if product details were populated
                    if (item.product && item.product.Price) {
                        const itemRevenue = item.product.Price * item.quantity;
                        totalEarnings += itemRevenue;

                        salesTransactions.push({
                            date: order.createdAt,
                            type: 'Sale',
                            description: `Sale - Order ID: ${order._id}, Item: ${item.product.Name || 'Unknown Product'}`,
                            amount: itemRevenue,
                            status: item.status,
                            orderId: order._id,
                            itemId: item._id,
                        });

                        if (item.status === 'Delivered') {
                            availableForPayout += itemRevenue;
                        } else if (item.status === 'Pending' || item.status === 'Processing' || item.status === 'Shipped') {
                            pendingEarnings += itemRevenue;
                        }
                        // Cancelled items don't add to earnings
                    } else {
                        console.warn(`Product details not found for item ${item._id} in order ${order._id}. Skipping revenue calculation for this item.`);
                    }
                }
            }
        }

        // Mock Payout Info (you would replace this with actual payout records from a Payout model or payment gateway)
        // For demonstration, let's assume 'lastPayout' is a separate record or a calculated value.
        // If you had a Payouts collection in your DB:
        // const latestPayout = await PayoutModel.findOne({ vendor: vendorId }).sort({ createdAt: -1 });
        // if (latestPayout) {
        //     lastPayoutDate = latestPayout.createdAt;
        //     lastPayoutAmount = latestPayout.amount;
        // } else {
        //     lastPayoutDate = null; // Or some default
        //     lastPayoutAmount = 0;
        // }
        // For now, let's just use a hardcoded value or derive it from past sales for demo.
        // A real system would track actual payouts.
        lastPayoutDate = new Date(); // Placeholder
        lastPayoutAmount = 0; // Placeholder

        // You might consider deducting a platform commission here if applicable

        const bankAccount = {
            name: (await VendorModel.findById(vendorId).select('BankAccount')).BankAccount, // Fetch BankAccount name from VendorModel
            last4: '****' + (await VendorModel.findById(vendorId).select('BankAccount')).BankAccount.slice(-4), // Example for last 4 digits
            bankName: 'Your Bank Name', // You might need a BankName field in VendorModel
        };
        const payoutSchedule = 'Automatic weekly payouts every Monday if balance exceeds ₹1000.';


        res.json({
            success: true,
            summary: {
                totalEarnings: totalEarnings,
                availableForPayout: availableForPayout,
                pendingEarnings: pendingEarnings,
                lastPayout: {
                    date: lastPayoutDate,
                    amount: lastPayoutAmount
                },
            },
            payoutSettings: {
                bankAccount: bankAccount,
                payoutSchedule: payoutSchedule,
                minimumThreshold: 1000,
            },
            transactions: salesTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)), // Sort by most recent
        });

    } catch (error) {
        console.error('Error fetching vendor payments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch vendor payment data.' });
    }
};

// <--- ADD THIS NEW FUNCTION HERE --->
const getVendorOrderCount = async (req, res) => {
    try {
        const vendorId = req.user.id; // Assuming req.user.id is set by your authentication middleware

        if (!vendorId) {
            return res.status(400).json({ success: false, message: 'Vendor ID is required to count orders.' });
        }

        // --- IMPORTANT: Adjust this query based on your OrderModel structure ---
        // Option 1: If your OrderModel has a direct 'vendor' field for the whole order
        // const totalOrders = await OrderModel.countDocuments({ vendor: vendorId });

        // Option 2 (more likely): If your OrderModel has an 'items' array, and each item has a 'vendor' field
        const totalOrders = await OrderModel.countDocuments({ 'items.vendor': vendorId });

        res.status(200).json({ success: true, totalOrders });
    } catch (error) {
        console.error("Get Vendor Order Count Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export {
    vendorlogin,
    vendorRegister,
    AddProduct,
    getVendorProducts,
    getVendorProfile,
    updateVendorProfile,
    getVendorPayments,
    getVendorOrderCount // <--- AND EXPORT IT HERE
};