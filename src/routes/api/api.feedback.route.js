import ApiFeedbackController from "../../controllers/api/api.feedback.controller.js";
import express from "express";
import validation from "../../validator/validation.route.js";

const router = express.Router();

router.get('/', ApiFeedbackController.getAll);
router.post('/add', validation, ApiFeedbackController.create);
router.get('/status/:status', ApiFeedbackController.getFeedbackByStatus);
router.put('/:id', validation, ApiFeedbackController.updateStatus);

export default router;