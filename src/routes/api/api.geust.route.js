import express from "express";
import ApiGuestController from "../../controllers/api/api.guest.controller.js";

const router = express.Router();

router.get("/", ApiGuestController.getAll);
router.post("/send-feedback/:id", ApiGuestController.sendFeedback);
router.get("/get-feedback/:id", ApiGuestController.getFeedback);

export default router;