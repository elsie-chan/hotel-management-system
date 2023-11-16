import Invoice from "../models/invoice.model.js";
import Reservation from "../models/reservation.model.js";
import {ErrorMessage} from "../error/message.error.js";
import Account from "../models/account.model.js";

const getAll = async () => {
     try {
         const invoices = Invoice.find().populate(
             {
                 path: "reservation",
                    populate: {
                        path: "meals",
                        populate: {
                            path: "meal_id"
                        }
                    }
             }).populate({
                path: "reservation",
                populate: {
                    path: "room transport"
                }
         });
         return await invoices;
     } catch (e) {
         return ErrorMessage(500, e.message)
     }
}

const create = async(account_id, reservation_id, payment_status) => {
    try {
        const reservation = await Reservation.findById(reservation_id).populate("room", "price").populate("transport", "price").populate({
            path: "meals",
            populate: {
                path: "meal_id",
                select: "price"
            }
        });
        if (!reservation) {
            return ErrorMessage(404, "Reservation not found");
        }
        let total = 0;
        const day = (reservation.checkOut - reservation.checkIn) / (1000 * 60 * 60 * 24);
        const roomTotal = reservation.room.price * day;
        const transportTotal = reservation.transport.price;
        let mealTotal = 0;
        reservation.meals.forEach(meal => {
            mealTotal += meal.meal_id.price * meal.quantity;
        });
        total += roomTotal + transportTotal + mealTotal;
        console.log(total)
        const taxes = total * 8 / 100;
        console.log(taxes)
        total = total + taxes;
        const data = {
            taxes: taxes,
            roomTotal: roomTotal,
            transportTotal: transportTotal,
            mealTotal: mealTotal,
            subTotal: transportTotal + mealTotal + roomTotal,
            total: total,
            payment_method: payment_status,
            reservation: reservation_id
        }
        const invoice = new Invoice(data);
        await invoice.save();
        await Account.findByIdAndUpdate(account_id, {$push: {invoices: invoice._id}});
        return invoice;
    } catch (e) {
        return ErrorMessage(500, e.message)
    }
}
const search = async (id) => {
    try {
        const invoices = await Invoice.find({reservation: { _id: id }}).populate(
            {
                path: "reservation",
                populate: {
                    path: "meals",
                    populate: {
                        path: "meal_id"
                    }
                }
            }).populate({
            path: "reservation",
            populate: {
                path: "room transport"
            }
        });
        if(!invoices){
            return ErrorMessage(404, "Invoice not found");
        }
        return await invoices;
    } catch (e) {
        return ErrorMessage(500, e.message)
    }
}

export default {
    getAll,
    create,
    search
}