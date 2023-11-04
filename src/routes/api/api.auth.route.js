import express from "express";
import validation from "../../validator/validation.route.js";
import passport from "passport";
import ApiAuthController from "../../controllers/api/api.auth.controller.js";


const Router = express.Router()

Router.post("/create", validation, ApiAuthController.create.bind(ApiAuthController))
Router.post("/authenticate", validation, (req, res, next) => {
    passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
            session: true
        },
        (err, user, info) => {
            console.log("err", err)
            console.log("user", user)
            console.log("info", info)
        if (err) {
            console.log(err)
            return next(err)
        }

        if (info) {
            console.log(info.message)
            return next(info.message)
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.redirect('/auth/login')
            }

            return res.redirect('/');

        })
    })(req, res, next);
})

export default Router;