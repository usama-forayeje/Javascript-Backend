import multer from "multer"; // Import multer for file uploads

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Save files to ./public/temp
  },
  // Set the file name for uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

export const upload = multer({ storage }); 
