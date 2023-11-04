import express from "express";
import validation from "../../validator/validation.route.js";
import ApiReservationController from "../../controllers/api/api.reservation.controller.js";

const router = express.Router();

router.get("/", ApiReservationController.getAll);
router.get("/:id", ApiReservationController.getReservationById);
router.get("/guest/:id", ApiReservationController.getReservationByGuest);
router.get("/checkIn", ApiReservationController.updateCheckIn);
router.get("/checkOut", ApiReservationController.updateCheckOut);
router.post("/add", validation, ApiReservationController.create);
router.put("/:id", validation, ApiReservationController.update);
router.delete("/:id", ApiReservationController.delete);

export default router;