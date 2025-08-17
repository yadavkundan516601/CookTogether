import { DataTypes } from "sequelize";
import sequelize from "../sequelizeInstance.js";

const SavedRecipe = sequelize.define(
    "SavedRecipe",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        recipe_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "saved_recipes",
        timestamps: false,
        indexes: [
            { unique: true, fields: ["user_id", "recipe_id"] },
        ],
    }
);

export default SavedRecipe;

