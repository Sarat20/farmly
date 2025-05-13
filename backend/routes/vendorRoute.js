import express from 'express'
import multer from "multer";
import {vendorRegister,vendorlogin,AddProduct,getVendorProducts,getVendorProfile} from '../controllers/vendorController.js'
import { authVendor } from '../middlewares/authVendor.js';
const vendorRouter=express.Router();

import upload from '../middlewares/multer.js'; 



// vendorRouter.post('/register',vendorRegister);
vendorRouter.post("/register", upload.single("ProfilePhoto"), vendorRegister);

vendorRouter.post('/login',vendorlogin)
vendorRouter.post('/add-product', authVendor, upload.single("Image"), AddProduct);
vendorRouter.get('/my-products', authVendor, getVendorProducts);
vendorRouter.get('/profile', authVendor, getVendorProfile);



export default vendorRouter;