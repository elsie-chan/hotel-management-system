import mongoose from "mongoose";

import validator from "validator";
import bcrypt from "bcrypt";

import { Role } from "../constants/role.js";

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.isEmail(value)) throw new Error("Email is invalid");
        }
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.isStrongPassword(value)) throw new Error("Password is invalid");
        }
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://res.cloudinary.com/dungnqhe151052/image/upload/v1620057612/Avatar/avatar-default.png'
    },
    role: {
        type: String,
        required: false,
        enum: [...Object.keys(Role)],
        default: Role.MANAGER
    },
    token: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }]
}, { timestamps: true});

const Account = mongoose.model("Account", accountSchema);

const validatePassword = (user, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}
export default Account;
export {
    validatePassword
}