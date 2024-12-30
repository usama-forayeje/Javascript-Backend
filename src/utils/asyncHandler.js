// A utility function to handle asynchronous route handlers and middleware
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Execute the asynchronous function and handle errors automatically
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); // Pass any errors to the next middleware (Express error handler)
    };
};

export { asyncHandler };

// Alternative implementation of asyncHandler
/*
const asyncHandler = (fun) => async (req, res, next) => {
    try {
        // Execute the asynchronous function
        await fun(req, res, next);
    } catch (error) {
        // If an error occurs, send a JSON response with the error details
        res.status(error.code || 500).json({
            status: false, // Indicate the request was not successful
            message: error.message // Include the error message
        });
    }
};
*/

