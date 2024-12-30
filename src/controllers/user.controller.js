import { ApiError } from "../utils/ApiError.js"; // Custom error class
import { asyncHandler } from "../utils/asyncHandler.js"; // Handles async errors
import { User } from "../models/user.model.js"; // User model for database
import { uploadCloudinary } from "../utils/fileUplad.js"; // Uploads files to Cloudinary
import { ApiResponse } from "../utils/ApiResponse.js"; // Custom API response structure

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  // Extract user details from request body
  const { username, email, fullname, password } = req.body;

  // Validate input fields are not empty
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user with the same username or email already exists
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with username or email already exists");
  }

  // Get file paths for avatar and cover image
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // Ensure avatar file is uploaded
  if (!avatarLocalPath) {
    throw new ApiError(409, "Avatar field is required");
  }

  // Upload files to Cloudinary
  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  // Ensure avatar upload is successful
  if (!avatar) {
    throw new ApiError(409, "Avatar upload failed");
  }

  // Create a new user in the database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // Optional cover image
    email,
    password,
    username: username.toLowerCase(),
  });

  // Retrieve the created user without sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Failed to register user");
  }

  // Send a success response with the created user
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export { registerUser }; // Export the function
