import { Types } from 'mongoose';

export interface IAadhaar {
  fullName: string;
  idNumber: string;
  aadhaarName: string;
  aadhaarImageId:string;
  userId: Types.ObjectId
  status:string;
}


export  interface User {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;  
}