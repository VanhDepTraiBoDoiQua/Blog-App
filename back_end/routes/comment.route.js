import express from "express";
import {getComments, postComments, deleteComments} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getComments);

router.post("/:postId", postComments);

router.delete("/:id", deleteComments);

export default router;