import express from "express";
import validation from "../../validator/validation.route.js";
import ApiInvoiceController from "../../controllers/api/api.invoice.controller.js";

const router = express.Router();

router.get("/", ApiInvoiceController.getAll);
router.post("/add", validation, ApiInvoiceController.create);
router.get("/search?", ApiInvoiceController.search);

export default router;