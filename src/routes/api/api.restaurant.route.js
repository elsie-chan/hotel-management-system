import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiRestaurantController from "../../controllers/api/api.restaurant.controller.js";

const router = express.Router();

router.get('/', ApiRestaurantController.getAll);
router.get('/:id', ApiRestaurantController.getRestaurantById);
router.get('/available', ApiRestaurantController.getRestaurantIsAvailable);
router.post('/book/:id', validation, ApiRestaurantController.bookTable);

export default router;