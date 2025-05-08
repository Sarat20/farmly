import VendorModel from "../models/VendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        !IFSC || !UPI || !PAN || !Aadhar || !Password
      ) {
        return res.status(400).json({ success: false, message: "Please fill all the details" });
      }
  
      const existingVendor = await VendorModel.findOne({ Email });
      if (existingVendor) {
        return res.status(400).json({ success: false, message: "Vendor already exists" });
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
        // No ProfilePhoto here
      });
  
      const vendor = await newVendor.save();
      const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_KEY);
  
      return res.status(201).json({ success: true, token });
    } catch (error) {
      console.error("Vendor Registration Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

export { vendorlogin, vendorRegister };
