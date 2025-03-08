import { Sequelize } from "sequelize";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import { sequelize } from "../lib/connectDB.js";
import Comment from "../models/comment.model.js";

// get all post
export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const posts = await Post.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            include: {
                model: User,
                attributes: ['username'],
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        const totalPosts = await Post.count();
        const hasMore = (page * limit) < totalPosts;
        res.status(200).json({posts, hasMore});
    } catch(err) {
        console.log(err);
    }
}

// get a single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug,
            },
            include: {
                model: User,
                attributes: [
                    'username', 
                    'img'
                ],
            },
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
    }
}

// create a single post
export const createPost = async (req, res) => {
    const clerkId = req.auth.userId;

    if (!clerkId) {
        return res.status(401).json("Not authenticated!");
    }

    // generate slug for a new post
    let slug = req.body.title
        .normalize("NFD") // Tách dấu khỏi ký tự gốc
        .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
        .replace(/đ/g, "d").replace(/Đ/g, "D") // Chuyển "đ" thành "d"
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Xóa ký tự đặc biệt (ngoại trừ chữ, số, dấu cách, "-")
        .trim() // Xóa khoảng trắng đầu cuối
        .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu "-"
        .toLowerCase(); // Chuyển về chữ thường
    let existingPost = await Post.findOne({
        where: {
            slug: slug,
        },
    });
    let counter = 2;
    while(existingPost) {
        slug = `${slug}-${counter}`;
        existingPost = await Post.findOne({
            where: {
                slug: slug,
            },
        });
        counter++;
    }

    try {
        const user = await User.findOne({
            where: {
                clerkId: clerkId,
            },
        });

        const post = await Post.create({
            userId: user.id,
            slug: slug,
            ...req.body,
        });
        res.status(200).json(post);
        console.log("Post created!");
    } catch (err) {
        console.log(err);
    }
}

// delete a single post
export const deletePost = async (req, res) => {
    const clerkId = req.auth.userId;
    
    if (!clerkId) {
        return res.status(401).json("Not autheticated!");
    }
    
    const role = req.auth.sessionClaims?.metadata?.role || "user";
    if (role === "admin") {
        try {
            // TO DO: delete all post's comment
            await Comment.destroy({
                where: {
                    postId: req.params.id,
                },
            });
    
            const deletedPost = await Post.destroy({
                where: {
                    id: req.params.id,
                },
            });
    
            console.log("Post deleted!");
    
            if (deletedPost === 0) {
                return res.status(403).json("You don't have permission to delete this post!");
            }
        } catch(err) {
            console.log(err);
        }
        return res.status(200).json("Deleted!");
    }

    try {
        const user = await User.findOne({
            where: {
                clerkId: clerkId,
            },
        });

        // TO DO: delete all post's comment
        await Comment.destroy({
            where: {
                postId: req.params.id,
            },
        });

        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                userId: user.id,
            },
        });

        console.log("Post deleted!");

        if (deletedPost === 0) {
            return res.status(403).json("You don't have permission to delete this post!");
        }
    } catch(err) {
        console.log(err);
    }
    res.status(200).json("Deleted!");
}

export const featurePost = async(req, res) => {
    const role = req.auth.sessionClaims?.metadata?.role || "user";
    const postId = req.body.postId;

    if (role !== "admin") {
        return res.status(403).json("Not authorized!");
    }
    try {
        const post = await Post.findOne({
            where: {
                id: postId,
            },
        });
    
        if (!post) {
            return res.status(404).json("Post not found");
        }
    
        post.isFeatured = !post.isFeatured;
        await post.save();

        res.status(200).json(post);
    } catch(err) {
        console.log(err);
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

export const uploadAuth = async(req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}
