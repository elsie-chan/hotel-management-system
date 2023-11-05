import express from 'express';
import ApiCategoryController from "../../controllers/api/api.category.controller.js";

const router = express.Router();

router.get('/', ApiCategoryController.getAll);
router.get('/count', ApiCategoryController.countRoom);
router.post('/add', ApiCategoryController.createCategory);
router.get('/:id', ApiCategoryController.getCategoryById);
export default router;
