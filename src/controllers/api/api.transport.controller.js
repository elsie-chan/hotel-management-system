import paginate from "../../utils/paginate.js";
import { TransportService } from "../../services/index.js";

class ApiTransportController {
    async getAll(req, res) {
        try {
            const page = req.query.page || 1;
            const transports = await TransportService.getAll();
            return paginate(transports, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getTransportById(req, res) {
        try {
            const transport = await TransportService.getTransportById(req.params.id);
            return res.status(200).json(transport);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new ApiTransportController();