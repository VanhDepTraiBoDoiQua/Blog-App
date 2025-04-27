import { sequelize } from "../lib/connectDB.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
    'category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
    },
);

export default Category;