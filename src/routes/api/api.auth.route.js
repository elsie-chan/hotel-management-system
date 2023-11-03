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
                console.log(err)
                return next(err)
            }
            req.session.accounts = req?.session.accounts || []
            const account = req.session.accounts.find(account => account._id === user._id)
            if (!account) {
                req.session.accounts.push({
                    _id: user._id,
                    username: user.username,
                    token: user.token
                })
            }
            req.session.accounts.save()
        })
        return res.redirect("/")
    })
})

export default Router;