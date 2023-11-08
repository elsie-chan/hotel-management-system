import { RoomService } from '../../services/index.js';
import paginate from '../../utils/paginate.js';
import Category from "../../models/category.model.js";
class ApiRoomController {
    async getAll(req, res) {
        try {
            const page = req.query.page || 1;
            const rooms = await RoomService.getAll();
            return paginate(rooms, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getRoomById(req, res) {
        try {
            const room = await RoomService.getRoomById(req.params.id);
            return res.status(200).json(room);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getRoomByNumber(req, res) {
        try {
            const { roomNumber } = req.body;
            const room = await RoomService.getRoomByRoomNumber(roomNumber);
            return res.status(200).json(room);
        } catch (e) {
            return res.status(500).json({message : e});
        }
    }
    async getRoomIsAvailable(req, res) {
        try {
            const page = req.query.page || 1;
            const rooms = await RoomService.getRoomIsAvailable();
            return paginate(rooms, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getRoomIsUnavailable(req, res) {
        try {
            const page = req.query.page || 1;
            const rooms = await RoomService.getRoomIsUnavailable();
            return paginate(rooms, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async countRoom(req, res) {
        try {
            const rooms = await RoomService.countRoom();
            return res.status(200).json(rooms);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getRoomIsAvailableOfCategory(req, res) {
        try {
            const page = req.query.page || 1;
            const category = await Category.findById(req.params.id);
            const rooms = await RoomService.getRoomIsAvailableOfCategory(category);
            return paginate(rooms, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async createRoom(req, res) {
        try {
            console.log(req.body, req.file)
            const newRoom = await RoomService.create(req.body, req.file);
            console.log(newRoom)
            if(newRoom.status === 400) return res.status(400).json({ message: newRoom.message });
            return res.status(200).json({
                message: 'Create room successfully',
                room: newRoom
            });
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async updateRoom(req, res) {
        const { id } = req.params;
        console.log(req.file)
        try {
            await RoomService.updateRoom(id, req.body, req.file);
            return res.status(200).json({ message: 'Update room successfully' });
        }catch(e){
            return res.status(500).json({ message: e.message });
        }
    }
    async deleteRoom(req, res) {
        const { id } = req.params;
        try {
            const room = await RoomService.deleteRoom(id);
            switch(room.status){
                case 400: return res.status(400).json({ message: room.message });
                case 500: return res.status(500).json({ message: room.message });
                default: return res.status(200).json({ message: room });
            }
        } catch(e){
            return res.status(500).json({ message: e.message });
        }
    }
}

export default new ApiRoomController();