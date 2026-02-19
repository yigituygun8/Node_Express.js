import express from "express"

// Create a new router object using the "Router" method from the Express library.
// This router will be used to define routes for handling HTTP requests related to posts.
const router = express.Router(); 

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
    },
    {
        id: 5,
        title: "Fifth Post",
    },
    {
        id: 6,
        title: "Sixth Post",
    }
]

// Convention to prefix API routes with "/api" to distinguish them from routes that serve static files or other types of content. This helps to organize the routes and makes it clear which routes are meant for API endpoints.

// Get all posts
router.get("/", (req, res) => {
    // res.send({message: "Hello World!"}); // Send a response back to the client with the message "Hello World!" when they access the root URL ("/"). "send" method automatically sets the appropriate content type.

    const limit = parseInt(req.query.limit) || 5; // Get the "limit" query parameter from the request and convert it to an integer. If the "limit" parameter is not provided or cannot be converted to a valid number, it defaults to 10.

    if(isNaN(limit) || limit <= 0) { // check if it is a number (for attacks or invalid input)
        return res.status(400).json({message: "Invalid limit parameter"});
    }
    res.status(200).json(posts.slice(0, limit)); // Send a JSON response back to the client with the list of posts, limited to the number specified by the "limit" query parameter. The "slice" method is used to return only the first "limit" number of posts from the "posts" array.
})

// Get a single post by ID
router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id); // get the id from parameters and convert it to an integer. Always remember that parameters from the URL are strings by default, so we need to convert it to the appropriate type (in this case, an integer) before using it to find the post.
    const post = posts.find(p => p.id === id); // find the post with the matching id in the "posts" array
    // post is a JSON object here
    if(!post) {
        const error = new Error(`Post with id ${id} not found`); // Create a new error object with a message indicating that the post with the specified id was not found.
        error.status = 404; // Set the "status" property of the error object to 404 -> REQUESTED SOURCE NOT FOUND
        return next(error); // Pass the error to the next middleware in the chain (error handling middleware). This allows us to handle the error in a centralized way, rather than having to handle it in every route handler. By calling "next(error)", we are telling Express to skip any remaining route handlers and go directly to the error handling middleware, where we can send a response back to the client with the appropriate error message and status code.
    }
    res.status(200).json(post);
})

// Create a new post
router.post("/", (req, res, next) => {
    console.log(req.body)

    // In a real application, you would typically validate the incoming data and save it to a database. For this example, we will just add it to our hardcoded "posts" array.
    // 201 is the status code for "Created" (new resources has been added)
    const newPost = {
        id: posts.length + 1,
        title: req.body.title, // Get the title from the request body. !!! This assumes that the client is sending a JSON payload with a "title" field when making the POST request.
    }
    if(!newPost.title) {
        const error = new Error("Title is required");
        error.status = 400;
        return next(error);
    }
    newPost.title = newPost.title.trim();
    posts.push(newPost);
    res.status(201).json({message: "Post created successfully", post: newPost})
});

// Put (Update) Post
router.put("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if(!post) {
        const error = new Error(`Post with id ${id} not found`);
        error.status = 404;
        return next(error);
    }

    if(!req.body.title) {
        const error = new Error("Title is required");
        error.status = 400; // 400 is the status code for "Bad Request" (the server cannot process the request due to client error, such as missing required fields or invalid data)
        return next(error);
    }
    const updatedTitle = req.body.title.trim();
    post.title = updatedTitle;
    res.status(200).json({message: "Post updated successfully", post});
})

// Delete Post
router.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if(!post) {
        const error = new Error(`Post with id ${id} not found`);
        error.status = 404;
        return next(error);
    }
    posts = posts.filter(p => p.id !== id); // Remove the post with the matching id from the "posts" array using the "filter" method, which creates a new array that includes all posts except the one with the specified id.
    res.status(200).json({message: `Post with id ${id} deleted successfully`});
});


// It is important to export the router object at the end of the file so that it can be imported and used in other parts of the application, such as the main server file (e.g., server.js).
export default router;