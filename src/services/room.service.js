import Room from "../models/room.model.js";
import { ErrorMessage } from "../error/message.error.js";
const getAll = async () => {
    try {
        const rooms = Room.find();
        return await rooms;
    } catch (e) {
        return ErrorMessage(400, "Room not found");
    }
}
const countRoom = async () => {
    const rooms = getAll();
    return await rooms.countDocuments();
}
const getRoomById = async (id) => {
    try {
        const room = Room.findById(id);
        return await room;
    } catch (e) {
        return ErrorMessage(400, "Room not found");
    }
}

const getRoomIsAvailable = async () => {
    try {
        const rooms = Room.find({ isAvailable: true });
        return {
            status: 200,
            message: "Get room is available successfully",
            quantity: await rooms.countDocuments(),
            rooms: await rooms
        };
    } catch (e) {
        return ErrorMessage(400, "Room not found");
    }
}

const getRoomIsAvailableOfCategory = async (category) => {
    try {
        const rooms = Room.find({ isAvailable: true, category: category });
        return {
            status: 200,
            message: "Get room is available successfully",
            quantity: await rooms.countDocuments(),
            rooms: await rooms
        };
    } catch(e){
        return ErrorMessage(400, "Room not found");
    }
}
const create = async (data) => {
    try {
        const room = new Room(data);
        return await room.save();
    } catch(e){
        return ErrorMessage(500, e.message);
    }
}
const updateRoom = async (id, data) => {
    const room = await Room.findByIdAndUpdate(id, data);
    if(!room){
        return null;
    }
    return room;
}
const deleteRoom = async (id) => {
    try {
        const room = await Room.findByIdAndDelete(id);
        if(!room){
            return ErrorMessage(400, "Room not found");
        }
        return "Delete room successfully";
    } catch(e){
        return ErrorMessage(400, e.message);
    }
}
export default { getAll, getRoomById, create, updateRoom, deleteRoom }