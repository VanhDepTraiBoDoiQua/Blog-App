import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import SocialAccount from "../models/socialAcount.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { sequelize } from "../lib/connectDB.js";

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

export const connectFacebook = async (req, res, user) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(403).redirect(`${process.env.CLIENT_URL}/home`);
    }

    const verified = jwt.decode(token, process.env.TOKEN_SECRET);
    if (!verified) {
        return res.status(403).redirect(`${process.env.CLIENT_URL}/home`);
    }

    const findUser = await User.findOne({
        where: {
            id: verified.id,
        }
    })

    await SocialAccount.create({
        userId: findUser.id,
        provider: "facebook",
        providerUserId: user.id,
    })

    return res.status(200).redirect(`${process.env.CLIENT_URL}/home?success=${encodeURIComponent("Connect social account successfully!")}`);
}

export const connectGoogle = async (req, res, user) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(403).redirect(`${process.env.CLIENT_URL}/home`);
    }

    const verified = jwt.decode(token, process.env.TOKEN_SECRET);
    if (!verified) {
        return res.status(403).redirect(`${process.env.CLIENT_URL}/home`);
    }

    const findUser = await User.findOne({
        where: {
            id: verified.id,
        }
    })

    await SocialAccount.create({
        userId: findUser.id,
        provider: "google",
        providerUserId: user.id,
    })

    return res.status(200).redirect(`${process.env.CLIENT_URL}/home?success=${encodeURIComponent("Connect social account successfully!")}`);
}

export const deleteUser = async(req, res) => {
    const user = req.user;

    if (user.role !== "admin") {
        return res.status(403).json("Not authorized!");
    } 

    const userId = req.params.id;

    const findById = await User.findOne({
        where: {
            id: userId,
        }
    });
    if (!findById) {
        return res.status(404).json("User not found");
    }

    const t = await sequelize.transaction();

    try {
        const allPosts =  await Post.findAll({
            where: {
                userId: userId,
            },
            transaction: t,
        });

        for (const post of allPosts) {
            await Comment.destroy({
                where: {
                    postId: post.id,
                },
                transaction: t,
            });
        }

        await Comment.destroy({
            where: {
                userId: userId,
            },
            transaction: t,
        });

        await Post.destroy({
            where: {
                userId: userId,
            },
            transaction: t,
        });

        await SocialAccount.destroy({
            where: {
                userId: userId,
            },
            transaction: t,
        });

        await User.destroy({
            where: {
                id: userId,
            },
            transaction: t,
        });

        await t.commit();

        console.log("User deleted");
        return res.status(200).json("Deleted");
    
    } catch (err) {
        await t.rollback();
        console.log(err);
        return res.status(400).json("An error has occured!");
    }
}