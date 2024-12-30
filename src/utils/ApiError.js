// Custom error class for handling API errors
class ApiError extends Error {
    // Constructor to initialize the error properties
    constructor(
      statusCode, // HTTP status code (e.g., 404, 500)
      message = "Something went wrong", // Error message (default value)
      errors = [], // Additional error details (default is an empty array)
      stack = "" // Stack trace (optional)
    ) {
      super(message); // Call the parent class (Error) constructor with the message
  
      // Set the custom properties
      this.statusCode = statusCode; // HTTP status code
      this.data = null; // Placeholder for any extra data (default is null)
      this.message = message; // Error message
      this.success = false; // Success is always false for errors
      this.errors = errors; // Array to store additional error details
  
      // Handle the stack trace
      if (stack) {
        this.stack = stack; // Use the provided stack trace if available
      } else {
        // Capture the stack trace automatically
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  // Export the custom error class for use in other files
  export { ApiError };
  