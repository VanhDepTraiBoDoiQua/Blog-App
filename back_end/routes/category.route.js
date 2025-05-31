import express from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);

router.post("/", isAuth, createCategory);

router.post("/update-cat", isAuth, updateCategory);

router.delete("/:id", isAuth, deleteCategory);

export default router;