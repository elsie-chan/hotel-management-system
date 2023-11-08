import { FeedbackService } from "../../services/index.js";
import paginate from "../../utils/paginate.js";

class ApiFeedbackController{
    async getAll(req, res){
        try{
            const page = req.query.page || 1;
            const feedbacks = await FeedbackService.getAll();
            return paginate(feedbacks, page, 10);
        } catch(e){
            return res.status(400).json(e.message);
        }
    }
    async getFeedbackByStatus(req, res){
        try{
            const status = req.params.status;
            const feedback = await FeedbackService.getFeedbackByStatus(status);
            return res.status(200).json(feedback);
        } catch(e){
            return res.status(400).json(e.message);
        }
    }
    async updateStatus(req, res){
        try{
            const { id } = req.params;
            const feedback = await FeedbackService.updateStatus(id);
            return res.status(200).json(feedback);
        } catch(e){
            return res.status(400).json(e.message);
        }
    }
    async sendFeedback(req, res){
        try{
            const data = req.body;
            const feedback = await FeedbackService.sendFeedback(data);
            return res.status(200).json(feedback);
        } catch(e){
            return res.status(400).json(e.message);
        }
    }
}

export default new ApiFeedbackController();