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
    total: {
        type: Number,
        require: true
    },
    payment_status: {
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
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    transport:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transport'
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;