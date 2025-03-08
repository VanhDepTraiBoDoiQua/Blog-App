import User from "../models/user.model.js";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY});

//get all saved posts
export const getUserSavedPosts = async (req, res) => {
    const clerkId = req.auth.userId;

    if (!clerkId) {
        return res.status(401).json("Not authenticated!");
    }

    try {
        const user = await User.findOne({
            where: {
                clerkId: clerkId,
            },
        });
        res.status(200).json(user.savedPosts);
    } catch(err) {
        console.log(err);
    }
}

// save or unsave a post
export const savePost = async (req, res) => {
    const clerkId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({
        where: {
            clerkId: clerkId,
        },
    })

    const isSaved = user.savedPosts.some((p) => p === postId);

    if (!isSaved) {
        try {
            user.savedPosts.push(postId);
            user.changed("savedPosts", true);
            await user.save();
            res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
        } catch(err) {
            console.log(err);
        }
    } else {
        try {
            user.savedPosts = user.savedPosts.filter(id => id !== postId);
            user.changed("savedPosts", true);
            await user.save();
            res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
        } catch(err) {
            console.log(err);
        }
    }
}

export const getAllUsers = async(req, res) => {
    const role = req.auth.sessionClaims?.metadata?.role || "user";
    if (role === "admin") {
        try {
            const users = await clerkClient.users.getUserList();
            res.status(200).json(users);
        } catch(err) {
            console.log(err);
        }
    } else {
        return res.status(403).json("Forbidden!");
    }
}

export const createUser = async(req, res) => {
    const role = req.auth.sessionClaims?.metadata?.role || "user";
    if (role === "admin") {
        try {
            const userData = req.body.data;
            const user = await clerkClient.users.createUser(userData);
            console.log("User created!");
            res.status(200);
        } catch(err) {
            console.log(err);
        }
    } else {
        return res.status(403).json("Forbidden!");
    }
}