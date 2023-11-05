import Invoice from "../models/invoice.model.js";
import Reservation from "../models/reservation.model.js";
import {ErrorMessage} from "../error/message.error.js";

const getAll = async () => {
     try {
         const invoices = Invoice.find();
         return await invoices;
     } catch (e) {
         return ErrorMessage(500, e.message)
     }
}

const create = async(data) => {
    try {
        const reservation = await Reservation.findById(data.reservation);
        if(!reservation) return ErrorMessage(400, "Reservation not found.");
        const invoice = new Invoice(data);
        return await invoice.save();
    } catch (e) {
        return ErrorMessage(500, e.message)
    }
}