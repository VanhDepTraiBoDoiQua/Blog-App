import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SocialAccount from "../models/socialAcount.model.js";

const tokenLife = process.env.TOKEN_LIFE;
const tokenSecret = process.env.TOKEN_SECRET;

// user register
export const createUser = async (req, res) => {
    const userData = req.body.data;
    
    const findByUsername = await User.count({
        where: {
            username: userData.username,
        },
    });
    if (findByUsername > 0) {
        return res.status(400).json("Username already exists");
    }
    
    const findByEmail = await User.count({
        where: {
            email: userData.email,
        },
    });
    if (findByEmail > 0) {
        return res.status(400).json("Email already exists");
    }

    try {
        await User.create({
            ...userData,
            password: bcrypt.hashSync(userData.password, 10),
            role: "user",
        });

        console.log("User created!");
        return res.status(200).redirect(`${process.env.CLIENT_URL}/login`);

    } catch(err) {
        console.log(err);
        return res.status(400).json("An error has occured!");
    }
}

// email login
export const emailLogin = async(req, res) => {
    const userData = req.body;
    const user = await User.count({
        where: {
            email: userData.email,
        },
    });

    if (user > 0) {
        return res.status(200).json("Please provide password for this account");
    }
    return res.status(400).json("Email not found");
}

// password login
export const passwordLogin = async(req, res) => {
    const userData = req.body;
    const user = await User.findOne({
        where: {
            email: userData.email,
        },
    });
    if (!user) {
        return res.status(401).json("Username not found!");
    }

    const isValid = bcrypt.compareSync(userData.password, user.password);
    if (!isValid) {
        return res.status(401).json("Incorrect password!");
    }

    const token = jwt.sign(
        {
            id: user.id,
        }, 
        tokenSecret, 
        {
            expiresIn: tokenLife
        }
    );
    if (!token) {
        return res.status(401).json("An error has occured!");
    }

    res.cookie("auth_token", token, {
        httpOnly: true, // cookie không thể truy cập được từ JavaScript
        maxAge: 172800000, // 2 ngày
    });

    return res.status(200).json({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        img: user.img,
        savedPost: user.savedPost,
        firstName: user.firstName,
        lastName: user.lastName
    });
}

// logout
export const logoutUser = (req, res) => {
    res.clearCookie("auth_token", { 
        httpOnly: true,
    });
    return res.status(200).json("Logout success");
}

export const getUser = async (req, res) => {
    const user = req.user;

    const facebookAccount = await SocialAccount.count({
        where: {
            userId: user.id,
            provider: "facebook",
        },
    });
    

    const googleAccount = await SocialAccount.count({
        where: {
            userId: user.id,
            provider: "google",
        },
    });

    return res.status(200).json({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        img: user.img,
        savedPost: user.savedPost,
        firstName: user.firstName,
        lastName: user.lastName,
        hasFacebook: facebookAccount > 0,
        hasGoogle: googleAccount > 0,
    });
}

// facebook callback
export const facebookCallback = (req, res) => {
    const user = req.user;

    const token = jwt.sign(
        {
            id: user.id,
        }, 
        tokenSecret,
        {
            expiresIn: tokenLife
        }
    );
    if (!token) {
        return res.status(401).json("An error has occured!");
    }

    res.cookie('user_info', JSON.stringify(user), {
        httpOnly: false,
        maxAge: 172800000,
    });

    res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 172800000,
    });

    return res.status(200).redirect(`${process.env.CLIENT_URL}/home`);
};

// google callback
export const googleCallback = (req, res) => {
    const user = req.user;

    const token = jwt.sign(
        {
            id: user.id,
        }, 
        tokenSecret, 
        {
            expiresIn: tokenLife
        }
    );
    if (!token) {
        return res.status(401).json("An error has occured!");
    }

    res.cookie('user_info', JSON.stringify(user), {
        httpOnly: false,
        maxAge: 172800000,
    });

    res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 172800000,
    });

    return res.status(200).redirect(`${process.env.CLIENT_URL}/home`);
} 