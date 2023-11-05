import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs, {truncate} from 'fs';
import Category from './src/models/category.model.js';
import Room from './src/models/room.model.js';
import Guest from "./src/models/guest.model.js";
import Restaurant from "./src/models/restaurant.model.js";
import Transport from "./src/models/transport.model.js";
import Reservation from "./src/models/reservation.model.js";
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

    const restaurants = data.restaurants.map((restaurant) => {
        return Restaurant.create({...restaurant});
    });

    const transports = data.transports.map((transport) => {
        return Transport.create({...transport});
    });

    const reservations = data.reservations.map(async (reservation) => {
        // const guest = await Guest.findOne({lname: reservation.lname});
        const transport = Transport.findOne({vehicle: reservation.transport});
        const room = Room.findOne({roomNumber: reservation.rooms[0].roomNumber});
        const reservationData = {
            fname: reservation.fname,
            lname: reservation.lname,
            phone: reservation.phone,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            total: reservation.total,
            payment_status: reservation.payment_status,
            rooms: [await room],
            transport: await transport
        };
        // await Guest.find({_id: guest._id}, {$push: {reservations: reservationData}});
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
    await Transport.findOneAndUpdate({vehicle: "BMW"}, {guest: guest});
    for(let i = 0; i < reservations.length; i++){
        const reservation = await reservations[i];
        const guest = await Guest.findOne({lname: reservation.lname});
        await Guest.findByIdAndUpdate(guest._id,{$push: {reservations: reservation}});
    }
}

export default loadDatabase;