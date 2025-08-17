import { DataTypes } from "sequelize";
import sequelize from "../sequelizeInstance.js";

const Recipe = sequelize.define(
    "Recipe",
    {
        recipe_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        author_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prep_time: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cook_time: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ingredients: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        instructions: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        average_rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        total_ratings: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "recipes",
        timestamps: false,
    }
);

export default Recipe;

