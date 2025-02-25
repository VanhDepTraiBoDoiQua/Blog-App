import Post from "../models/post.model.js"
import User from "../models/user.model.js";

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
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({clerkUserId})

    const newPost = new Post(
        {
            user: user._id,
            ...req.body,
        }
    );
    const post = await newPost.save();
    res.status(200).json(post);
}

// delete a single post
export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json("Not autheticated!");
    }

    const user = await User.findOne({clerkUserId});

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