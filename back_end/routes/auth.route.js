import express from "express";
import { createUser, emailLogin, passwordLogin, getUser, logoutUser, facebookCallback, googleCallback } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

// user register
router.post("/register", createUser);

// user login
router.post("/login/email", emailLogin);
router.post("/login/password", passwordLogin);

// login with facebook
router.get("/facebook", passport.authenticate("facebook"));

// facebook callback
router.get("/facebook/callback", 
    passport.authenticate("facebook", {
        failureRedirect: `${process.env.CLIENT_URL}/login`,
    }),
    facebookCallback
);

// login with google
router.get("/google", passport.authenticate("google"));

// google callback
router.get("/google/callback", 
    passport.authenticate("google", {
        failureRedirect: `${process.env.CLIENT_URL}/login`,
    }),
    googleCallback
)

// user logout
router.post("/logout", logoutUser);

// get user info
router.get("/user", isAuth, getUser);

export default router;