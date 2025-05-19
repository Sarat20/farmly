import VendorModel from "../models/VendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import ProductModel from "../models/ProductModel.js";
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
        return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};






// const vendorRegister = async (req, res) => {
//     try {
//       const {
//         Name,
//         Email,
//         Mobilenumber,
//         Farmname,
//         Village,
//         District,
//         State,
//         Pincode,
//         Deliveryarea,
//         BankAccount,
//         IFSC,
//         UPI,
//         PAN,
//         Aadhar,
//         Password,
      
//       } = req.body;
  
//       if (
//         !Name || !Email || !Mobilenumber || !Farmname || !Village ||
//         !District || !State || !Pincode || !Deliveryarea || !BankAccount ||
//         !IFSC || !PAN || !Aadhar || !Password
//       ) {
//         return res.status(400).json({ success: false, message: "Please fill all the details" });
//       }
  
//       const existingVendor = await VendorModel.findOne({ Email });
//       if (existingVendor) {
//         return res.status(400).json({ success: false, message: "Vendor already exists" });
//       }
  
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(Password, salt);
  
//       const newVendor = new VendorModel({
//         Name,
//         Email,
//         Mobilenumber,
//         Farmname,
//         Village,
//         District,
//         State,
//         Pincode,
//         Deliveryarea,
//         BankAccount,
//         IFSC,
//         UPI,
//         PAN,
//         Aadhar,
//         Password: hashedPassword,
        
//       });
  
//       const vendor = await newVendor.save();
//       const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_KEY);
  
//       return res.status(201).json({ success: true, token });
//     } catch (error) {
//       console.error("Vendor Registration Error:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//   };
  

// const vendorRegister = async (req, res) => {
//   try {
//     const {
//       Name,
//       Email,
//       Mobilenumber,
//       Farmname,
//       Village,
//       District,
//       State,
//       Pincode,
//       Deliveryarea,
//       BankAccount,
//       IFSC,
//       UPI,
//       PAN,
//       Aadhar,
//       Password,
//     } = req.body;

//     if (
//       !Name || !Email || !Mobilenumber || !Farmname || !Village ||
//       !District || !State || !Pincode || !Deliveryarea || !BankAccount ||
//       !IFSC || !PAN || !Aadhar || !Password
//     ) {
//       return res.status(400).json({ success: false, message: "Please fill all the details" });
//     }

//     const existingVendor = await VendorModel.findOne({ Email });
//     if (existingVendor) {
//       return res.status(400).json({ success: false, message: "Vendor already exists" });
//     }

//     // Upload profile photo if provided
//     let profilePhotoUrl = "";
//     if (req.file) {
//       const imagePath = path.resolve(req.file.path);
//       const result = await cloudinary.uploader.upload(imagePath, {
//         resource_type: "image",
//         folder: "vendor_profiles"
//       });
//       profilePhotoUrl = result.secure_url;
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(Password, salt);

//     const newVendor = new VendorModel({
//       Name,
//       Email,
//       Mobilenumber,
//       Farmname,
//       Village,
//       District,
//       State,
//       Pincode,
//       Deliveryarea,
//       BankAccount,
//       IFSC,
//       UPI,
//       PAN,
//       Aadhar,
//       Password: hashedPassword,
//       ProfilePhoto: profilePhotoUrl,
//     });

//     const vendor = await newVendor.save();
//     const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_KEY);

//     return res.status(201).json({ success: true, token });
//   } catch (error) {
//     console.error("Vendor Registration Error:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


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
        const { Name, Description, Price, Quantity, Type } = req.body;

        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
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
    // Debug: Check if the route is being hit
    console.log("Update Profile route hit!");

    const vendorId = req.user.id;

    // Debug: Log the request body (what we are trying to update)
    console.log("Request Body:", req.body);

    const updates = { ...req.body };

    // Debug: Log the updates object
    console.log("Updates:", updates);

    // Check if a file (image) is uploaded
    if (req.file) {
      console.log("Processing Image Upload...");

      const normalizedPath = path.resolve(req.file.path);
      console.log("Normalized Image Path:", normalizedPath);

      let imageUrl;
      try {
        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(normalizedPath, {
          resource_type: 'image',
        });

        // Debug: Log the Cloudinary upload result
        console.log("Cloudinary Upload Result:", uploadResult);
        imageUrl = uploadResult.secure_url;
        updates.ProfilePhoto = imageUrl; // Set the image URL to the updates object
      } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    // Update vendor profile in MongoDB
    const updatedVendor = await VendorModel.findByIdAndUpdate(
      vendorId,
      updates,
      { new: true, runValidators: true }
    ).select("-Password");

    // Debug: Log the updated vendor details
    console.log("Updated Vendor:", updatedVendor);

    if (!updatedVendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    // Send the updated vendor profile back in the response
    res.status(200).json({ success: true, updatedVendor });
  } catch (error) {
    // Debug: Log the error for further debugging
    console.error("Update Vendor Profile Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};







export { vendorlogin, vendorRegister ,AddProduct,getVendorProducts,getVendorProfile,updateVendorProfile};
