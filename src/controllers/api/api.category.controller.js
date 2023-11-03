import { CategoryService } from "../../services/index.js";
import paginate from "../../utils/paginate.js";

class ApiCategoryController {
    async getAll(req,res) {
        try {
            const page = req.query.page || 1;
            const categories = await CategoryService.getAll();
            return paginate(categories, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getCategoryById(req,res) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            return res.status(200).json(category);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async countRoom(req,res) {
        try {
            const result = await CategoryService.countRoom();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async createCategory(req,res) {
        try {
            const category = await CategoryService.createCategory(req.body);
            return res.status(200).json(category);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new ApiCategoryController();