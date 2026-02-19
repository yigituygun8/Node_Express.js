const errorHandler = (err, req, res, next) => {
    if(err.status) {
        res.status(err.status).json({message: err.message}); // If the error object has a "status" property, use that status code in the response and send a JSON response with the error message.
    } else {
        res.status(500).json({message: "Internal Server Error", error: err.message}); // Send a JSON response with a 500 status code and a message indicating an internal server error. The "error" field in the response includes the error message from the error object passed to the middleware.
    }
}

/*
In Express, error handling middleware is a special type of middleware that is designed to catch and handle errors that occur during the processing of requests. It is defined with four parameters: "err", "req", "res", and "next".
- "err": This parameter represents the error object that is passed to the middleware when an error occurs. It contains information about the error, such as the error message and stack trace.
- "req": This parameter represents the incoming request object, which contains information about the HTTP request being processed.
- "res": This parameter represents the response object, which is used to send a response back to the client.
- "next": This parameter is a function that is used to pass control to the next middleware function in the chain. In error handling middleware, you typically do not call "next()" unless you want to pass the error to another error handling middleware.

When any route calls next(err) with an argument, Express skips all regular middleware and jumps directly to the next error handler — which in our case is errorHandler at the bottom.
*/

export default errorHandler;