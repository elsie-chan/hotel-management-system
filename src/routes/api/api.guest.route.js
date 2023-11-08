import express from "express";
import ApiGuestController from "../../controllers/api/api.guest.controller.js";

const router = express.Router();

router.get("/", ApiGuestController.getAll);
export default router;