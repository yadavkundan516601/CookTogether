import { ApiError } from "../utilities/ApiError.js";

const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data = source === "query" ? req.query : req.body;
        const { error } = schema.validate(data);
        if (error) {
            return next(ApiError.badRequest(error.message));
        }
        next();
    };
};

export default validate;

