import { Op } from "sequelize";
import { Recipe, Rating, SavedRecipe } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";

const createRecipe = async (authorId, payload) => {
    const {
        title,
        description,
        image_url,
        prep_time,
        cook_time,
        ingredients,
        instructions,
    } = payload;

    try {
        const recipe = await Recipe.create({
            author_id: authorId,
            title,
            description,
            image_url,
            prep_time,
            cook_time,
            ingredients,
            instructions,
        });
        return recipe;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
};

const getRecipeById = async (id) => {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) throw ApiError.notFound("Recipe not found");
    return recipe;
};

const searchRecipes = async ({ query, page = 1, limit = 10 }) => {
    const where = {};
    if (query) {
        const terms = String(query)
            .split(/\s+/)
            .map((t) => t.trim())
            .filter(Boolean);
        if (terms.length > 0) {
            // All terms must match either in title or ingredients (JSON serialized)
            where[Op.and] = terms.map((term) => ({
                [Op.or]: [
                    { title: { [Op.like]: `%${term}%` } },
                    // SQLite LIKE on JSON will search serialized string; acceptable for small dataset
                    { ingredients: { [Op.like]: `%${term}%` } },
                ],
            }));
        }
    }

    const offset = (page - 1) * limit;
    const { rows, count } = await Recipe.findAndCountAll({
        where,
        order: [["average_rating", "DESC"], ["created_at", "DESC"]],
        offset,
        limit,
    });
    return { recipes: rows, total: count };
};

const getTrendingRecipes = async (limit = 8) => {
    const recipes = await Recipe.findAll({
        order: [["average_rating", "DESC"], ["total_ratings", "DESC"], ["created_at", "DESC"]],
        limit,
    });
    return recipes;
};

const rateRecipe = async (userId, recipeId, ratingValue) => {
    if (ratingValue < 1 || ratingValue > 5) {
        throw ApiError.badRequest("Rating must be between 1 and 5");
    }

    const recipe = await getRecipeById(recipeId);

    const [rating] = await Rating.findOrCreate({
        where: { user_id: userId, recipe_id: recipeId },
        defaults: { rating: ratingValue },
    });

    if (rating.rating !== ratingValue) {
        rating.rating = ratingValue;
        await rating.save();
    }

    const { count, rows } = await Rating.findAndCountAll({
        where: { recipe_id: recipeId },
    });
    const totalRatings = count;
    const avg = rows.reduce((sum, r) => sum + r.rating, 0) / (totalRatings || 1);
    recipe.total_ratings = totalRatings;
    recipe.average_rating = Number(avg.toFixed(2));
    await recipe.save();

    return recipe;
};

const toggleSaveRecipe = async (userId, recipeId) => {
    await getRecipeById(recipeId);
    const existing = await SavedRecipe.findOne({ where: { user_id: userId, recipe_id: recipeId } });
    if (existing) {
        await existing.destroy();
        return { saved: false };
    }
    await SavedRecipe.create({ user_id: userId, recipe_id: recipeId });
    return { saved: true };
};

const getSavedRecipes = async (userId) => {
    const saved = await SavedRecipe.findAll({ where: { user_id: userId } });
    const recipeIds = saved.map((s) => s.recipe_id);
    if (recipeIds.length === 0) return [];
    const recipes = await Recipe.findAll({ where: { recipe_id: { [Op.in]: recipeIds } } });
    return recipes;
};

const getMyRecipes = async (userId) => {
    return Recipe.findAll({ where: { author_id: userId }, order: [["created_at", "DESC"]] });
};

export { createRecipe, getRecipeById, searchRecipes, rateRecipe, toggleSaveRecipe, getSavedRecipes, getMyRecipes, getTrendingRecipes };

