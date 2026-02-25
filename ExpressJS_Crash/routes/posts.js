import express from "express"
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postsController.js";

// Create a new router object using the "Router" method from the Express library.
// This router will be used to define routes for handling HTTP requests related to posts.
const router = express.Router(); 

// Convention to prefix API routes with "/api" to distinguish them from routes that serve static files or other types of content. This helps to organize the routes and makes it clear which routes are meant for API endpoints.

// Get all posts
router.get("/", getPosts); 

// Get a single post by ID
router.get("/:id", getPostById); 

// Create a new post
router.post("/", createPost); 

// Put (Update) Post
router.put("/:id", updatePost); 

// Delete Post
router.delete("/:id", deletePost); 


// It is important to export the router object at the end of the file so that it can be imported and used in other parts of the application, such as the main server file (e.g., server.js).
export default router;