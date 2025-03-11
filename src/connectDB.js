import mongoose from "mongoose";
import 'dotenv/config';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  
  try {
    // Connection string already has the optimized parameters
    await mongoose.connect(process.env.MY_DB_URL);
    
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectDB;