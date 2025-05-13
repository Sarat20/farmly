import mongoose from 'mongoose'
const VendorSchema=mongoose.Schema({
    Name:{
      type:String,
      required:true
    },
    Mobilenumber:{
        type:String,
        default:'0000000000'
    },
    Farmname:{
        type:String,
        required:true
    },
    Village:{
        type:String,
        required:true
    },
    District:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Pincode:{
        type:String,
        required:true

    },
    Deliveryarea:{
        type:String,
        required:true
    },
    BankAccount:{
        type:String,
        required:true
    },
    IFSC:{
        type:String,
        required:true
    },
    UPI:{
        type:String,
    },
    PAN:{
        type:String,
        required:true
    },
    Aadhar:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true       
    },

})
const VendorModel=mongoose.model('Vendor',VendorSchema)
export default VendorModel