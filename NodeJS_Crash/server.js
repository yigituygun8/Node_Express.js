// This file is a simple Node.js server that responds incoming request.
import http from 'http'; // http module is built-in in Node.js

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

const server = http.createServer((req, res) => {
    console.log(req.method, req.url); // Log the request URL and method, which are properties of the request object

    // With native Node.js, we have to check the URL and method to handle different routes and methods so Express makes this easier
    // For example:
    // if(req.url === '/api/posts' && req.method === 'GET') {
    //     // Handle GET request for /api/posts
    // } This is done automatically in Express with app.get('/api/posts', (req, res) => {})

    // res.setHeader('Content-Type', 'text/html'); // Set the response header
    // res.statusCode = 404; // Set the response status code
    // Or use writeHead to set both header and status code
    res.writeHead(200, {'Content-Type': 'text/html'}); // Set the response header and status code
    if(res.statusCode === 200) {
        res.write('<h1>Hello, World! This is a simple Node.js server.</h1>'); // Write response to the client
    }
    else {
        res.write('<h1>Error Occured</h1>'); // Write response to the client
    }

    // res.writeHead(500, {'Content-Type': 'application/json'});
    // res.write(JSON.stringify({ message: 'Internal Server Error' })); // Write response to the client

    res.end(); // End the response - Express does this automatically
});

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})