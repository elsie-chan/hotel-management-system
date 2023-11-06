import Meal from "../models/meal.model.js";
import { ErrorMessage } from "../error/message.error.js";
import Reservation from "../models/reservation.model.js";

const getAll = async () => {
    try {
        const meals = Meal.find();
        return await meals;
    } catch (e) {
        return ErrorMessage(400, "Meal not found");
    }
}
const getMealById = async (id) => {
    try {
        const meal = Meal.findById(id);
        return await meal;
    } catch (e) {
        return ErrorMessage(400, "Meal not found");
    }
}
const bookMeal = async (id, reservation_id) => {
    try {
        const meal = await Meal.findById(id);
        // const reservation = await Reservation.findById(reservation_id);
        await Reservation.findById(reservation_id,{$push:{meal:meal}});
        return meal;
    } catch(e) {
        return ErrorMessage(400, "Meal not found");
    }
}
export default { getAll, getMealById , bookMeal}