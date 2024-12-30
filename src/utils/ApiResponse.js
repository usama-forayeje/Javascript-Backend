class ApiResponse {
    constructor(
        statusCode,  // The HTTP status code (e.g., 200, 400, 500)
        data,        // The response data (e.g., fetched data, created resource)
        message = 'Success'  // The default message for the response (default: 'Success')
    ) {
        // Initialize the class properties
        this.statusCode = statusCode;  // Set the status code
        this.data = data;              // Set the response data
        this.message = message;        // Set the response message
        this.success = statusCode < 400; // Automatically determine success based on the status code
        // If the status code is less than 400 (e.g., 200 OK), success is true; otherwise, false
    }
}
