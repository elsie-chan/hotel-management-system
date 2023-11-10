import express from "express";
import ApiReservationController from "../controllers/api/api.reservation.controller.js";

const Router = express.Router()

Router.get("/frontdesk", (req, res) => {
    res.render("layouts/receptionist/frontdesk", {title: "Front Desk", role: "receptionist" });
})

Router.get("/reservation", async (req, res) => {
    const reservations = await ApiReservationController.getAll(req, res);
    res.render("layouts/manager/reservation", {reservations: reservations.data, pagination: reservations.pagination, role: "receptionist"})
})
export default Router;