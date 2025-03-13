import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//get all saved posts
export const getUserSavedPosts = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user.savedPosts);
}

// save or unsave a post
export const savePost = async (req, res) => {
    const postId = req.body.postId;

    const user = req.user;

    const isSaved = user.savedPosts.some((p) => p === postId);

    if (!isSaved) {
        try {
            user.savedPosts.push(postId);
            user.changed("savedPosts", true);
            await user.save();
            return res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    } else {
        try {
            user.savedPosts = user.savedPosts.filter(id => id !== postId);
            user.changed("savedPosts", true);
            await user.save();
            res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    }
}

export const updateUser = async (req, res) => {
    const user = req.user;
    const userData = req.body;
    
    if (userData.username) {
        const findByUsername = await User.count({
            where: {
                username: userData.username,
            },
        });
        if (findByUsername > 0) {
            return res.status(400).json("Username already exists");
        }
    }

    if (userData.curPass && userData.newPass) {
        const isValid = bcrypt.compareSync(userData.curPass, user.password);
        if (!isValid) {
            return res.status(400).json("Wrong password");
        }
    }

    if(user) {
        try {
            Object.assign(user, userData);
            if (userData.newPass) {
                user.password = bcrypt.hashSync(userData.newPass, 10);
            }
            await user.save();
            return res.status(200).json("User information has been updated");
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    } else {
        return res.status(400).json("An error has occured");
    }
}