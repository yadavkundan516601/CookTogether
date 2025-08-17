import sequelize from "./sequelizeInstance.js";

// Models
import User from "./models/users.js";
import Recipe from "./models/recipes.js";
import Rating from "./models/ratings.js";
import SavedRecipe from "./models/saved_recipes.js";

// Associations
User.hasMany(Recipe, { foreignKey: "author_id" });
Recipe.belongsTo(User, { foreignKey: "author_id" });

User.hasMany(Rating, { foreignKey: "user_id" });
Recipe.hasMany(Rating, { foreignKey: "recipe_id" });
Rating.belongsTo(User, { foreignKey: "user_id" });
Rating.belongsTo(Recipe, { foreignKey: "recipe_id" });

User.belongsToMany(Recipe, {
    through: SavedRecipe,
    as: "savedRecipes",
    foreignKey: "user_id",
    otherKey: "recipe_id",
});
Recipe.belongsToMany(User, {
    through: SavedRecipe,
    as: "savedByUsers",
    foreignKey: "recipe_id",
    otherKey: "user_id",
});

export { sequelize, User, Recipe, Rating, SavedRecipe };

