import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { getSavedRecipes, getMyRecipes } from "../services/recipeService.js";

const getSaved = async (req, res, next) => {
    try {
        const recipes = await getSavedRecipes(req.user.user_id);
        return res.status(200).json(new ApiResponse(200, recipes, "Saved recipes."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

const myRecipes = async (req, res, next) => {
    try {
        const recipes = await getMyRecipes(req.user.user_id);
        return res.status(200).json(new ApiResponse(200, recipes, "My recipes."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(ApiError.internal(error.message));
    }
};

export { getSaved, myRecipes };

