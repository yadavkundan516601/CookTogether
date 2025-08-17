import jwt from "jsonwebtoken";
import config from "../config/index.js";

const generateToken = (user) => {
    return jwt.sign(
        { user_id: user.user_id, name: user.name, email: user.email },
        config.jwtSecret,
        { expiresIn: "2d" }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

export { generateToken, verifyToken };

