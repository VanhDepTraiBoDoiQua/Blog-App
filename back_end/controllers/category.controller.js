import { sequelize } from "../lib/connectDB.js";
import Category from "../models/category.model.js";
import Post from "../models/post.model.js";
import { Op } from "sequelize";

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
        return res.status(200).json(newCategory);

    } catch(err) {
        console.log(err);
        return res.status(400).json("An error has occured!");
    }
}

export const updateCategory = async (req, res) => {
    const user = req.user;

    if (user.role !== "admin") {
        return res.status(403).json("Not authorized!");
    } 

    const categoryData = req.body.data;

    const findByName = await Category.count({
        where: {
            name: categoryData.categoryName,
            id: {
                [Op.not]: categoryData.id,
            },
        }
    });
    if (findByName > 0) {
        return res.status(400).json("Category already exists");
    }

    try {
        const category = await Category.findOne({
            where: {
                id: categoryData.id,
            },
        });

        category.name = categoryData.categoryName;
    
        await category.save();
    
        return res.status(200).json("OK");
    
    } catch (err) {
        console.log(err);
        return res.status(400).json("An error has occured!");
    }
}

export const deleteCategory = async(req, res) => {
    const user = req.user;

    if (user.role !== "admin") {
        return res.status(403).json("Not authorized!");
    } 

    const categoryId = req.params.id;

    const findById = await Category.count({
        where: {
            id: categoryId,
        }
    });
    if (!findById) {
        return res.status(404).json("Category not found");
    }

    const count = await Post.count({
        where: {
            categoryId: categoryId,
        },
    });

    if (count > 0) {
        return res.status(400).json("Number of Post belong to this Category are greater than 0");
    }

    try {
        await Category.destroy({
            where: {
                id: categoryId,
            },
        });
        return res.status(200).json("OK");
    
    } catch (err) {
        console.log(err);
        return res.status(400).json("An error has occured!");
    }
}