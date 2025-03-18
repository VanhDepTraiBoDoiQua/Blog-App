import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import commentRouter from "./routes/comment.route.js";
import adminRouter from "./routes/admin.route.js";
import { connectDB } from "./lib/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./strategy/strategy.js";
import session from "express-session";

const app = express();

// allow fetching data from another port
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// all routes
// use JSON for all routes below
app.use(express.json());
app.use(cookieParser());

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    user = "Hello";
    done(null, user);
});

app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/admin", adminRouter);
// all routes

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack,
    });
});

// listen on a port
app.listen(3000, () => {
    connectDB();
    console.log("Server is running!");
})