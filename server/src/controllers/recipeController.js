import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import {
    createRecipe,
    getRecipeById,
    searchRecipes,
    rateRecipe,
    toggleSaveRecipe,
    getTrendingRecipes,
} from "../services/recipeService.js";

const listRecipes = async (req, res, next) => {
    try {
        const { query, page, limit } = req.query;
        const result = await searchRecipes({
            query,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });
        return res.status(200).json(new ApiResponse(200, result, "Recipes fetched."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

const getRecipe = async (req, res, next) => {
    try {
        const recipe = await getRecipeById(req.params.id);
        return res.status(200).json(new ApiResponse(200, recipe, "Recipe fetched."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

const create = async (req, res, next) => {
    try {
        const recipe = await createRecipe(req.user.user_id, req.body);
        return res.status(201).json(new ApiResponse(201, recipe, "Recipe created."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

const rate = async (req, res, next) => {
    try {
        const updated = await rateRecipe(req.user.user_id, req.params.id, req.body.rating);
        return res.status(200).json(new ApiResponse(200, updated, "Recipe rated."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

const save = async (req, res, next) => {
    try {
        const result = await toggleSaveRecipe(req.user.user_id, req.params.id);
        const msg = result.saved ? "Recipe saved." : "Recipe unsaved.";
        return res.status(200).json(new ApiResponse(200, result, msg));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

const trending = async (req, res, next) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 8;
        const items = await getTrendingRecipes(limit);
        return res.status(200).json(new ApiResponse(200, items, "Trending recipes."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

export { listRecipes, getRecipe, create, rate, save, trending };

