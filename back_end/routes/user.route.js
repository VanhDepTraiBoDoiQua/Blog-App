import express from "express";
import { getUserSavedPosts, savePost, getAllUsers, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/saved", getUserSavedPosts);

router.patch("/save", savePost);

router.get("", getAllUsers);

router.post("", createUser);

export default router;