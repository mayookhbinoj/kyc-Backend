import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/userInterface"

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ref: "Role",
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isKycSubmit:{
    type:String,
    default:"NotSubmitted"
  }
});

export const UserModel = mongoose.model<IUser>("User", userSchema);