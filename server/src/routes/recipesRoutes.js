import { Router } from "express";
import { listRecipes, getRecipe, create, rate, save, trending } from "../controllers/recipeController.js";
import validate from "../middlewares/validate.js";
import { recipeCreateSchema, recipeSearchSchema, ratingSchema } from "../validators/recipeValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", validate(recipeSearchSchema, "query"), listRecipes);
router.post("/", authMiddleware, validate(recipeCreateSchema), create);
router.get("/:id", getRecipe);
router.post("/:id/rate", authMiddleware, validate(ratingSchema), rate);
router.post("/:id/save", authMiddleware, save);
router.get("/trending/list", trending);

export default router;

