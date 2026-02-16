import express from 'express';
import path from 'path';
import postsRouter from "./routes/posts.js" // import posts router

const app = express(); // Create an instance (object) of the Express application. It will handle everything related to our server, such as routing, requests, responses, etc.

const PORT = process.env.PORT || 3000;

// Setup middleware to serve static files from the "public" directory. This allows us to serve HTML, CSS, JavaScript, and other static assets directly from that folder.
// app.use(express.static(path.join(path.resolve(), 'public')));
// This creates a static file server that serves files from the "public" directory. The "path.join(path.resolve(), 'public')" part constructs the absolute path to the "public" directory, ensuring that it works correctly regardless of where the server is run from.
// We can access the static files in the "public" directory by navigating to the corresponding URL. For example, if we have an "index.html" file in the "public" directory, we can access it by going to "http://localhost:3000/index.html" in our web browser.

// Body Parser Middleware
app.use(express.json()); // This built-in middleware is used to parse incoming JSON payloads in the request body. It allows us to access the data sent by the client in a structured format (as a JavaScript object) through "req.body" in our route handlers. This is particularly useful for handling POST and PUT requests where the client sends data to the server.
app.use(express.urlencoded({ extended: false })); // This built-in middleware is used to parse incoming URL-encoded payloads, which are typically sent by HTML forms. The "extended: true" option allows for parsing of nested objects and arrays in the URL-encoded data. This means that if a form submits data with nested fields (e.g., "user[name]=John&user[age]=30"), it will be parsed into a JavaScript object (e.g., { user: { name: 'John', age: 30 } }) that can be accessed through "req.body" in our route handlers.



// I cut the app.get routes and moved them to a separate file called "posts.js" in the "routes" directory. This is a common practice to keep the main server file clean and organized, especially as the number of routes increases.

// Routes
app.use("/api/posts", postsRouter);
// app.use is used for mounting middleware functions at a specific path. In this case, we are mounting the "postsRouter" middleware, which contains the routes defined in the "posts.js" file.
//  This means that any requests that match the routes defined in "posts.js" will be handled by that router.

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

server.on('error', (err) => {
    console.error('Server error:', err);
}); // Optionally, you can listen for errors on the server instance to handle any issues that may arise during startup or runtime.
