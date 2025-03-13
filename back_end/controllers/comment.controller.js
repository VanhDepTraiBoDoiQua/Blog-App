import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// get all comment of a post
export const getComments = async (req, res) => {
    try {
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
    } catch(err) {
        console.log(err);
    }
}

// post a comment
export const postComments = async (req, res) => {
    const user = req.user;
    const postId = req.params.postId;
    
    try {
        const newComment = await Comment.create({
        userId: user.id,
        postId: postId,
        ...req.body,
        });
        console.log("Comment created");
        return res.status(200).json(newComment);
    } catch(err) {
        console.log(err);
        return res.status(400).json("An error has occured");
    }
}

// delete a comment
export const deleteComments = async (req, res) => {
    const user = req.user;
    const commentId = req.params.id;

    const comment = await Comment.findOne({
        where: {
            id: commentId,
        },
    });

    if (!comment) {
        return res.status(404).json("Comment not found");
    }

    if (user.role === "admin" || user.id === comment.userId) {
        try {
            await Comment.destroy({
                where: {
                    id: commentId,
                }
            });

            console.log("Comment deleted");
            return res.status(200).json("Comment deleted");
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    }
    return res.status(403).json("You don't have permission to delete this post!");
}