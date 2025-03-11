import mongoose from "mongoose";
import 'dotenv/config';

const mongoURI = process.env.MY_DB_URL;

// Track connection status
let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If connection exists, return it
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  // If connection is in progress, wait for it
  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, 
      connectTimeoutMS: 5000, 
    };


    cachedConnection.promise = mongoose.connect(mongoURI, opts)
      .then((mongoose) => {
        console.log("MongoDB Connected");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB Connection Error:", error);
        cachedConnection.promise = null;
        throw error;
      });
  }
  

  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
};

export default connectDB;