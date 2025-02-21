import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadToCloudinary = async (req, res) => {
  // Skip if no file was uploaded
  if (!req.file) {
    console.log("No file uploaded, skipping Cloudinary upload.");
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
  
    cloudinary.config({
      cloud_name: "dqhu3nn3p",
      api_key: "236836261763157",
      api_secret: "1mYhVx65cBh8-vjpIGEZng5MNX4",
    });

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food_images", // Optional: Make this configurable
    });

    // Attach the secure URL to the request body
    req.body.food_image = result.secure_url;

    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors during the upload process
    console.error("Cloudinary upload failed:", error.message);
    res.status(500).json({
      error: "Cloudinary upload failed",
      details: error.message,
    });
  }
};