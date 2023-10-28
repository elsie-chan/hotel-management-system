import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Category from './src/models/category.model.js';
import Room from './src/models/room.model.js';
import Guest from "./src/models/guest.model.js";
import Restaurant from "./src/models/restaurant.model.js";
import Transport from "./src/models/transport.model.js";

dotenv.config();
mongoose.set('strictQuery', false);

await mongoose.connect(process.env.MONGODB_URL);
const data = JSON.parse(fs.readFileSync('./database.json', { encoding: 'utf8', flag: 'r' }));

const categories = data.categories.map((category) => {
    return Category.create({...category});
});

const rooms = data.rooms.map((room) => {
    return Room.create({...room});
});

const guests = data.guests.map((guest) => {
    return Guest.create({...guest});
});

const restaurants = data.restaurants.map((restaurant) => {
    return Restaurant.create({...restaurant});
})

const transports = data.transports.map((transport) => {
    return Transport.create({...transport});
})

async function initDB() {
    try {
        // Reset collections
        const dbs = ['categories', 'rooms', 'guests', 'restaurants', 'transports'];
        for (let db of dbs) {
            await mongoose.connection.db.dropCollection(db);
        }

        // Insert data
        await Category.insertMany(categories);
        await Room.insertMany(rooms);
        for(let i = 0; i < rooms.length; i++) {
            await Room.findByIdAndUpdate(rooms[i]._id, {category: categories[0]._id});
            await Category.findByIdAndUpdate(categories[0]._id, {$push: {rooms: rooms[i]}});
        }
        await Guest.insertMany(guests);
        await Restaurant.insertMany(restaurants);
        await Transport.insertMany(transports);
        console.log('Database initialized successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

await initDB();
mongoose.connection.close();