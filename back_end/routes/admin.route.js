import express from "express";
import { getAllUsers, createUser, getAllPosts, publishPost, getAllCategories } from "../controllers/admin.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuth, getAllUsers);

router.post("/", isAuth, createUser);

router.get("/posts", isAuth, getAllPosts);

router.patch("/publish", isAuth, publishPost);

router.get("/category", isAuth, getAllCategories);

export default router;