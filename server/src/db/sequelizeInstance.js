import { Sequelize } from "sequelize";
import config from "../config/index.js";
import { resolve } from "path";

const databaseFilePath = resolve(process.cwd(), config.dbFile);

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: databaseFilePath,
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
});

export default sequelize;

