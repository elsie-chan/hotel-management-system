import Restaurant from "../models/restaurant.model";
import { ErrorMessage } from "../error/message.error.js";

const getAll = async () => {
    try {
        const restaurants = Restaurant.find();
        return await restaurants;
    } catch (e) {
        return ErrorMessage(400, "Restaurant not found");
    }
}
const getRestaurantById = async (id) => {
    try {
        const restaurant = Restaurant.findById(id);
        return await restaurant;
    } catch (e) {
        return ErrorMessage(400, "Restaurant not found");
    }
}
export default { getAll, getRestaurantById }