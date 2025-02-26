import express from "express";
import { clerkWebHook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const router = express.Router();

// clerk webhook
// Svix requires raw data, not JSON
router.post("/clerk", bodyParser.raw({type: 'application/json'}), clerkWebHook);

export default router;