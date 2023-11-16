import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation"
    }],
    role: {
        type: String,
        required: false,
        default: 'GUEST'
    }
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;