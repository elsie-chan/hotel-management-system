import { RoomService } from '../../services/index.js';
import paginate from '../../utils/paginate.js';
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
    async getRoomIsAvailable(req, res) {
        try {
            const page = req.query.page || 1;
            const rooms = await RoomService.getRoomIsAvailable();
            return paginate(rooms, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async getRoomIsAvailableOfCategory(req, res) {
        try {
            const page = req.query.page || 1;
            const rooms = await RoomService.getRoomIsAvailableOfCategory(req.params.category);
            return paginate(rooms, page, 10);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
    async createRoom(req, res) {
        try {
            const newRoom = await RoomService.create(req.body);
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
        try {
            await RoomService.updateRoom(id, req.body);
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