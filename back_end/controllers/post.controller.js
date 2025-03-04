import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

// get all post
export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
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
    const totalPosts = await Post.count()
    const hasMore = (page * limit) < totalPosts;
    res.status(200).json({posts, hasMore});
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

    const user = await User.findOne({
        where: {
            clerkId: clerkId,
        },
    });

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

    const user = await User.findOne({
        where: {
            clerkId: clerkId,
        },
    });

    const deletedPost = await Post.destroy({
        where: {
            id: req.params.id,
            user: user.id,
        },
    });

    if (!deletedPost) {
        return res.status(403).json("You don't have permission to delete this post!");
    }

    res.status(200).json("Deleted!");
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