import { sequelize } from "../lib/connectDB.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Comment from "./comment.model.js";
import Category from "./category.model.js";

const Post = sequelize.define(
    'Post', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "id",
            },
        },
        image: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Category",
                key: "id",
            },
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        visit: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
    },
);

Post.belongsTo(User, {
    foreignKey: "userId",
});
Post.hasMany(Comment, {
    foreignKey: "postId",
    onDelete: "CASCADE",
});
Category.hasMany(Post, {
    foreignKey: "categoryId",
});
Post.belongsTo(Category, {
    foreignKey: "categoryId",
});
Comment.belongsTo(User, {
    foreignKey: "userId",
});
Comment.belongsTo(Post, {
    foreignKey: "postId",
});
User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});
User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

export default Post;