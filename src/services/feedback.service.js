import Feedback from "../models/feedback.model.js";
import Reservation from "../models/reservation.model.js";
import Guest from "../models/guest.model.js";
import { ErrorMessage } from "../error/message.error.js";


const getAll = async () => {
    try {
        const feedbacks = Feedback.find().populate('guest', "lname fname");
        return await feedbacks;
    } catch (e) {
        return ErrorMessage(400, "Feedback not found");
    }
}

const getFeedbackById = async (id) => {
    try {
        const feedback = Feedback.findById(id).populate('guest', "lname fname");
        return await feedback;
    } catch (e) {
        return ErrorMessage(400, "Feedback not found");
    }
}

const updateStatus = async (id) => {
    try{
        const feedback = await Feedback.findByIdAndUpdate(id, {status: true});
        if(!feedback){
            return ErrorMessage(400, "Feedback not found");
        }
    } catch(e){
        return ErrorMessage(400, e.message);
    }
}

const sendFeedback = async (data) => {
    console.log(data);
    try {
        const reservation = await Reservation.findById(data.reservation);
        if(!reservation) return ErrorMessage(400, "Reservation not found");
        const guest = await Guest.findOne({phone: data.guest});
        if(!guest) return ErrorMessage(400, "Phone number is not correct");
        data.guest = guest._id;
        const newFeedback = new Feedback(data);
        return await newFeedback.save();
    } catch (e) {
        return ErrorMessage(400, "Feedback not created");
    }
}

const getFeedbackByStatus = async (status) => {
    try {
        const feedback = Feedback.find({status: status}).populate('guest', "lname fname");
        return await feedback;
    } catch (e) {
        return ErrorMessage(400, "Feedback not found");
    }
}

export default {
    getAll,
    sendFeedback,
    getFeedbackById,
    updateStatus,
    getFeedbackByStatus
}