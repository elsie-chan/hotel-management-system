import express from "express";
import validation from "../../validator/validation.route.js";
import ApiReservationController from "../../controllers/api/api.reservation.controller.js";

const router = express.Router();

router.get("/reservation", ApiReservationController.getAll);
router.get("/reservation/:id", ApiReservationController.getRestaurantById);
router.get("/reservation/guest/:id", ApiReservationController.getReservationByGuest);
router.get("/reservation/checkIn", ApiReservationController.getCheckIn);
router.get("/reservation/checkOut", ApiReservationController.getCheckOut);
router.post("/reservation/add", validation.reservation, ApiReservationController.create);
router.put("/reservation/:id", validation.reservation, ApiReservationController.update);
router.delete("/reservation/:id", ApiReservationController.delete);

export default router;