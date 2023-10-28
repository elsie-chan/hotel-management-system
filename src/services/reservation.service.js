import Reservation from "../models/reservation.model.js";
import { ErrorMessage } from "../error/message.error.js";

const getAll = async () => {
    try {
        const reservations = Reservation.find();
        return await reservations;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}

const getReservationById = async (id) => {
    try {
        const reservation = Reservation.findById(id);
        return await reservation;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}

const getReservationByGuest = async (guest) => {
    try {
        const reservation = Reservation.find({guest});
        return await reservation;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}

const getCheckIn = async () => {
    try {
        const reservation = Reservation.find({checkIn: {$gte: new Date()}});
        return await reservation;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}
const getCheckOut = async () => {
    try {
        const reservation = Reservation.find({checkOut: {$lte: new Date()}});
        return await reservation;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}
const create = async (data) => {
    try {
        const reservation = new Reservation(data);
        return await reservation.save();
    } catch (e) {
        return ErrorMessage(400, "Reservation not created");
    }
}

const update = async (id, data) => {
    try {
        const reservation = Reservation.findByIdAndUpdate(id,data);
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}

// const remove = async (id) => {
//     try {
//         const reservation = Reservation.findByIdAndDelete(id);
//         if(!reservation) return ErrorMessage(400, "Reservation not found");
//         return await reservation;
//     } catch(e){
//         return ErrorMessage(400, "Reservation not deleted");
//     }
// }

export default { getAll, getReservationById, create, update }