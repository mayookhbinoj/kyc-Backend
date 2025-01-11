import mongoose  from "mongoose";
import configKeys from "../utils/Configure";

const connectDb=async()=>{
    try {
       await mongoose.connect(configKeys.MONGODB_URI)  
    } catch (error) {
        console.log("connection error")
        throw new Error("Environment variable MONGO_URI must be defined.")
    }
}
export default connectDb