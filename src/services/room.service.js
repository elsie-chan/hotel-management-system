import Room from "../models/room.model.js";
import { ErrorMessage } from "../error/message.error.js";
const getAll = async () => {
    try {
        const rooms = Room.find({ isDeleted: false }).populate("roomType", "_id name");
        return await rooms;
    } catch (e) {
        return ErrorMessage(400, "Room not found");
    }
}
const countRoom = async () => {
    return {
        total: (await getAll()).countDocuments(),
        isAvailable: (await getRoomIsAvailable()).countDocuments(),
        isUnavailable: (await getRoomIsUnavailable()).countDocuments()
    }
}
const getRoomById = async (id) => {
    try {
        const room = Room.findOne({ _id: id, isDeleted: false });
        return await room;
    } catch (e) {
        return ErrorMessage(400, "Room not found");
    }
}

const getRoomByRoomNumber = async (roomNumber) => {
    try {
        const room = Room.findOne({ roomNumber: roomNumber, isDeleted: false });
        return await room;
    } catch(e){
        return ErrorMessage(400, "Room not found");
    }
}

const getRoomIsAvailable = async () => {
    try {
        const rooms = Room.find({ isAvailable: "Còn trống", isDeleted: false });
        return await rooms;
    } catch (e) {
        return ErrorMessage(400, "Room not found");
    }
}

const getRoomIsUnavailable = async() => {
    try{
        const rooms = Room.find({$or: [{ isAvailable: "Đã đặt" }, { isAvailable: "Đang sử dụng" }]});
        return await rooms;
    }catch(e){
        return ErrorMessage(400, "Room not found");
    }
}

const getRoomIsAvailableOfCategory = async (category) => {
    try {
        const rooms = Room.find({ isAvailable: "Còn trống", roomType: category });
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
const create = async (data, files) => {
    try {
        if (!files) {
            return ErrorMessage(400, "Please choose image");
        }
        const room = await Room.findOne({ roomNumber: data.roomNumber });
        if(room){
            return ErrorMessage(400, "Room number already exists");
        }
        const newRoom = new Room({
            roomNumber: data.roomNumber,
            roomType: data.roomType,
            roomFloor: data.roomFloor,
            price: data.price,
            facilities: data.facilities,
            status: data.status,
            isAvailable: data.isAvailable,
            images: files.filename
        });
        return await newRoom.save();
    } catch(e){
        return ErrorMessage(500, e.message);
    }
}
const updateRoomWithImg = async (id, data, file) => {
    try {
        data.images = file.filename;
        const room = await Room.findByIdAndUpdate({_id: id}, {$set:data},{new:true});
        if(!room){
            return null;
        }
        return room;
    } catch (e) {
        return ErrorMessage(400, e.message);
    }
}

const updateRoom = async (id, data) => {
    try {
        const room = await Room.findByIdAndUpdate({_id: id}, {$set:data},{new:true});
        if(!room){
            return null;
        }
        return room;
    } catch (e) {
        return ErrorMessage(400, e.message);
    }
}
const deleteRoom = async (id) => {
    try {
        const room = await Room.findByIdAndUpdate(id, {isDeleted: true});
        if(!room){
            return ErrorMessage(400, "Room not found");
        }
        return {
            status: 200,
            message: "Delete room successfully",
            room: room
        };
    } catch(e){
        return ErrorMessage(400, e.message);
    }
}
export default {
    getAll,
    getRoomById,
    create,
    updateRoom,
    updateRoomWithImg,
    deleteRoom,
    countRoom,
    getRoomIsAvailableOfCategory,
    getRoomIsAvailable,
    getRoomIsUnavailable,
    getRoomByRoomNumber
}