import Joi from "joi";

const recipeCreateSchema = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().allow("").optional(),
    image_url: Joi.string().uri().allow("").optional(),
    prep_time: Joi.number().integer().min(0).optional(),
    cook_time: Joi.number().integer().min(0).optional(),
    ingredients: Joi.array().items(Joi.string().min(1)).min(1).required(),
    instructions: Joi.array().items(Joi.string().min(1)).min(1).required(),
});

const recipeSearchSchema = Joi.object({
    query: Joi.string().allow("").optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
});

const ratingSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
});

export { recipeCreateSchema, recipeSearchSchema, ratingSchema };

