const notFound404 = (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error); // Pass the error to the next middleware in the chain (error handling middleware). This allows us to handle 404 errors in a centralized way, rather than having to handle them in every route handler. 
    // By calling "next(error)", we are telling Express to skip any remaining route handlers and go directly to the error handling middleware, where we can send a response back to the client with the appropriate error message and status code.
}

export default notFound404;