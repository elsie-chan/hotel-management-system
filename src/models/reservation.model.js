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
        type: Number,
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
        require: true
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    meal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    },
    transport:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transport'
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;