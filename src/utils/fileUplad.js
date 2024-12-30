import { v2 as cloudinary } from "cloudinary"; 
import fs from "fs"; // File system er library import

// Cloudinary er configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Image upload korar function
const uploadCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto", // File type automatic detect korbe
    });
    console.log("Upload successful:", response.url); // Success message
    return response; // Response ta return korchi
  } catch (error) {
    console.error("Upload failed:", error.message); // Error log
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath); // File thakle delete kore debo
    }
    return null; // Error hole null return
  }
};

// Image optimization er URL generate
const optimizeUrl = cloudinary.url("shoes", {
  fetch_format: "auto", 
  quality: "auto", 
});

console.log("Optimized URL:", optimizeUrl); 

// Image auto-crop ar resize er URL generate
const autoCropUrl = cloudinary.url("shoes", {
  crop: "auto", // Auto-crop korbe
  gravity: "auto", // Center theke crop korbe
  width: 500, // Width set korchi
  height: 500, // Height set korchi
});

console.log("Auto-Cropped URL:", autoCropUrl); 


export { uploadCloudinary, autoCropUrl,optimizeUrl};
