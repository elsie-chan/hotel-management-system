import Reservation from "../models/reservation.model.js";
import { ErrorMessage } from "../error/message.error.js";
import Guest from "../models/guest.model.js";
import Room from "../models/room.model.js";
import Category from "../models/category.model.js";

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

const updateCheckIn = async (id, checkIn) => {
    try {
        const reservation = Reservation.findByIdAndUpdate(id,{checkIn});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}
const updateCheckOut = async (id, checkOut) => {
    try {
        const reservation = await Reservation.findOne({_id: id, isDeleted: false});
        if(reservation.checkOut > checkOut){
            let hours = checkOut.getHours() - reservation.checkOut.getHours();
            let minutes = checkOut.getMinutes() - reservation.checkOut.getMinutes();
            let cost = 150000;
            let total = reservation.total;
            if(minutes > 0) hours++;
            total += cost * hours;
            reservation.total = total;
        }
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}
const create = async (data) => {
    try {
        const guest = await Guest.findOne({phone: data.phone});
        if(!guest){
            const newGuest = new Guest({fname: data.fname, lname: data.lname, phone: data.phone});
            await newGuest.save();
            data.guest = newGuest._id;
        }
        const reservation = new Reservation(data);
        await reservation.save()
        await Guest.findByIdAndUpdate(data._id,{$push: {reservations: reservation}});
        return await reservation;
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

const remove = async (id) => {
    try {
        const reservation = Reservation.findByIdAndUpdate(id,{isDeleted: true});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not deleted");
    }
}

const bookingRoom = async(fromDate, toDate, quantity, isChildren) => {
    console.log(fromDate, toDate, quantity, isChildren)
    try {
        const reservation = Reservation.find({$and: [{checkIn: {$gte: fromDate}}, {checkOut: {$lte: toDate}}]}).populate('room');
        return await reservation;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
    // const reservation = Reservation.find({$and: [{checkIn: {$gte: fromDate}}, {checkOut: {$lte: toDate}}]}).populate('room');
    // let category = "";
    // switch(quantity){
    //     case 1:
    //         category = "Single";
    //         break;
    //     case 2:
    //         category = "Double";
    //         break;
    //     case 3:
    //         category = "Triple";
    //         break;
    //     case 4:
    //         category = "VIP";
    //         break;
    //     default:
    //         break;
    // }
    // if(category === "") return ErrorMessage(400, "Category not found");
    // const cate = await Category.find({name: category});
    // const room = Room.find({$and: [{isAvailable: "Còn trống"}, {isChildren: isChildren}, {roomType: cate}]});
    // return await room;

}

export default {
    getAll,
    getReservationById,
    getReservationByGuest,
    create,
    update,
    updateCheckIn,
    updateCheckOut,
    remove
}