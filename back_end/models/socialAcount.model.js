import { sequelize } from "../lib/connectDB.js"
import { DataTypes } from "sequelize"

const SocialAccount = sequelize.define(
    'SocialAccount',
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
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        providerUserId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    },
    {
    },
)

export default SocialAccount;