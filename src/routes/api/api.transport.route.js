import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiTransportController from "../../controllers/api/api.transport.controller.js";

const router = express.Router();

router.get('/transport', ApiTransportController.getAll);
router.get('/transport/:id', ApiTransportController.getTransportById);

export default router;