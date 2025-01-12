import { NextFunction, Request, Response } from "express";
import {UserModel} from "../models/userModel";
import { AadhaarModel } from "../models/kycShema";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { User } from "../interface/userInterface";
import configKeys from "../utils/Configure";



export const userRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password: reqPassword } = req.body;

    if (!email || !reqPassword) {
      res.status(400).json({ message: "Email and password are required." });
      return; 
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email is already registered." });
      return; 
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqPassword, salt);

    const newUser = await UserModel.create({ email, password: hashedPassword });

    const { password, ...userResponse } = newUser.toObject();

    res.status(201).json({ message: "User registered successfully.", user: userResponse });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const userLogin=async(req: Request, res: Response): Promise<void> =>{
  try {
    
    const {email,password: reqPassword}=req.body
    const secretKey: string = configKeys.JWT_SECRET_KEY

    if (!email || !reqPassword) {
      res.status(400).json({ message: "Email and password are required." });
      return; 
    }
    const findEmail=await UserModel.findOne({email})

    if (!findEmail) {
      res.status(404).json({ message: "User not found." });
      return 
    }

    const isPasswordValid = await bcrypt.compare(reqPassword, findEmail.password)

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials." });
      return 
    }
    const kycRecord = await AadhaarModel.findOne({ userId: findEmail._id })

    const payload = { userId: findEmail._id, email: findEmail.email,role:findEmail.role }

    const token: string = jwt.sign(payload, secretKey, { expiresIn: '1h' })
  

    const { password, ...userResponse } = findEmail.toObject();

    res.cookie('token', token,
         { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true,  
        secure: Boolean(configKeys.production), sameSite: 
        "none",domain: "kyc-backend-jade.vercel.app"
         });
    

    res.status(200).json({ message: "Login successful",user: userResponse});
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}



export const kycSubmit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, idNumber, aadhaarName } = req.body;
    const { userId } = req.user as unknown as User;

    if (!userId) {
      res.status(400).json({ message: 'User or userId is missing in the request' });
    } else if (!fullName || !idNumber || !aadhaarName) {
      res.status(400).json({ message: 'All fields are required' });
    } else {
      const file = req.file ? `https://kyc-backend-jade.vercel.app/Uploads/${req.file.filename}` : null;

      if(!file) {
        res.status(400).json({ message: 'Aadhaar image is required' });
      } else {
        const newAadhaar = new AadhaarModel({
          fullName,
          idNumber,
          aadhaarName,
          aadhaarImageId: file,
          userId,
        });

        const result = await newAadhaar.save();
        if (!result) {
          res.status(500).json({ message: 'Failed to save Aadhaar details. Please try again later.' });
        } else {
          const user = await UserModel.findByIdAndUpdate(
            { _id: userId },
            { isKycSubmit: 'Pending' },
            { new: true }
          );

          if (!user) {
            res.status(500).json({
              message: 'Failed to update user status. Please try again later.',
            });
          } else {
            console.log("enter")
            res.status(201).json({
              message: 'KYC submitted successfully',
              user,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error during KYC submission:', error);
    next(error); 
  }
};

export const logout = async (req: Request, res: Response) => {
  try {

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong during logout' });
  }
};