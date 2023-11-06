import express from "express";
import ApiRoomController from "../controllers/api/api.room.controller.js";
import Category from "../models/category.model.js";
import ApiReservationController from "../controllers/api/api.reservation.controller.js";

const Router = express.Router()

Router.get("/dashboard", (req, res) => {
    res.render("layouts/manager/dashboard")
})
Router.get("/room", async ( req, res) => {
    const rooms = await ApiRoomController.getAll(req,res);
    console.log(rooms)
    const categories = await Category.find();
    res.render("layouts/manager/room", {rooms: rooms.data, pagination: rooms.pagination, categories: categories})
})
Router.get("/reservation", async (req, res) => {
    // res.render("layouts/manager/reservation")
    const reservations = await ApiReservationController.getAll(req,res);
    console.log(reservations)
})
Router.get("/invoice", (req, res) => {
    res.render("layouts/manager/invoice")
})
Router.get("/feedback", (req, res) => {
    res.render("layouts/manager/feedback")
})
Router.get("/service", (req, res) => {
    res.render("layouts/manager/service")
})
export default Router;