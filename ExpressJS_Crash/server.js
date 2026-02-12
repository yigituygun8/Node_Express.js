import express from 'express';
import path from 'path';

const app = express(); // Create an instance (object) of the Express application. It will handle everything related to our server, such as routing, requests, responses, etc.

const PORT = process.env.PORT || 3000;

// Setup middleware to serve static files from the "public" directory. This allows us to serve HTML, CSS, JavaScript, and other static assets directly from that folder.
// app.use(express.static(path.join(path.resolve(), 'public')));
// This creates a static file server that serves files from the "public" directory. The "path.join(path.resolve(), 'public')" part constructs the absolute path to the "public" directory, ensuring that it works correctly regardless of where the server is run from.

// We can access the static files in the "public" directory by navigating to the corresponding URL. For example, if we have an "index.html" file in the "public" directory, we can access it by going to "http://localhost:3000/index.html" in our web browser.

// We normally use DB but let's hardcode some data
let posts = [
    {
        id: 1,
        title: "First Post",
    },
    {
        id: 2,
        title: "Second Post",
    },
    {
        id: 3,
        title: "Third Post",
    },
    {
        id: 4,
        title: "Fourth Post",
    }
]


// Convention to prefix API routes with "/api" to distinguish them from routes that serve static files or other types of content. This helps to organize the routes and makes it clear which routes are meant for API endpoints.

// Get all posts
app.get("/api/posts", (req, res) => {
    // res.send({message: "Hello World!"}); // Send a response back to the client with the message "Hello World!" when they access the root URL ("/"). "send" method automatically sets the appropriate content type.
    
    res.status(200).json(posts); // Send the "posts" array as a JSON response to the client. The "json" method automatically converts the JavaScript object (in this case, the "posts" array) into a JSON string and sets the appropriate content type for the response.
})


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

server.on('error', (err) => {
    console.error('Server error:', err);
}); // Optionally, you can listen for errors on the server instance to handle any issues that may arise during startup or runtime.
