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
    origin: function (origin, callback) {
       
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
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

