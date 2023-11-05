import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiRestaurantController from "../../controllers/api/api.restaurant.controller.js";

const router = express.Router();

router.get('/', ApiRestaurantController.getAll);
router.post('/book/:id', validation, ApiRestaurantController.bookTable);
router.get('/:id', ApiRestaurantController.getRestaurantById);

export default router;