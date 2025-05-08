import express from 'express'
import {vendorRegister,vendorlogin} from '../controllers/vendorController.js'

const vendorRouter=express.Router();

vendorRouter.post('/register',vendorRegister);
vendorRouter.post('/login',vendorlogin)

export default vendorRouter;