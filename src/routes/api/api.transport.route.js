import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiTransportController from "../../controllers/api/api.transport.controller.js";

const router = express.Router();

router.get('/', ApiTransportController.getAll);
router.get('/:id', ApiTransportController.getTransportById);

export default router;