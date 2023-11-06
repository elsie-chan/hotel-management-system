import { MealService } from "../../services/index.js";
import paginate from "../../utils/paginate.js";

class ApiMealController {
    async getAll(req, res) {
        try {
            const page = req.query.page || 1;
            const meals = await MealService.getAll();
            return paginate(meals, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getdMealById(req, res) {
        try {
            const meal = await MealService.getMealById(req.params.id);
            return res.status(200).json(meal);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async bookTable(req, res) {
        try {
            const { reservation_id } = req.body;
            const restaurant = await MealService.bookTable(req.params.id, reservation_id);
            return res.status(200).json(restaurant);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new ApiMealController();