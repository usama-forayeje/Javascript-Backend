import express from "express"; // Import the Express library
import cors from "cors"; // Import the CORS middleware
import cookieParser from "cookie-parser"; // Import the cookie-parser middleware

// Create an Express application instance
const app = express();

// Configure CORS (Cross-Origin Resource Sharing)
// Allows the server to accept requests from the origin specified in environment variable CORS_ORIGIN
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Specify the allowed origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware to parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Middleware to parse incoming URL-encoded data with extended query string support
// and a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse cookies sent with requests
app.use(cookieParser()); // Fixed: changed `express.cookieParser()` to `cookieParser()`

// !! routes Import
import userRouter from './routes/user.routes.js'

// Router Declaration 
app.use("/api/v1/users",userRouter)

// Export the app instance for use in other parts of the application
export { app };
