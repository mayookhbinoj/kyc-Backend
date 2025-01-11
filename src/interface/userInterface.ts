import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  isKycSubmit: string;
  createdAt: Date;
}

export interface User {
  userId: string;
  email: string;
  role: string;
  isKycSubmit: string;
  createdAt: Date;
}
