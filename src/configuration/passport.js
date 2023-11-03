import passport from "passport"
import {ExtractJwt, Strategy} from "passport-jwt";

import flash from "express-flash"
import {variables} from "./index.js";
import session from "express-session";
import Account from "../models/account.model.js";
import {Strategy as LocalStrategy} from "passport-local"
import {AuthService} from "../services/index.js";

const jwtOptions = {
    jwtFromRequest: function ( req ) {
        let token = null, refreshToken = null;
        if (req && req.cookies) {
            token = req.cookies['token'];
        }

        if (!token) {
            return null;
        }

        console.log("token", token)
        return token;
    },
    secretOrKey: variables.JWT_ACCESS_TOKEN
}

const localOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}

const localStrategy = new LocalStrategy(localOptions, async (req, username, password, done) => {
    try {
        const data = {
            username,
            password
        }
        const account = await AuthService.authenticate(data)
        console.log(account)
        if (!account) {
            return done(null, false, {message: account})
        } else {
            return done(null, account)
        }
    } catch (e) {
        return done(e)
    }
})

const jwtStrategy = new Strategy(jwtOptions, async ( payload, done ) => {
    try {
        const account = await Account.findOne({
            email: payload.email
        })

        if (!account) {
            return done(null, false);
        }

        return done(null, account);
    } catch (e) {
        return done(e);
    }
});


export default function passportConfig(app) {
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    }))

    app.use(flash())

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Account.findById(id)
            return done(null, user)
        } catch (e) {
            console.log(e)
            return done(e)
        }
    })

    passport.use("jwt", jwtStrategy)
    passport.use("local", localStrategy)
    app.use(passport.initialize())
    app.use(passport.session())
}
