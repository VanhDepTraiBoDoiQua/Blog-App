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
    const clerkId = req.auth.userId;
    const postId = req.params.postId;

    if (!clerkId) {
        return res.status(401).json("Not authenticated!");
    }
    
    try {
        const user = await User.findOne({
            where: {
                clerkId: clerkId,
            }
        });

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

// delete a comment
export const deleteComments = async (req, res) => {
    const clerkId = req.auth.userId;
    const id = req.params.id;

    if (!clerkId) {
        return res.status(401).json("Not authenticated!");
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";
    if (role === "admin") {
        try {
            const deletedComment = await Comment.destroy({
                where: {
                    id: id,
                }
            });
    
            if (deletedComment === 0) {
                return res.status(403).json("You can't delete this comment!");
            }
    
            console.log("Comment deleted");
            return res.status(200).json(deletedComment);
        } catch(err) {
            console.log(err);
        }
    }

    try {
        const user = await User.findOne({
            where: {
                clerkId: clerkId,
            },
        });

        const deletedComment = await Comment.destroy({
            where: {
                id: id,
                userId: user.id,
            }
        });

        if (deletedComment === 0) {
            return res.status(403).json("You can't delete this comment!");
        }

        console.log("Comment deleted");
        return res.status(200).json(deletedComment);
    } catch(err) {
        console.log(err);
    }
}