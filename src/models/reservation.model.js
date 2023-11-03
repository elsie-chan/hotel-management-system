import mongoose from 'mongoose';

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
    total_amount: {
        type: Number,
        require: true
    },
    payment_status: {
        type: String,
        require: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    transport:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transport'
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;