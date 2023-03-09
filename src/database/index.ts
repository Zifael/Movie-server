import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME!, // name db
    process.env.DB_USER!, // user
    process.env.DB_PASSWORD as string, // password
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        logging: false
    }
)