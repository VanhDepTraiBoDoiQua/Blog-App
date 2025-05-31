import { sequelize } from "../lib/connectDB.js";
import Category from "../models/category.model.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// get all users
export const getAllUsers = async(req, res) => {
    const user = req.user;
    if (user.role === "admin") {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        try {
            const users = await User.findAll({
                limit: limit,
                offset: (page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            const totalUser = await User.count();
            const hasMore = (page*limit) < totalUser;
            return res.status(200).json(
                {
                    users: users,
                    hasMore: hasMore,
                }
            );
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    }
    return res.status(403).json("Forbidden");
}

// admin create an user
export const createUser = async(req, res) => {
    const user = req.user;
    if (user.role === "admin") {
        const userData = req.body.data;
        const findByEmail = await User.count({
            where: {
                email: userData.email,
            }
        });
        if (findByEmail > 0) {
            return res.status(400).json("Email already exists");
        }

        const findByUsername = await User.count({
            where: {
                username: userData.username,
            },
        });
        if (findByUsername > 0) {
            return res.status(400).json("Username already exists");
        }

        try {
            const newUser = await User.create({
                ...userData,
                password: bcrypt.hashSync(userData.password, 10),
                role: "user",
            })

            console.log("User created!");
            return res.status(200).json("User created!");

        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured!");
        }
    }
    return res.status(403).json("Forbidden!");
}

// admin get all posts
export const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // filter
    const query = {};

    try {
        const posts = await Post.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: query,
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                }
            ],
            order: [['createdAt', 'DESC']],
        });
        const totalPosts = await Post.count({
            where: query,
        });
        const hasMore = (page * limit) < totalPosts;
        res.status(200).json({posts, hasMore});
    } catch(err) {
        console.log(err);
    }
}

export const publishPost = async (req, res) => {
    const user = req.user;

    if (user.role !== "admin") {
        return res.status(403).json("Not authorized!");
    }

    try {
        const post = await Post.findOne({
            where: {
                id: req.body.postId,
            },
        });
    
        if (!post) {
            return res.status(404).json("Post not found");
        }
    
        if (post.status === "published") {
            post.status = "pending";
        } else {
            post.status = "published";
        }
        
        await post.save();

        res.status(200).json(post);
    } catch(err) {
        console.log(err);
    }
}

export const getAllCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // filter
    const query = {};

    try {
        const categories = await Category.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: query,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Post,
                    attributes: [],
                    required: false,
                }
            ],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Posts.id')), 'posts']
                ]
            },
            group: ['Category.id'],
            subQuery: false
        });
        const totalCategories = await Category.count({
            where: query,
        });
        const hasMore = (page * limit) < totalCategories;
        res.status(200).json({categories, hasMore});
    } catch(err) {
        console.log(err);
    }
}

export const getAllComments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // filter
    const query = {};

    try {
        const comments = await Comment.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: query,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Post,
                    attributes: ["title"],
                },
                {
                    model: User,
                    attributes: ["username"],
                }
            ],
        });
        const totalComments = await Comment.count({
            where: query,
        });
        const hasMore = (page * limit) < totalComments;
        res.status(200).json({comments, hasMore});
    } catch(err) {
        console.log(err);
    }
}

export const updateUser = async (req, res) => {
    const user = req.user;
    if (user.role === "admin") {
        const userData = req.body.data;

        const findByEmail = await User.count({
            where: {
                email: userData.email,
                id: {
                    [Op.not]: userData.id,
                },
            },
        });
        if (findByEmail > 0) {
            return res.status(400).json("Email already exists");
        }

        const findByUsername = await User.count({
            where: {
                username: userData.username,
                id: {
                    [Op.not]: userData.id,
                },
            },
        });
        if (findByUsername > 0) {
            return res.status(400).json("Username already exists");
        }

        try {
            const user = await User.findOne({
                where: {
                    id: userData.id
                },
            });
            if (userData.password) {
                user.password = bcrypt.hashSync(userData.password, 10);
            }
            user.username = userData.username;
            user.email = userData.email;
            user.role = userData.role;

            await user.save();

            return res.status(200).json("User created!");

        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured!");
        }
    }
    return res.status(403).json("Forbidden!");
}