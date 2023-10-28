import dotenv from "dotenv";
dotenv.config();

const variables = {
    PORT: process.env.PORT,
    PREFIX_URL: process.env.PREFIX_URL,
    MONGO_URL: process.env.MONGODB_URL,
}

export default variables;
