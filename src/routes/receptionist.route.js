import express from "express";
import ApiReservationController from "../controllers/api/api.reservation.controller.js";

const Router = express.Router()

Router.get("/frontdesk", (req, res) => {
    res.render("layouts/receptionist/frontdesk")
})

Router.get("/reservation", async (req, res) => {
    const reservations = await ApiReservationController.getAll(req, res);
    res.render("layouts/receptionist/reservation", {reservations: reservations.data, pagination: reservations.pagination})
})
export default Router;