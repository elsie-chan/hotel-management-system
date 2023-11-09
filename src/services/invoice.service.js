import Invoice from "../models/invoice.model.js";
import Reservation from "../models/reservation.model.js";
import {ErrorMessage} from "../error/message.error.js";

const getAll = async () => {
     try {
         const invoices = Invoice.find().populate("reservation", "--createdAt --updatedAt --isDeleted --__v");
         return await invoices;
     } catch (e) {
         return ErrorMessage(500, e.message)
     }
}

const create = async(reservation_id, taxes, payment_status) => {
    try {
        const reservation = await Reservation.findById(reservation_id).populate("room", "price").populate("transport", "price").populate("meals");
        if (!reservation) {
            return ErrorMessage(404, "Reservation not found");
        }
        let total = 0;
        const day = (reservation.checkOut - reservation.checkIn) / (1000 * 60 * 60 * 24);
        total += (reservation.room.price * day) + reservation.transport.price;
        reservation.meals.forEach(meal => {
            total += meal.price;
        });
        total = total + (total * (taxes / 100));
        const data = {
            taxes: taxes,
            total: total,
            payment_method: payment_status,
            reservation: reservation_id
        }
        const invoice = new Invoice(data);
        return await invoice.save();
    } catch (e) {
        return ErrorMessage(500, e.message)
    }
}

export default {
    getAll,
    create
}