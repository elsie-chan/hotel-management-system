import { StatisticService } from '../../services/index.js';

class ApiStatisticController{
    async getRevenue(req, res){
        try {
            const room = await StatisticService.roomRevenue();
            const meal = await StatisticService.mealRevenue();
            const transport = await StatisticService.transportRevenue();
            const total = await StatisticService.totalRevenue();
            const revenue = {
                room_revenue: room,
                meal_revenue: meal,
                transport_revenue: transport,
                total: total
            }
            return revenue;
        } catch (e) {
            return res.status(500).json({message : e});
        }
    }
}

export default new ApiStatisticController();