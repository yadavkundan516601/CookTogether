import dotenv from "dotenv";
import Joi from "joi";

dotenv.config({ path: ".env" });

const envVarsSchema = Joi.object({
    PORT: Joi.number().port().default(4000),
    DB_FILE: Joi.string().default("cooktogether.sqlite"),
    JWT_SECRET: Joi.string().min(16).required(),
    API_PREFIX: Joi.string().default("/api/v1"),
    CORS_ORIGIN: Joi.string().default("*")
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env, { allowUnknown: true });

if (error) {
    console.error(`Configuration error: ${error.message}`);
    process.exit(1);
}

const config = {
    port: value.PORT,
    dbFile: value.DB_FILE,
    jwtSecret: value.JWT_SECRET,
    apiPrefix: value.API_PREFIX,
    corsOrigin: value.CORS_ORIGIN
};

export default config;

