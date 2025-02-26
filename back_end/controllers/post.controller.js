import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

// get all post
export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

// get a single post
export const getPost = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug});
    res.status(200).json(post);
}

// create a single post
export const createPost = async (req, res) => {
    const clerkId = req.auth.userId;

    if (!clerkId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({clerkId})

    // generate slug for a new post
    let slug = req.body.title
        .normalize("NFD") // Tách dấu khỏi ký tự gốc
        .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
        .replace(/đ/g, "d").replace(/Đ/g, "D") // Chuyển "đ" thành "d"
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Xóa ký tự đặc biệt (ngoại trừ chữ, số, dấu cách, "-")
        .trim() // Xóa khoảng trắng đầu cuối
        .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu "-"
        .toLowerCase(); // Chuyển về chữ thường
    let existingPost = await Post.findOne({slug});
    let counter = 2;
    while(existingPost) {
        slug = `${slug}-${counter}`;
        existingPost = await Post.findOne({slug});
        counter++;
    }

    const newPost = new Post(
        {
            user: user._id,
            slug,
            ...req.body,
        }
    );
    const post = await newPost.save();
    res.status(200).json(post);
}

// delete a single post
export const deletePost = async (req, res) => {
    const clerkId = req.auth.userId;

    if (!clerkId) {
        return res.status(401).json("Not autheticated!");
    }

    const user = await User.findOne({clerkId});

    const deletedPost = await Post.findByIdAndDelete(
        {
            _id: req.params.id, 
            user: user._id,
        }
    );

    if (!deletePost) {
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