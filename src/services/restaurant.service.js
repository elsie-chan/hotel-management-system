import Restaurant from "../models/restaurant.model.js";
import { ErrorMessage } from "../error/message.error.js";
import Reservation from "../models/reservation.model.js";
import Guest from "../models/guest.model.js";

const getAll = async () => {
    try {
        const restaurants = Restaurant.find();
        return await restaurants;
    } catch (e) {
        return ErrorMessage(400, "Restaurant not found");
    }
}
const getRestaurantIsAvailable = async () => {
    try {
        const restaurants = Restaurant.find({ status: "available" });
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
const bookTable = async (id, reservation_id) => {
    try {
        const restaurant = await Restaurant.findById(id);
        const reservation = await Reservation.findById(reservation_id);
        if (restaurant.status === "available") {
            restaurant.status = "Booked";
            restaurant.guest = reservation.select("guest");
            restaurant.time = Date.now();
            restaurant.save();
            reservation.restaurant = restaurant;
            return restaurant;
        }
    } catch(e) {
        return ErrorMessage(400, "Restaurant not found");
    }
}
export default { getAll, getRestaurantById , getRestaurantIsAvailable, bookTable}