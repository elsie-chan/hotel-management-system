import express from "express";
import ApiReservationController from "../controllers/api/api.reservation.controller.js";
import ApiMealController from "../controllers/api/api.meal.controller.js";
import apiTransportController from "../controllers/api/api.transport.controller.js";

const Router = express.Router()

Router.get("/frontdesk", async (req, res) => {
    const meals = await ApiMealController.getAll(req, res);
    const car = await apiTransportController.getAll(req, res);
    res.render("layouts/receptionist/frontdesk", {title: "Front Desk", role: "receptionist", meals: meals.data, car: car.data  });
})

Router.get("/reservation", async (req, res) => {
    const reservations = await ApiReservationController.getAll(req, res);
    const meals = await ApiMealController.getAll(req, res);
    res.render("layouts/manager/reservation", {reservations: reservations.data, pagination: reservations.pagination, role: "receptionist", meals: meals.data})
})
export default Router;