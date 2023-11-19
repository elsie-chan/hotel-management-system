import mongoose from 'mongoose';
import dayjs from "dayjs";
const reservationSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    checkIn: {
        type: Date,
        require: true
    },
    checkOut: {
        type: Date,
        require: true
    },
    note: {
        type: String,
        require: false
    },
    guests: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: 'Confirmed'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    meals:[{
        _id: false,
        meal_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal'
        },
        quantity: {
            type: Number,
            require: true
        }
    }],
    transport:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transport'
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;