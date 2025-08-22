
import express from 'express'
import multer from "multer";
import {
    vendorRegister,
    vendorlogin,
    AddProduct,
    getVendorProducts,
    getVendorProfile,
    updateVendorProfile,
    getVendorPayments,
    getVendorOrderCount 
} from '../controllers/vendorController.js'
import { authVendor } from '../middlewares/authVendor.js';
const vendorRouter = express.Router();

import upload from '../middlewares/multer.js';


vendorRouter.post("/register", upload.single("ProfilePhoto"), vendorRegister);
vendorRouter.post('/login', vendorlogin);
vendorRouter.post('/add-product', authVendor, upload.single("Image"), AddProduct);
vendorRouter.get('/my-products', authVendor, getVendorProducts);
vendorRouter.get('/profile', authVendor, getVendorProfile);
vendorRouter.put('/update-profile', authVendor, upload.single("ProfilePhoto"), updateVendorProfile);


vendorRouter.get('/payments', authVendor, getVendorPayments);
vendorRouter.get('/order-count', authVendor, getVendorOrderCount);


export default vendorRouter;