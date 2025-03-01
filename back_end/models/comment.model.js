import { sequelize } from "../lib/connectDB.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define(
    'comment', {
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
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Post",
                key: "id",
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
    },
)

export default Comment;