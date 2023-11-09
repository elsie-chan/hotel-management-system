import Invoice from "../models/invoice.model.js";
import Reservation from "../models/reservation.model.js";
import {ErrorMessage} from "../error/message.error.js";

const getAll = async () => {
     try {
         const invoices = Invoice.find().populate(
             {
                 path: "reservation",
                    populate: {
                        path: "room meals transport"
                    }
             }
         );
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
        const roomTotal = reservation.room.price * day;
        const transportTotal = reservation.transport.price;
        const mealTotal = 0;
        reservation.meals.forEach(meal => {
            total += meal.price;
        });
        total += roomTotal + transportTotal + mealTotal;
        total = total + (total * taxes) / 100;
        const data = {
            taxes: taxes,
            roomTotal: roomTotal,
            transportTotal: transportTotal,
            mealTotal: mealTotal,
            subTotal: transportTotal + mealTotal,
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