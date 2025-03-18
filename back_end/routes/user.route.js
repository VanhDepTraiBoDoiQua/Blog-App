import express from "express";
import { getUserSavedPosts, savePost, updateUser, connectFacebook, connectGoogle } from "../controllers/user.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import passport from "../strategy/strategy.js"

const router = express.Router();

router.get("/saved", isAuth, getUserSavedPosts);

router.patch("/save", isAuth, savePost);

router.patch("/", isAuth, updateUser);

// connect facebook
router.get("/connect/facebook", passport.authenticate("facebook-connect"));

// connect facebook callback
router.get("/connect/facebook/callback", (req, res, next) => {
    passport.authenticate("facebook-connect", (err, user, info) => {
        if (err || !user) {
            if (!err) {
                return res.redirect(`${process.env.CLIENT_URL}/home?error=${encodeURIComponent("Connect rejected")}`);
            }
            return res.redirect(`${process.env.CLIENT_URL}/home?error=${encodeURIComponent(err.message)}`);
        }
        return connectFacebook(req, res, user);
    })(req, res, next);
}, );

// connect google
router.get("/connect/google", passport.authenticate("google-connect"));

// connect google callback
router.get("/connect/google/callback", (req, res, next) => {
    passport.authenticate("google-connect", (err, user, info) => {
        if (err || !user) {
            if (!err) {
                return res.redirect(`${process.env.CLIENT_URL}/home`);
            }
            return res.redirect(`${process.env.CLIENT_URL}/home`);
        }
        return connectGoogle(req, res, user);
    })(req, res, next);
}, );

export default router;