import { userSignup, userLogin } from "../services/authService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";

const register = async (req, res, next) => {
    try {
        await userSignup(req.body);
        return res
            .status(201)
            .json(new ApiResponse(201, null, "User registered successfully"));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        // temporary dev log
        // eslint-disable-next-line no-console
        console.error("auth.register error:", error);
        next(ApiError.internal(error.message));
    }
};

const login = async (req, res, next) => {
    try {
        const token = await userLogin(req.body.email, req.body.password);
        return res.status(200).json(new ApiResponse(200, { token }, "Login successful."));
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        // temporary dev log
        // eslint-disable-next-line no-console
        console.error("auth.login error:", error);
        next(ApiError.internal(error.message));
    }
};

export { register, login };

