import {variables} from "../configuration/index.js";
import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, variables.JWT_ACCESS_TOKEN, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded);
        });
    });
}

const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, variables.JWT_ACCESS_TOKEN, (error, decoded) => {
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        })
    })
}

export {verifyToken, verifyRefreshToken}