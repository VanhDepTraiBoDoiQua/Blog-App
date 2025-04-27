import { sequelize } from "../lib/connectDB.js";
import Category from "../models/category.model.js";
import Post from "../models/post.model.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch(err) {
        console.log(err);
    }
}

export const createCategory = async (req, res) => {
    const user = req.user;

    if (user.role !== "admin") {
        return res.status(403).json("Not authorized!");
    }

    const categoryData = req.body.data;
    const findByName = await Category.count({
        where: {
            name: categoryData.categoryName,
        }
    });
    if (findByName > 0) {
        return res.status(400).json("Category already exists");
    }

    try {
        const newCategory = await Category.create({
            name: categoryData.categoryName,
        });

        console.log("Category created!");
        return res.status(200).json("Category created!");

    } catch(err) {
        console.log(err);
        return res.status(400).json("An error has occured!");
    }
}