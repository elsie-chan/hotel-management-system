import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    note: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    guest : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guest"
    },
    reservation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation"
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;