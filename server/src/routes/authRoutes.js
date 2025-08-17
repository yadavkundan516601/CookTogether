import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { userRegisterSchema, userLoginSchema } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post("/register", validate(userRegisterSchema), register);
router.post("/login", validate(userLoginSchema), login);

export default router;

