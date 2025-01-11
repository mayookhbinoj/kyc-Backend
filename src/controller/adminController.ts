import {  Request, Response } from "express";
import {UserModel} from "../models/userModel";
import { AadhaarModel } from "../models/kycShema";


export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const findUser = await UserModel.find({ role: "User" });
    if (findUser.length === 0) {
      res.status(404).json({ message: "No users found with the role 'User'" });
      return;
    }
    const usersWithKyc = await Promise.all(
      findUser.map(async (user) => {
        const kycDetails = await AadhaarModel.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          kycDetails, 
        };
      })
    );

    res.status(200).json({
      message: "Users fetched successfully",
      data: usersWithKyc, 
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
    });
  }
};

export const kycRejectController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("enter")
    const { id } = req.body;

    const updatedAadhaar = await AadhaarModel.findOneAndUpdate(
      { userId: id }, 
      { status: "Rejected" }, 
      { new: true }
    );
    const UserModelEdit = await UserModel.findOneAndUpdate(
      { _id: id }, 
      { isKycSubmit: "Rejected" }, 
      { new: true }
    )

    if (!updatedAadhaar) {
      res.status(404).json({ message: "Aadhaar record not found for the given user ID" });
      return;
    }

    const users = await UserModel.find({ role: "User" });
    if (users.length === 0) {
      res.status(404).json({ message: "No users found with the role 'User'" });
      return;
    }

    const usersWithKyc = await Promise.all(
      users.map(async (user) => {
        const kycDetails = await AadhaarModel.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          kycDetails,
        };
      })
    );

    res.status(200).json({
      message: "Users fetched successfully",
      data: usersWithKyc,
    });
  } catch (error) {
    console.error("Error in kycApproveController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const kycApproveController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("enter")
    const { id } = req.body;

    const updatedAadhaar = await AadhaarModel.findOneAndUpdate(
      { userId: id }, 
      { status: "Approved" }, 
      { new: true }
    );

    const UserModelEdit = await UserModel.findOneAndUpdate(
      { _id: id }, 
      { isKycSubmit: "Approved" }, 
      { new: true }
    )

    if (!updatedAadhaar) {
      res.status(404).json({ message: "Aadhaar record not found for the given user ID" });
      return;
    }

    const users = await UserModel.find({ role: "User" });
    if (users.length === 0) {
      res.status(404).json({ message: "No users found with the role 'User'" });
      return;
    }

    const usersWithKyc = await Promise.all(
      users.map(async (user) => {
        const kycDetails = await AadhaarModel.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          kycDetails,
        };
      })
    );

    res.status(200).json({
      message: "Users fetched successfully",
      data: usersWithKyc,
    });
  } catch (error) {
    console.error("Error in kycApproveController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logoutController = async (req: Request, res: Response) => {
  try {
  console.log("enter")
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