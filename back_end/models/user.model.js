import { sequelize } from "../lib/connectDB.js"
import { DataTypes } from "sequelize"

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clerkId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        clerkUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        savedPosts: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
    },
    {
    },
)

export default User;