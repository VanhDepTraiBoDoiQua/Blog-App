import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getComments = async (req, res) => {
    const comments = await Comment.findAll({
        where: {
            postId: req.params.postId,
        },
        include: {
            model: User,
            attributes: [
                "username", 
                "img",
            ],
        },
        order: [
            ['createdAt', 'DESC']
        ],
    });
    res.json(comments);
}

export const postComments = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.params.postId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({
        where: {
            clerkUserId: clerkUserId,
        }
    })

    try {
        const newComment = await Comment.create({
        userId: user.id,
        postId: postId,
        ...req.body,
        });
        res.status(201).json(newComment);
        console.log("Comment created");
    } catch(err) {
        console.log(err);
    }
}

export const deleteComments = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const id = req.params.id;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({
        where: {
            clerkUserId: clerkUserId,
        },
    });

    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: id,
                userId: user.id,
            }
        })

        if (!deletedComment) {
            return res.status(403).json("You can't delete this comment!");
        }

        console.log("Comment deleted");
        return res.status(200).json(deletedComment);
    } catch(err) {
        console.log(err);
    }
}