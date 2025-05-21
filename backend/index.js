import express from 'express'
import cors from 'cors'
// import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import dotenv from 'dotenv';
dotenv.config();
   

import userRouter from './routes/userRoute.js'
import vendorRouter from './routes/vendorRoute.js'
import productRouter from './routes/ProductRoute.js';
import orderRouter from './routes/OrderRoute.js';

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

app.use(cors({
    origin: 'http://localhost:5173', // <--- IMPORTANT: Replace with your actual frontend URL/port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you're sending cookies/auth headers
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apis for user
app.use('/api/user',userRouter)
//apis for vendor
app.use('/api/vendor',vendorRouter)
//apis for product
app.use("/api/products", productRouter);
//apis for order
app.use('/api/orders/',orderRouter);

