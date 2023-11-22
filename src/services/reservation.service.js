import Reservation from "../models/reservation.model.js";
import { ErrorMessage } from "../error/message.error.js";
import Guest from "../models/guest.model.js";
import Room from "../models/room.model.js";
import Category from "../models/category.model.js";
import Transport from "../models/transport.model.js";
import Meal from "../models/meal.model.js";
import InvoiceService from "./invoice.service.js";
const getAll = async () => {
    try {
        const reservations = Reservation.find().populate("room", "roomNumber").populate({
            path: "meals", populate: {
                path: "meal_id"
            }
        }).populate("transport");
        return await reservations;
    } catch (e) {
        return ErrorMessage(400, "Reservation not found");
    }
}

const getReservationById = async (id) => {
    try {
        const reservation = Reservation.findById(id).populate("room", "roomNumber").populate({
            path: "meals",
            populate: {
                path: "meal_id"
            }
        }).populate("transport");
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
        const reservation = await Reservation.findOne({$and: [{_id: id}, {checkIn: {$lte: checkIn}}]},{$set:{status: "Check In"}});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}
const updateCheckOut = async (id, checkOut) => {
    try {
        const reservation = await Reservation.findOne({$and: [{_id: id}, {checkOut: {$lte: checkOut}}]},{$set:{status: "Check Out"}});
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}

const autoUpdateStatus = async () => {
    try{
        const current = new Date.now();
        const reservations = await Reservation.find().map(reservation => {
            if(reservation.checkIn.getDate() === current.getDate() && reservation.checkIn.getMonth() === current.getMonth() && reservation.checkIn.getFullYear() === current.getFullYear()){
                if(reservation.checkIn.getHours() > current.getHours()){
                    return reservation;
                }
            }
        })
        if(reservations){
            for (const reservation of reservations) {
                await Reservation.findByIdAndUpdate(reservation._id,{$set:{status: "Cancelled"}});
            }
        }
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}
const create = async (data) => {

    try {
        const guest = await Guest.findOne({phone: data.phone});


        if(!guest){
            const newGuest = new Guest({fname: data.fname, lname: data.lname, phone: data.phone, email:data.email});
            // console.log(newGuest);
            await newGuest.save();
            data.guest = newGuest._id;
        } else {
            console.log(guest);
            data.guest = guest._id;
        }

        if(data.transport) {
            if (data.transport === "None") {
                data.transport = null;
            } else {
                const transport = new Transport(data.transport);
                await transport.save();
                transport.guest.push({
                    _id: data.guest,
                })
                // console.log(transport);
                await transport.save();
                data.transport = transport._id;
            }
        }
        const room = await Room.findOne({_id: data.room});
        if(!room) return ErrorMessage(400, "Room not found");
        // console.log(data)
        const reservation = new Reservation(data);
        await reservation.save()
        if (guest) {
            guest.reservations.push({
                _id: reservation._id,
            })
            guest.save();
        } else {
            const guest = await Guest.findOne({_id: data.guest});
            guest.reservations.push({
                _id: reservation._id,
            })
            guest.save();
        }

        return await reservation;
    } catch (e) {
        console.log(e);
        return ErrorMessage(400, "Reservation not created");
    }
}
const addMeal = async(id, meals) => {
    try {
        if(!meals) return ErrorMessage(400, "Meal not found");
        const reservation = await Reservation.findOne({_id: id});
        const mealExists = reservation.meals.map(m => m.meal_id);
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        const meal_id = [];
        for(let i= 0; i<meals.length; i++){
            const meal = await Meal.findOne({_id: meals[i]._id});
            if(!meal) return ErrorMessage(400, "Meal not found");
            if(mealExists.some(m => m.equals(meal._id))){
                await Reservation.updateOne({_id: id, "meals.meal_id":meal._id}, {$inc: {"meals.$.quantity": meals[i].quantity}});
            }else{
                meal_id.push({meal_id: meal._id, quantity: meals[i].quantity});
            }
        }
        await Reservation.findByIdAndUpdate(id,{$push: {meals: meal_id}});
        return await reservation;
    } catch(e){
        return ErrorMessage(400, "Reservation not updated");
    }
}
const update = async (id, data) => {
    try {
        console.log(data)
        const reservation = await Reservation.findOne({_id: id}).populate("transport");
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        if(reservation.status === "Cancelled" || reservation.status === "Checked out") return ErrorMessage(400, "Cannot update reservation after check out or cancel");
        if(data.transport){
            if (data.transport === "null") {
                data.transport = null;
            } else {
                if (data.transport !== reservation.transport.vehicle && reservation.status=== "Checked in") return ErrorMessage(400, "Cannot update transport after check in");
                const transport = await Transport.findOne({vehicle: data.transport});
                if(!transport) return ErrorMessage(400, "Transport not found");
                data.transport = transport._id;
            }
        }
        // if(data.meals){
        //     const meal_id = [];
        //     for(let i= 0; i<data.meals.length; i++){
        //         const meal = await Meal.findOne({name: data.meals[i].name});
        //         if(!meal) return ErrorMessage(400, "Meal not found");
        //         meal_id.push(meal._id);
        //     }
        //     data.meals = meal_id;
        // }
        if(data.room){
            await Room.findByIdAndUpdate(reservation.room,{$set: {isAvailable: "Available"}});
            const rooms = await checkRoomInDay(reservation.checkIn, reservation.checkOut);
            if(rooms.includes(data.room)) return ErrorMessage(400, "Room not available");
            const room_id = await Room.findOne({roomNumber: data.room});
            if(!room_id) return ErrorMessage(400, "Room not found");
            data.room = room_id;
            await Room.findByIdAndUpdate(data.room,{$set: {isAvailable: "Occupied"}});
        }
        switch(data.status){
            case "Confirmed":{
                return ErrorMessage(400, "Cannot update status to confirmed");
                break;
            }
            case "Checked in":{
                if (reservation.status=== "Confirmed") {
                    await Room.findByIdAndUpdate(reservation.room,{$set: {isAvailable: "Occupied"}});
                } else {
                    return ErrorMessage(400, "Cannot update status to checked in");
                }
                break;
            }
            case "Checked out":{
                if (reservation.status === "Checked in") {
                    await Room.findByIdAndUpdate(reservation.room,{$set: {isAvailable: "Available"}});
                    await InvoiceService.create(reservation.id, "Cash");
                } else {
                    return ErrorMessage(400, "Cannot update status to checked out");
                }
                break;
            }
            case "Cancelled":{
                if (reservation.status=== "Confirmed") {
                    data.status = "Cancelled";
                    await Room.findByIdAndUpdate(reservation.room,{$set: {isAvailable: "Available"}});
                    if (reservation.status=== "Checked in") {
                        await InvoiceService.create(reservation.id, "Cash");
                    }
                }
                break;
            }
            default:
                break;
        }
        const newReservation = await Reservation.findByIdAndUpdate(id,data);
        if(!newReservation) return ErrorMessage(400, "Reservation not found");
        return newReservation;
    } catch(e){
        console.log(e)
        return ErrorMessage(400, "Reservation not updated");
    }
}

const remove = async (id) => {
    try {
        const reservation = Reservation.findByIdAndUpdate(id,{$set:{status: "Cancelled"}});
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
        if (fromDate >= toDate) return ErrorMessage(400, "Check in date must be before check out date");
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
                category = "VIP";
                break;
        }
        if(category === "") return ErrorMessage(400, "Category not found");
        const cate = await Category.find({name: category});
        const room = Room.find({$and: [{_id: {$nin: room_id}}, {isChildren: isChildren}, {roomType: cate}, {isAvailable: "Available"}]}).populate("roomType", "name");
        console.log(cate)

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
    addMeal,
    updateCheckIn,
    updateCheckOut,
    remove
}