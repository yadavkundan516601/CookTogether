import { Router } from "express";
import { getSaved, myRecipes } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me/saved", authMiddleware, getSaved);
router.get("/me/recipes", authMiddleware, myRecipes);

export default router;

