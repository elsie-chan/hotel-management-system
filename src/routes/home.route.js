import express from "express";

const Router = express.Router()

Router.get("/", (req, res) => {
    res.render("layouts/home")
})
Router.get("/contact", (req, res) => {
    res.render("layouts/contact")
})

export default Router;