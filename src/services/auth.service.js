import Account, {validatePassword} from "../models/account.model.js";
import {generateToken, generateRefreshToken, verifyToken, verifyRefreshToken} from "../utils/index.js";
import bcrypt from "bcrypt";
import {ErrorMessage} from "../error/message.error.js";

async function create(data) {
    try {
        const existAccount = await Account.findOne({username: data.username});
        if (existAccount) {
            return ErrorMessage(400, "Account already exist");
        }
        console.log(data)
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(data.password, salt);
        const newAccount = new Account({
            ...data,
            username: data.username,
            fullName: data.fullName,
            password: hashPassword,
            email: data.email,
            avatar: "https://res.cloudinary.com/dungnqhe151052/image/upload/v1620057612/Avatar/avatar-default.png",
            role: data.role,
            token: await generateToken(data),
            refreshToken: await generateRefreshToken(data),
            sales: []
        })
        await newAccount.save();
        // return ignore password
        return {
            ...newAccount._doc,
            password: undefined
        }
    } catch (e) {
        console.log(e)
        return ErrorMessage(500, "Internal server error");
    }
}

async function authenticate(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const existAccount = await Account.findOne({username: data.username});
            if (!existAccount) {
                return reject("Account not found");
            }
            const isMatch = validatePassword(existAccount, data?.password);
            if (!isMatch) {
                return reject("Wrong password");
            }
            const token = existAccount.token;

            const decodedToken = await verifyToken(token).then((data) => data).catch((e) => null)
            //     check if token is not expired then return it token or else check if refresh token is not expired then return new token
            if (decodedToken && decodedToken.exp > Date.now() / 1000) {
                console.log("token is not expired");
                return resolve(existAccount);
            } else {
                console.log("token is expired");
                const newRefreshToken = await generateRefreshToken(data);
                const decodedRefreshToken = await verifyRefreshToken(newRefreshToken);
                if (!decodedRefreshToken) {
                    return reject("Invalid token!")
                }

                if (decodedRefreshToken.exp > Date.now() / 1000) {
                    console.log("refresh token is not expired and generate new token");
                    const newToken = await generateToken(data);
                    const newRefreshToken = await generateRefreshToken(data);
                    existAccount.refreshToken = newRefreshToken;
                    existAccount.token = newToken;
                    await existAccount.save();
                    return resolve(existAccount);
                } else {
                    return reject("Refresh token expired");
                }
            }
            } catch (error) {
            return reject(error);
        }
    })
}

export default {create, authenticate}
