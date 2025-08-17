import { User } from "../db/index.js";
import { ApiError } from "../utilities/ApiError.js";
import { hashPassword, comparePassword } from "../utilities/bcryptUtils.js";
import { generateToken } from "../utilities/jwtUtils.js";

const userSignup = async (userData) => {
    const { name, email, password } = userData;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw ApiError.badRequest("Email already exists");

        const hashedPassword = await hashPassword(password);
        await User.create({ name, email, password: hashedPassword });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.internal(error.message);
    }
};

const userLogin = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) throw ApiError.notFound("User not found");

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw ApiError.badRequest("Invalid credentials");

        return generateToken(user);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.internal(error.message);
    }
};

export { userSignup, userLogin };

