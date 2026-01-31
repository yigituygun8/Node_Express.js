// Let's create a simple users API
import { createServer } from 'http';

const users = [
    { id: 1, name: "Osman Yiğit"},
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jane Smith" }
] // Sample users data

// Logger middleware (usually put in a separate file)
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}

// JSON middleware (since we repeat the content-type)
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
} 

// Route handler for GET /api/users - route-specific middleware
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users)); // stringify: convert JS object/array to JSON string and send to client in response
    res.end();
}

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res, id) => {
    const user = users.find(u => u.id === id);
    if(user) {
        res.statusCode = 200;
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
}

// Route handler for POST /api/users to create a new user -get data from req body (hard with native Node.js because we have to collect data chunks manually)
const createUserHandler = (req, res) => {
    let body = ''; // to collect data chunks, create empty string
    // Listen for data
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string and append to body
    });
    // Listen for end of data
    req.on("end", () => {
        const newUser = JSON.parse(body); // parse JSON string to JS object 
        users.push(newUser); // add new user to users array (normally, we would save to a database)
        res.statusCode = 201; // Created status code
        res.write(JSON.stringify(newUser)); // respond with the created user 
        res.end();
    })
}


// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
}

// We cleaned up the server creation by moving logic to middleware and handlers
const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if(req.method === "GET" && req.url === "/api/users") {
                getUsersHandler(req, res);
            } 
            else if (req.method === "GET" && req.url.match(/\/api\/users\/\d+/)) { 
                // The first and last slashes are start and end of the regex, \d+ means one or more digits. Backslashes are used to escape forward slashes for the path.
                const id = parseInt(req.url.split("/")[3]); // Get the ID from the URL
                getUserByIdHandler(req, res, id);
            }
            else if(req.method === "POST" && req.url === "/api/users") {
                createUserHandler(req, res); 
            }
            else {
                notFoundHandler(req, res);
            }
        });
    });
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})