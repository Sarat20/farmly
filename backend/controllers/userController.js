import express from 'express';
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';




const loginUser=async(req,res)=>{
   try {
    
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user)
    {
        return res.status(401).json({success:false,message:"user doesnot exist"});
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch)
    {
        return res.status(401).json({success:false,message:"Invalid Credentials"});
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.status(200).json({success:true,message:"Login Successfull",token});

   } catch (error) {
       console.log(error)
       res.status(500).json({success:false,message:"Interval Server Error"});
   }
}


const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

    if(!name || !email || !password)
    {
        return res.json({success:false,message:'Please provide all the details'});
    }
    if(!validator.isEmail(email))
    {
        return res.json({success:false,message:'Please provide valid email'});
    }
    
    if(password.length<8)
    {
        return res.json({success:false,message:'please provide valid password'});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);

    const existingUser=await UserModel.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({success:false,message:'User already Existed'});
    }

    const newuser=new UserModel({name,email,password:hashedpassword});
    const user=await newuser.save();

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
    
    res.status(201).json({success:true,token});

    } catch (error) {
         console.log(error);
         res.status(500).json({success:false,message:'Internal Server Error'});
    }
}


export {loginUser,registerUser}