import express from "express";
import { getUserSavedPosts, savePost, updateUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/saved", isAuth, getUserSavedPosts);

router.patch("/save", isAuth, savePost);

router.patch("/", isAuth, updateUser);

export default router;