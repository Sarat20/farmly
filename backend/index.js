import express from 'express'
import cors from 'cors'
// import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import dotenv from 'dotenv';
dotenv.config();
   

import userRouter from './routes/userRoute.js'
import vendorRouter from './routes/vendorRoute.js'
const PORT=process.env.PORT || 4000
const app=express()

   console.log("Environment Variables Loaded:", {
       CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
       CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
       CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET ? '***' : 'NOT SET',
   });
   

connectDb();
connectCloudinary();

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apis for user
app.use('/api/user',userRouter)
//apis for vendor
app.use('/api/vendor',vendorRouter)




