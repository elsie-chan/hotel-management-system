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
        required: true
    },
    reservation: {
        type: Array,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'GUEST'
    },
    feedbacks: [{
        note: {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        }
    }]
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;