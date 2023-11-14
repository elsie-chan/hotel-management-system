import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs, {truncate} from 'fs';
import Category from './src/models/category.model.js';
import Room from './src/models/room.model.js';
import Guest from "./src/models/guest.model.js";
import Meal from "./src/models/meal.model.js";
import Transport from "./src/models/transport.model.js";
import Reservation from "./src/models/reservation.model.js";
import dayjs from "dayjs";
dotenv.config();
mongoose.set('strictQuery', false);
const loadDatabase = async () => {
    const rawData = fs.readFileSync('./database.json','utf8');
    const data = JSON.parse(rawData);
    const tables = Object.keys(data);
    // drop collection
    for (const table of tables) {
        await mongoose.connection.dropCollection(table);
    }

    const rooms = data.rooms.map((room) => {
        return Room.create({...room});
    });

    const categories = data.categories.map((category) => {
        return Category.create({...category});
    });

    const guests = data.guests.map((guest) => {
        return Guest.create({...guest});
    });

    const restaurants = data.meals.map((meal) => {
        return Meal.create({...meal});
    });

    const transports = data.transports.map((transport) => {
        return Transport.create({...transport});
    });

    const reservations = data.reservations.map(async (reservation) => {
        const transport = Transport.findOne({vehicle: reservation.transport});
        const room = await Room.findOne({roomNumber: reservation.room});
        const meals_id = [];
        for(let i = 0; i < reservation.meals.length; i++){
            const meal = await Meal.findOne({name: reservation.meals[i].name});
            meals_id.push({ meal_id : meal._id, quantity: reservation.meals[i].quantity, note: reservation.meals[i].note});
        }
        const reservationData = {
            fname: reservation.fname,
            lname: reservation.lname,
            phone: reservation.phone,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            status: reservation.status,
            note: reservation.note,
            guests: reservation.guests,
            room: await room,
            meals: meals_id,
            transport: await transport
        };
        return Reservation.create({...reservationData});
    });
    await Promise.all([...rooms, ...categories, ...guests, ...restaurants, ...transports, ...reservations]);

    for(let i = 0; i < rooms.length; i++) {
        const room = await rooms[i];
        const option = Math.trunc(room.roomNumber/100);
        let category = await categories[option - 1];
        await Room.findByIdAndUpdate(room._id, {roomType: category._id});
        category.rooms.push(room);
        await category.save();
    }

    const guest = await Guest.findOne({lname: "Si"});
    await Transport.findOneAndUpdate({vehicle: "Car"}, {guest: guest});
    for(let i = 0; i < reservations.length; i++){
        const reservation = await reservations[i];
        const guest = await Guest.findOne({lname: reservation.lname});
        await Guest.findByIdAndUpdate(guest._id,{$push: {reservations: reservation._id}});
    }
}

export default loadDatabase;