import dotenv from "dotenv";
dotenv.config();

const variables = {
    PORT: process.env.PORT,
    PREFIX_URL: process.env.PREFIX_URL,
    MONGO_URL: process.env.MONGODB_URL,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_ACCESS_TOKEN_LIFE: process.env.JWT_ACCESS_TOKEN_LIFE,
    JWT_REFRESH_TOKEN_LIFE: process.env.JWT_ACCESS_REFRESH_TOKEN_LIFE,
}

export default variables;
