import jwt from "jsonwebtoken"
import {variables} from "../configuration/index.js";
const generateToken = async (data) => {
    const payload = {
        id: data.id,
        username: data.username,
        role: data.role
    }
    return jwt.sign(payload, variables.JWT_ACCESS_TOKEN, {expiresIn: variables.JWT_ACCESS_TOKEN_LIFE, algorithm: "HS256"})
}

const generateRefreshToken = async (data) => {
    const payload = {
        id: data.id,
        username: data.username,
        role: data.role
    }
    return jwt.sign(payload, variables.JWT_ACCESS_TOKEN, {expiresIn: variables.JWT_REFRESH_TOKEN_LIFE, algorithm: "HS256"})
}

export {generateToken, generateRefreshToken}