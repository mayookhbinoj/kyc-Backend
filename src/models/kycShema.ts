import mongoose, { Schema, Document } from 'mongoose';
import { IAadhaar } from '../interface/kycInterface';

type IAadhaarModel = IAadhaar & Document;

const AadhaarSchema = new Schema<IAadhaarModel>(
  {
    fullName: { 
      type: String, 
      required: true 
    },
    idNumber: { 
      type: String,
      required: true 
    },
    aadhaarName: {
      type: String,
      required: true
    },
    aadhaarImageId: { 
      type: String,  
      required: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
    
    },
    status: {
      type: String,
      default: "pending", 
    },
  }, 
  { timestamps: true }
);

export const AadhaarModel = mongoose.model<IAadhaarModel>('kyc', AadhaarSchema);