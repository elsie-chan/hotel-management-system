import express from "express";
import ApiRoomController from "../controllers/api/api.room.controller.js";
import Category from "../models/category.model.js";
import ApiReservationController from "../controllers/api/api.reservation.controller.js";
import ApiTransportController from "../controllers/api/api.transport.controller.js";
import ApiGuestController from "../controllers/api/api.guest.controller.js";
import ApiMealController from "../controllers/api/api.meal.controller.js";
import ApiFeedbackController from "../controllers/api/api.feedback.controller.js";
import ApiInvoiceController from "../controllers/api/api.invoice.controller.js";

const Router = express.Router()

Router.get("/dashboard", (req, res) => {
    res.render("layouts/manager/dashboard")
})
Router.get("/room", async ( req, res) => {
    const rooms = await ApiRoomController.getAll(req,res);
    const categories = await Category.find();
    res.render("layouts/manager/room", {rooms: rooms.data, pagination: rooms.pagination, categories: categories})
})
Router.get("/reservation", async (req, res) => {
    // res.render("layouts/manager/reservation")
    const reservations = await ApiReservationController.getAll(req, res);
    // console.log(reservations)
    res.render("layouts/manager/reservation", {reservations: reservations.data, pagination: reservations.pagination})
})
Router.get("/invoice", async (req, res) => {
    const invoices = await ApiInvoiceController.getAll(req, res);
    // console.log(invoices)
    res.render("layouts/manager/invoice", {invoices: invoices.data, pagination: invoices.pagination})
})
Router.get("/feedback", async (req, res) => {
    const feedback = await ApiFeedbackController.getAll(req, res);
    console.log(feedback)
    res.render("layouts/manager/feedback", {feedbacks: feedback.data, pagination: feedback.pagination})
})
Router.get("/service", async (req, res) => {
    const services = await ApiTransportController.getAll(req, res);
    console.log(services)
    res.render("layouts/manager/service", {services: services.data, pagination: services.pagination})
})
Router.get("/transport/:id", async (req, res) => {
    const services = await ApiTransportController.getTransportById(req, res);

    console.log(services)
    res.render("layouts/manager/service", {services: services.data, pagination: services.pagination})
})
Router.get("/meal", async (req, res) => {
    const meals = await ApiMealController.getAll(req, res);
    res.render("layouts/manager/meal", {meals: meals.data, pagination: meals.pagination})
})
export default Router;