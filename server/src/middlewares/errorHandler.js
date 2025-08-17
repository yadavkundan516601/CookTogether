import { ApiError } from "../utilities/ApiError.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            data: null,
            message: err.message,
            error: err.errors || null,
        });
    }

    console.error("Unexpected Error:", err);
    return res.status(500).json({
        status: 500,
        data: null,
        message: "Internal Server Error",
        error: null,
    });
};

export default errorHandler;

