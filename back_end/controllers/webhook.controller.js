import { Webhook } from "svix";
import User from "../models/user.model.js";

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

    // create an user and save to MongoDB
    if (event.type === "user.created") {
        const newUser = new User({
            clerkUserId: event.data.id,
            username: event.data.username || event.data.email_addresses[0].email_address,
            email: event.data.email_addresses[0].email_address,
            img: event.data.profile_img_url,
        })
        await newUser.save();
    }

    // update user infomation and save to MongoDB
    if (event.type === "user.updated") {
        const updatedUser = await User.findOneAndUpdate({
            clerkUserId: event.data.id
        }, {
            username: event.data.username || event.data.email_addresses[0].email_address,
            email: event.data.email_addresses[0].email_address,
            img: event.data.profile_img_url,
        }, {
            new: true,
        })
    }

    // delete an user and all post and comment of that user
    if (event.type === "user.deleted") {
        const deletedUser = await User.findOneAndDelete({
            clerkUserId: event.data.id,
        })

        //TODO: delete all user's post here
        
        //TODO: delete all user's comment here
    }

    return res.status(200).json({
        message: "Webhook received!",
    })
}