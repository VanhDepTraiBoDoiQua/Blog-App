import express from "express";
import { getPosts, getPost, createPost, deletePost, uploadAuth, featurePost } from "../controllers/post.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import { increaseVisit } from "../middlewares/increaseVisit.middleware.js";

const router = express.Router();

// upload image
router.get("/upload-auth", uploadAuth);

// get all posts
router.get("/", getPosts);

// get a single post
router.get("/:slug", increaseVisit, getPost);

// create a single post
router.post("/", isAuth, createPost);

// delete a single post
router.delete("/:id", isAuth, deletePost);

// feature a post
router.patch("/feature", isAuth, featurePost);


export default router;