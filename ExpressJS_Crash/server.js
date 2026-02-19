import express from 'express';
import path from 'path';
import postsRouter from "./routes/posts.js"; // Import the router object from the "posts.js" file in the "routes" directory. This allows us to use the routes defined in "posts.js" in our main server file (e.g., server.js) by mounting the router on a specific path (e.g., "/api/posts").
import * as middleware from "./middleware/index.js"; // Import all middleware functions from the "index.js" file in the "middleware" directory. This allows us to use the logger, error handling, and 404 not found middleware in our main server file (e.g., server.js) without having to import each one individually.

const app = express(); // Create an instance (object) of the Express application. It will handle everything related to our server, such as routing, requests, responses, etc.

const PORT = process.env.PORT || 3000;

// Setup middleware to serve static files from the "public" directory. This allows us to serve HTML, CSS, JavaScript, and other static assets directly from that folder.
// app.use(express.static(path.join(path.resolve(), 'public')));
// This creates a static file server that serves files from the "public" directory. The "path.join(path.resolve(), 'public')" part constructs the absolute path to the "public" directory, ensuring that it works correctly regardless of where the server is run from.
// We can access the static files in the "public" directory by navigating to the corresponding URL. For example, if we have an "index.html" file in the "public" directory, we can access it by going to "http://localhost:3000/index.html" in our web browser.

// Body Parser Middleware
app.use(express.json()); // This built-in middleware is used to parse incoming JSON payloads in the request body. It allows us to access the data sent by the client in a structured format (as a JavaScript object) through "req.body" in our route handlers. This is particularly useful for handling POST and PUT requests where the client sends data to the server.
app.use(express.urlencoded({ extended: false })); // This built-in middleware is used to parse incoming URL-encoded payloads, which are typically sent by HTML forms. The "extended: true" option allows for parsing of nested objects and arrays in the URL-encoded data. This means that if a form submits data with nested fields (e.g., "user[name]=John&user[age]=30"), it will be parsed into a JavaScript object (e.g., { user: { name: 'John', age: 30 } }) that can be accessed through "req.body" in our route handlers.

// Logger Middleware
app.use(middleware.logger); // Apply the logger middleware GLOBALLY to all routes. This means that EVERY incoming request will go through the logger middleware, allowing us to log the HTTP method and URL of each request for debugging and monitoring purposes.

// I cut the app.get routes and moved them to a separate file called "posts.js" in the "routes" directory. This is a common practice to keep the main server file clean and organized, especially as the number of routes increases.

// Routes
app.use("/api/posts", postsRouter);


// Error Handling Middleware
app.use(middleware.notFound404); // Catch-all error middleware. Apply the 404 not found middleware GLOBALLY to all routes. This means that if a request is made to a route that doesn't exist, it will be handled by this middleware.
app.use(middleware.errorHandler); // Apply the error handling middleware GLOBALLY to all routes. This means that if any route handler encounters an error and calls "next(error)", it will be caught and handled by this middleware, allowing us to send a consistent error response back to the client.

// P.S. Express processes middleware in the order they are defined. 
// This means that if you define a route handler before the error handling middleware, and that route handler encounters an error, it will pass the error to the next middleware in the chain (which is the error handling middleware) using "next(error)". 
// The error handling middleware will then catch that error and send an appropriate response back to the client. If you were to define the error handling middleware before the route handlers, it would not be able to catch errors from those handlers, as it would be defined too early in the middleware chain. 
// Therefore, it's important to define your route handlers first and then your error handling middleware at the end of your middleware stack.

// app.use is used for mounting middleware functions at a specific path. In this case, we are mounting the "postsRouter" middleware, which contains the routes defined in the "posts.js" file.
//  This means that any requests that match the routes defined in "posts.js" will be handled by that router.

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

server.on('error', (err) => {
    console.error('Server error:', err);
}); // Optionally, you can listen for errors on the server instance to handle any issues that may arise during startup or runtime.
