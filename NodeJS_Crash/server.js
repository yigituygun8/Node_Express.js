// This file is a simple Node.js server that responds incoming request.
import http from 'http'; // http module is built-in in Node.js
// fs module is built-in in Node.js which allows us to work with the file system
// import fs from 'fs'; // This is callback-based module 
import fs from 'fs/promises'; // This is promise-based module, which is easier to work with using then/catch or async/await

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

// Get current path - __filename and __dirname are not available in ES modules but available in CommonJS, so we use import.meta.url
import url from 'url';
import path from 'path';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current file path:', __filename);
console.log('Current directory path:', __dirname);

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url); // Log the request URL and method, which are properties of the request object

    // With native Node.js, we have to check the URL and method to handle different routes and methods so Express makes this easier
    // For example:
    // if(req.url === '/api/posts' && req.method === 'GET') {
    //     // Handle GET request for /api/posts
    // } This is done automatically in Express with app.get('/api/posts', (req, res) => {})

    // res.setHeader('Content-Type', 'text/html'); // Set the response header
    // res.statusCode = 404; // Set the response status code
    // Or use writeHead to set both header and status code
    
    // Create simple routing - handling many routes and methods manually
    try {
        // Check if GET request
        if(req.method === 'GET') {
            let filePath;
            if (req.url === '/') {
                // res.writeHead(200, {'Content-Type': 'text/html'});
                // res.write('<h1>Home Page</h1>');
                // res.end();
                filePath = path.join(__dirname, "public", "index.html");
            } else if(req.url === '/about') {
                // res.writeHead(200, {'Content-Type': 'text/html'});
                // res.write('<h1>About Page</h1>');
                // res.end();
                filePath = path.join(__dirname, "public", "about.html");
            }
            else {
                // res.writeHead(404, {'Content-Type': 'text/plain'});
                // res.write('404 Not Found');
                // res.end();
                throw new Error('404: Cannot find the page: ' + req.url);
                // we could create a 404 html page for this as well
            } 
            const data = await fs.readFile(filePath, 'utf-8'); // Read the HTML file
            res.writeHead(200, {'Content-Type': 'text/html'}); // Set the response header to HTML
            res.write(data); // Write the HTML file content to the response
        } else {
            throw new Error('Cannot use method: ' + req.method); 
        }
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500 Internal Server Error\n' + error.message);
        res.end();
    }
    
    // if (req.method === 'POST' && req.url === '/') {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write('<h1>POST request received!</h1>');
    //     res.end();
    // } 
    

    // res.writeHead(500, {'Content-Type': 'application/json'});
    // res.write(JSON.stringify({ message: 'Internal Server Error' })); // Write response to the client

    res.end(); // End the response - Express does this automatically
});

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})

/*
So, in this file, we created a simple, low-level Node.js server that listens on a specified port, accessed from environment variables (.env) and responds to incoming requests. We used the built-in http module to create the server and handle requests and responses. We also demonstrated how to read HTML files from the file system using the fs/promises module and serve them based on the request URL.

Now, in server2.js file, we will build a simple API. 
*/