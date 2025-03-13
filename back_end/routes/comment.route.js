import express from "express";
import {getComments, postComments, deleteComments} from "../controllers/comment.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:postId", getComments);

router.post("/:postId", isAuth, postComments);

router.delete("/:id", isAuth, deleteComments);

export default router;