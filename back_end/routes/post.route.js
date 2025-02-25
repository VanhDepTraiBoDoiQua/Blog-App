import express from "express"
import { getPosts, getPost, createPost, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

// get all posts
router.get("/", getPosts);

// get a single post
router.get("/:slug", getPost);

// create a single post
router.post("/", createPost);

// delete a single post
router.delete("/:id", deletePost);

export default router;