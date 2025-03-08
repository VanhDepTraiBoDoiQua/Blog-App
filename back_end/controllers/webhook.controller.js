import { Webhook } from "svix";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const clerkWebHook = async(req, res) => {
    const clerkWebHookSecrect = process.env.CLERK_WEBHOOK_SECRECT;

    if (!clerkWebHookSecrect) {
        throw new Error("Webhook secrect needed!");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(clerkWebHookSecrect);
    let event;
    try {
        event = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({
            message: "Webhook verification failed!",
        });
    }

    // create an user
    if (event.type === "user.created") {
        try {
            await User.create({
                clerkId: event.data.id,
                clerkUserId: event.data.id,
                username: event.data.username || event.data.email_addresses[0].email_address,
                email: event.data.email_addresses[0].email_address,
                img: event.data.profile_image_url,
            });
            console.log("User Created!");
        } catch (err) {
            console.log(err);
        }
    }

    // update user infomation
    if (event.type === "user.updated") {
        try {
            await User.update({
                username: event.data.username || event.data.email_addresses[0].email_address,
                email: event.data.email_addresses[0].email_address,
                img: event.data.profile_img_url,
            }, {
                where: {
                    clerkId: event.data.id,
                }
            });
            console.log("User updated!");
        } catch (err) {
            console.log(err);
        }
    }

    // delete an user and all post and comment of that user
    if (event.type === "user.deleted") {
        try {
            const deletedUser = User.findOne({
                where: {
                    clerkId: event.data.id
                },
            });

            await Comment.destroy({
                where: {
                    userId: deletedUser.id,
                },
            });

            await Post.destroy({
                where: {
                    userId: deletedUser.id,
                },
            });

            await User.destroy({
                where: {
                    id: deletedUser.id,
                },
            });
            console.log("User deleted!");
        } catch (err) {
            console.log(err);
        }
    }

    return res.status(200).json({
        message: "Webhook received!",
    })
}