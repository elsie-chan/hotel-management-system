import express from 'express';
import ApiCategoryController from "../../controllers/api/api.category.controller.js";

const router = express.Router();

router.get('/category', ApiCategoryController.getAll);
router.get('/category/:id', ApiCategoryController.getCategoryById);
router.get('/category/count', ApiCategoryController.countRoom)
export default router;