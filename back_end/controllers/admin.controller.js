import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// get all users
export const getAllUsers = async(req, res) => {
    const user = req.user;
    if (user.role === "admin") {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        try {
            const users = await User.findAll({
                limit: limit,
                offset: (page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            const totalUser = await User.count();
            const hasMore = (page*limit) < totalUser;
            return res.status(200).json(
                {
                    users: users,
                    hasMore: hasMore,
                }
            );
        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured");
        }
    }
    return res.status(403).json("Forbidden");
}

// admin create an user
export const createUser = async(req, res) => {
    const user = req.user;
    if (user.role === "admin") {
        const userData = req.body.data;
        const findByEmail = await User.count({
            where: {
                email: userData.email,
            }
        });
        if (findByEmail > 0) {
            return res.status(400).json("Email already exists");
        }

        const findByUsername = await User.count({
            where: {
                username: userData.username,
            },
        });
        if (findByUsername > 0) {
            return res.status(400).json("Username already exists");
        }

        try {
            const newUser = await User.create({
                ...userData,
                password: bcrypt.hashSync(userData.password, 10),
                role: "user",
            })

            console.log("User created!");
            return res.status(200).json("User created!");

        } catch(err) {
            console.log(err);
            return res.status(400).json("An error has occured!");
        }
    }
    return res.status(403).json("Forbidden!");
}