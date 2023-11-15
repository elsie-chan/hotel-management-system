import express from "express";
import ApiReservationController from "../controllers/api/api.reservation.controller.js";
import ApiMealController from "../controllers/api/api.meal.controller.js";

const Router = express.Router()

Router.get("/frontdesk", async (req, res) => {
    const meals = await ApiMealController.getAll(req, res);
    res.render("layouts/receptionist/frontdesk", {title: "Front Desk", role: "receptionist", meals: meals.data  });
})

Router.get("/reservation", async (req, res) => {
    const reservations = await ApiReservationController.getAll(req, res);
    res.render("layouts/manager/reservation", {reservations: reservations.data, pagination: reservations.pagination, role: "receptionist"})
})
export default Router;