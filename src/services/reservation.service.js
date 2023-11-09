import Reservation from "../models/reservation.model.js";
import { ErrorMessage } from "../error/message.error.js";
import Guest from "../models/guest.model.js";
import Room from "../models/room.model.js";
import Category from "../models/category.model.js";
import Transport from "../models/transport.model.js";
import Meal from "../models/meal.model.js";

const getAll = async () => {
    try {
        const reservations = Reservation.find().populate("room").populate("meals").populate("transport");
        return await reservations;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}

const getReservationById = async (id) => {
    try {
        const reservation = Reservation.findById(id).populate("room", "roomNumber").populate("meals").populate("transport");
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
const updateStatus = async () => {
    try {
        const currDate = new Date.now();
        console.log(currDate);
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}
const updateCheckIn = async (id, checkIn) => {
    try {
        const reservation = await Reservation.findOne({$and: [{_id: id}, {checkIn: {$lte: checkIn}}, {isDeleted: false}]},{$set:{isAvailable: "Unavailable"}});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}
const updateCheckOut = async (id, checkOut) => {
    try {
        const reservation = await Reservation.findOne({$and: [{_id: id}, {checkOut: {$lte: checkOut}}, {isDeleted: false}]},{$set:{isAvailable: "Available"}});
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
        const reservation = await Reservation.findOne({_id: id});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        if(data.transport){
            const transport = await Transport.findOne({vehicle: data.transport});
            if(!transport) return ErrorMessage(400, "Transport not found");
            data.transport = transport._id;
        }
        if(data.meals){
            const meal_id = [];
            for(let i= 0; i<data.meals.length; i++){
                const meal = await Meal.findOne({name: data.meals[i].name});
                if(!meal) return ErrorMessage(400, "Meal not found");
                meal_id.push(meal._id);
            }
            data.meals = meal_id;
        }
        if(data.room){
            const rooms = await checkRoomInDay(reservation.checkIn, reservation.checkOut);
            if(!rooms.includes(data.room)) return ErrorMessage(400, "Room not available");
            const room_id = await Room.findOne({roomNumber: data.room});
            if(!room_id) return ErrorMessage(400, "Room not found");
            data.room = room_id;
        }
        const newReservation = await Reservation.findByIdAndUpdate(id,data);
        if(!newReservation) return ErrorMessage(400, "Reservation not found");
        return newReservation;
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

const checkRoomInDay = async (fromDate, toDate) => {
    try {
        const reservation = await Reservation.find({$and: [{checkIn: {$gte: fromDate}}, {checkOut: {$lte: toDate}}]});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        let room_id = [];
        for(const temp of reservation){
            room_id.push(temp.room);
        }
        const rooms = await Room.find({_id: {$nin: room_id}});
        const rooms_id = [];
        for(const room of rooms){
            rooms_id.push(room.roomNumber);
        }
        return rooms_id;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}
const bookingRoom = async(fromDate, toDate, quantity, isChildren) => {
    console.log(fromDate, toDate, quantity, isChildren)
    try {
        const reservation = await Reservation.find({$and: [{checkIn: {$gte: fromDate}}, {checkOut: {$lte: toDate}}]});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        let room_id = [];
        for(const temp of reservation){
            room_id.push(temp.room);
        }
        let category = "";
        switch(quantity){
            case 1:
                category = "Single";
                break;
            case 2:
                category = "Double";
                break;
            case 3:
                category = "Family";
                break;
            case 4:
                category = "VIP";
                break;
            default:
                break;
        }
        if(category === "") return ErrorMessage(400, "Category not found");
        const cate = await Category.find({name: category});
        const room = Room.find({$and: [{_id: {$nin: room_id}}, {isChildren: isChildren}, {roomType: cate}, {isAvailable: "Available"}]}).populate("roomType", "name");
        return await room;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}

export default {
    getAll,
    getReservationById,
    getReservationByGuest,
    create,
    bookingRoom,
    update,
    updateCheckIn,
    updateCheckOut,
    remove
}