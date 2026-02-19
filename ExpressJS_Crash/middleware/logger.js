// This file defines a middleware function called "logger" that logs the HTTP method and the original URL of incoming requests to the console. 
// This is useful for debugging and monitoring purposes, as it allows you to see which routes are being accessed and how they are being accessed (e.g., GET, POST, etc.). 
// We seperated this middleware function into its own file (logger.js) to keep our code organized and modular. This way, we can easily reuse the logger middleware in different parts of our application by importing it where needed.
// instead of having it in posts.js or any other route file, we can have it in a separate file and import it into our main server file (e.g., server.js) and apply it globally to all routes, or we can apply it to specific routes as needed. 
// This promotes code reusability and separation of concerns, making our application easier to maintain and scale.
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`); 
    next(); // Call the next middleware function in the chain. This is important to ensure that the request continues to be processed and eventually reaches the appropriate route handler. If you forget to call "next()", the request will hang and the client will not receive a response.
}

export default logger;