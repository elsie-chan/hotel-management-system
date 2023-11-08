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

const create = async (data) => {
    try {
        console.log(data)
        const meal = await Meal.findOne({ name: data.name });
        if (meal) return ErrorMessage(400, "Meal is exist");
        const newMeal = new Meal(data);
        console.log(newMeal)
        return await newMeal.save();
    } catch (e) {
        return ErrorMessage(400, "Meal not created");
    }
}

const update = async (id, data) => {
    try {
        const meal = await Meal.findOne({ _id: id });
        if (!meal) return ErrorMessage(400, "Meal not found");
        const result = await Meal.findOneAndUpdate({_id: id}, {$set:data},{new:true});
        return result;
    } catch (e) {
        return ErrorMessage(400, "Meal not updated");
    }
}

const deleteMeal = async (id) => {
    try {
        const meal = await Meal.findByIdAndDelete(id);
        if(!meal){
            return ErrorMessage(400, "Room not found");
        }
        return {
            status: 200,
            message: "Delete meal successfully",
            meal: meal
        };
    } catch(e){
        return ErrorMessage(400, e.message);
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
export default { getAll, getMealById , bookMeal, create, update, deleteMeal}