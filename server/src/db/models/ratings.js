import { DataTypes } from "sequelize";
import sequelize from "../sequelizeInstance.js";

const Rating = sequelize.define(
    "Rating",
    {
        rating_id: {
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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "ratings",
        timestamps: false,
        indexes: [
            { unique: true, fields: ["user_id", "recipe_id"] },
        ],
    }
);

export default Rating;

