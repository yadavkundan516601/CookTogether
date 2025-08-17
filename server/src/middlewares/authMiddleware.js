import { verifyToken } from "../utilities/jwtUtils.js";
import { ApiError } from "../utilities/ApiError.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(ApiError.badRequest("Token missing"));
    }

    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(ApiError.unauthorized("Invalid Token"));
    }
};

export default authMiddleware;

