import mongoose from "mongoose";
import 'dotenv/config';

const mongoURI = process.env.MY_DB_URL;


let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const db = await mongoose.connect(mongoURI)

    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default connectDB;