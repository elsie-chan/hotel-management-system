import { GuestService} from "../../services/index.js";
import paginate from "../../utils/paginate.js";
class ApiGuestController {
    async sendFeedback(req,res) {
        try {
            const id = req.params.id;
            const fb = await GuestService.sendFeedback(id, req.body);
            return res.status(200).json(fb);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getFeedback(req,res) {
        try {
            const id = req.params.id;
            const fb = await GuestService.getFeedback(id);
            return res.status(200).json(fb);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
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