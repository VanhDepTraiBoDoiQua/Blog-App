import express from "express";
import { getAllUsers, createUser } from "../controllers/admin.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuth, getAllUsers);

router.post("/", isAuth, createUser);

export default router;