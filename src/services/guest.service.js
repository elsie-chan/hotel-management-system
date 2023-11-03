import Guest from "../models/guest.model.js";
import { ErrorMessage } from "../error/message.error.js";

const getAll = async () => {
    try {
        const guests = Guest.find();
        return await guests;
    } catch (e) {
        return ErrorMessage(400, "Guest not found");
    }
}

const sendFeedback = async (id, feedback) => {
    try {
        const guest = Guest.findByIdAndUpdate(id,feedback);
        if(!guest) return ErrorMessage(400, "Guest not found");
        return await guest;
    } catch(e){
        return ErrorMessage(400, "Guest not updated");
    }
}

const getFeedback = async (id) => {
    try {
        const guest = Guest.findById(id);
        if(!guest) return ErrorMessage(400, "Guest not found");
        return await guest;
    } catch(e){
        return ErrorMessage(400, "Guest not updated");
    }
}
const updateFeedback = async (id, feedback) => {
    try {
        const guest = Guest.findByIdAndUpdate(id,feedback);
        if(!guest) return ErrorMessage(400, "Guest not found");
        return await guest;
    } catch(e){
        return ErrorMessage(400, "Guest not updated");
    }
}
export default {
    getAll,
    sendFeedback,
    getFeedback,
    updateFeedback
}