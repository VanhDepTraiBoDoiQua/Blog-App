import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import Comment from "../models/comment.model.js";
import { Op } from "sequelize";
import Category from "../models/category.model.js";

const sanitizeInput = (input) => {
    if (typeof input !== "string") return input;
    return input.trim().replace(/[<>\/\\'"`]/g, "");
}


// get all post
export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // filter
    const query = {};

    query.status = "published";

    const cat = sanitizeInput(req.query.cat);
    const author = sanitizeInput(req.query.author);
    const searchQuery = sanitizeInput(req.query.searchQuery);
    const sortQuery = sanitizeInput(req.query.sortQuery);
    const featured = sanitizeInput(req.query.featured);

    // category filter
    if (cat) {
        query.categoryId = cat;
    }

    // author filter
    if (author) {
        const user = await User.findOne({
            where: {
                username: author,
            },
            attributes: ["id"],
        });

        if(!user) {
            return res.status(404).json("Username not found");
        }

        query.userId = user.id;
    }

    // title filter
    if (searchQuery) {
        query.title = {[Op.like]: `%${searchQuery}%`};
    }

    // sort options
    let sortOptions = ['createdAt', 'DESC'];

    if (sortQuery) {
        switch (sortQuery) {
            case "newest":
                sortOptions = ['createdAt', 'DESC'];
                break;

            case "oldest":
                sortOptions = ['createdAt', 'ASC'];
                break;

            case "popular":
                sortOptions = ['visit', 'DESC'];
                break;

            case "trending":
                sortOptions = ['visit', 'DESC'];
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                query.createdAt = {
                    [Op.gte]: new Date(today.getTime() - 7 *  24 * 60 * 60 * 1000),
                };
                break;

            default:
                break;
        }
    }

    if (featured) {
        query.isFeatured = true;
    }

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
                    attributes: ['id', 'name'],
                }
            ],
            order: [
                sortOptions,
            ],
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

// get a single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'img'],
                },
                {
                    model: Category,
                    attributes: ['id', 'name'],
                }
            ],
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
    }
}

// create a single post
export const createPost = async (req, res) => {
    const user = req.user;

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
        const post = await Post.create({
            userId: user.id,
            slug: slug,
            categoryId: req.body.category,
            ...req.body,
        });

        console.log("Post created!");
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(400).json("An error has occured");
    }
}

// delete a single post
export const deletePost = async (req, res) => {
    const user = req.user;

    const post = await Post.findOne({
        where: {
            id: req.params.id,
        }
    });

    if (!post) {
        return res.status(404).json("Post not found");
    }

    if (post.userId === user.id || user.role === "admin") {
        try {
            await Comment.destroy({
                where: {
                    postId: post.id,
                }
            });

            await Post.destroy({
                where: {
                    id: req.params.id,
                }
            });

            console.log("Post deleted!");
            return res.status(200).json("Post deleted!");
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    }
    return res.status(403).json("You don't have permission to delete this post!");
}

export const featurePost = async(req, res) => {
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

export const editPost = async (req, res) => {
    const user = req.user;

    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!post) {
            return res.status(404).json("Not found");
        }
    
        if (post.userId !== req.user.id) {
            return res.status(401).json("Not authorized!");
        }

        post.image = req.body.image;
        post.title = req.body.title;
        post.categoryId = req.body.category;
        post.description = req.body.description;
        post.content = req.body.content;
        post.status = "pending";

        await post.save();

        console.log("Post edited");
        return res.status(200).json("OK");

    } catch (err) {
        console.log(err);
        return res.status(400).json("An error has occured");
    }
}