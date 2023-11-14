import ApiStatisticController from "../../controllers/api/api.statistic.controller.js";
import express from "express";

const router = express.Router();

router.get("/", ApiStatisticController.getRevenue);

export default router;