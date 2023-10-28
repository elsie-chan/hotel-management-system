import { RestaurantService } from "../../services/index.js";
import paginate from "../../utils/paginate.js";

class ApiRestaurantController {
    async getAll(req, res) {
        try {
            const page = req.query.page || 1;
            const restaurants = await RestaurantService.getAll();
            return paginate(restaurants, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getRestaurantById(req, res) {
        try {
            const restaurant = await RestaurantService.getRestaurantById(req.params.id);
            return res.status(200).json(restaurant);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new ApiRestaurantController();