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

// get all users for admin
export const getAllUsers = async(req, res) => {
    const role = req?.auth?.sessionClaims?.metadata?.role || "user";
    if (role === "admin") {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        try {
            const users = await clerkClient.users.getUserList({
                limit: limit,
                offset: (page-1) * limit,
            });
            const totalUser = await clerkClient.users.getCount();
            const hasMore = (page*limit) < totalUser;
            res.status(200).json({users, hasMore});
        } catch(err) {
            console.log(err);
        }
    } else {
        return res.status(403).json("Forbidden!");
    }
}

// admin create an user
export const createUser = async(req, res) => {
    const role = req.auth.sessionClaims?.metadata?.role || "user";
    if (role === "admin") {
        try {
            const userData = req.body.data;
            const findByEmail = await clerkClient.users.getCount({
                emailAddress: userData.email_address,
            });
            if (findByEmail > 0) {
                return res.status(400).json("Email already exists");
            }

            const findByUsername = await clerkClient.users.getCount({
                username: userData.username,
            });
            if (findByUsername > 0) {
                return res.status(400).json("Username already exists");
            }

            const newUser = await clerkClient.users.createUser(userData);
            return res.status(200).json(newUser);
        } catch(err) {
            console.log(err);
        }
    } else {
        return res.status(403).json("Forbidden!");
    }
}