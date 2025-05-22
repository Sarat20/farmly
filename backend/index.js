import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import vendorRouter from './routes/vendorRoute.js';
import productRouter from './routes/ProductRoute.js';
import orderRouter from './routes/OrderRoute.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

console.log("Environment Variables Loaded:", {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET ? '***' : 'NOT SET',
});

connectDb();
connectCloudinary();


const allowedOrigins = [
    'http://localhost:5173', 
    'https://farmly-frontend.onrender.com', 
   
];

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

// APIs for user
app.use('/api/user', userRouter);
// APIs for vendor
app.use('/api/vendor', vendorRouter);
// APIs for product
app.use("/api/products", productRouter);
// APIs for order
app.use('/api/orders/', orderRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));