import express from "express";
import validation from "../../validator/validation.route.js";
import passport from "passport";
import ApiAuthController from "../../controllers/api/api.auth.controller.js";


const router = express.Router()

router.post("/create", validation, ApiAuthController.create.bind(ApiAuthController))
router.post("/authenticate", validation, (req, res, next) => {
    console.log("req.body", req.body)
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
                console.log(err)
                return res.status(200).json('/auth/login');
            }
            if (req.user.role === 'MANAGER') {

                return res.status(200).json('/manager/dashboard');
            }
            if (req.user.role === 'RECEPTIONIST') {
                return res.status(200).json('/receptionist/frontdesk');
            }
            return res.redirect('/');

        })
    })(req, res, next);
})

router.get("/current_user", (req, res, next) => {
    res.status(200).json({
        user: req.user
    })

})
router.get("/logout", ApiAuthController.logout.bind(ApiAuthController))
export default router;