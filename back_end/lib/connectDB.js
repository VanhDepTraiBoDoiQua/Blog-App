import { Sequelize } from "sequelize"

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    dialectOptions: {
        charset: 'utf8mb4',
    },
    logging: false,
});

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("DB connected!");
    } catch (err) {
        console.log(err);
    }
}

export {sequelize, connectDB};