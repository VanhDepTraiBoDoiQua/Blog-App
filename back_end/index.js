import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./lib/connectDB.js";
import webHookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

// allow fetching data from another port
app.use(cors(process.env.CLIENT_URL));

// clerk middleware for authentication
app.use(clerkMiddleware());


// all routes
app.use("/webhooks", webHookRouter);

// use JSON for all routes below
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
// all routes end

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message || "Something went wrong",
        status: error.status,
        stack: error.stack,
    });
});

// listen on a port
app.listen(3000, () => {
    connectDB();
    console.log("Server is running!");
})