import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiMealController from "../../controllers/api/api.meal.controller.js";

const router = express.Router();

router.get('/', ApiMealController.getAll);
router.post('/book/:id', validation, ApiMealController.bookTable);
router.get('/:id', ApiMealController.getdMealById);

export default router;