// import {v2 as cloudinary} from 'cloudinary';

// const connectCloudinary=async()=>{
//     cloudinary.config({
//         cloud_name:process.env.CLOUDINARY_NAME,
//         api_key:process.env.CLOUDINARY_API_KEY,
//         api_secret:process.env.CLOUDINARY_SECRET_KEY
//     })
// }

// export default connectCloudinary;
   import { v2 as cloudinary } from 'cloudinary';

   const connectCloudinary = () => {
       cloudinary.config({
           cloud_name: process.env.CLOUDINARY_NAME,
           api_key: process.env.CLOUDINARY_API_KEY,
           api_secret: process.env.CLOUDINARY_API_SECRET, // Ensure this is correct
       });

       console.log("Cloudinary configured with:", {
           cloud_name: process.env.CLOUDINARY_NAME,
           api_key: process.env.CLOUDINARY_API_KEY,
           api_secret: !!process.env.CLOUDINARY_API_SECRET ? '***' : 'NOT SET',
       });
   };

   export default connectCloudinary;
   