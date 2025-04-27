import express from "express";
import { getAllCategories, createCategory } from "../controllers/category.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);

router.post("/", isAuth, createCategory);

export default router;