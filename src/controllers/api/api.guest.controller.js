import { GuestService} from "../../services/index.js";
import paginate from "../../utils/paginate.js";
class ApiGuestController {
    async getAll(req,res) {
        try {
            const page = req.query.page || 1;
            const guests = await GuestService.getAll();
            return paginate(guests, page, 10);
        } catch(e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new ApiGuestController();