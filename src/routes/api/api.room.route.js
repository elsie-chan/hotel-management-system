import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiRoomController from "../../controllers/api/api.room.controller.js";

const router = express.Router();

router.get('/room', ApiRoomController.getAll);
router.get('/room/:id', ApiRoomController.getRoomById);
router.post('/room/add', validation, ApiRoomController.createRoom);
router.put('/room/update/:id', validation, ApiRoomController.updateRoom);
router.delete('/room/delete/:id', ApiRoomController.deleteRoom);
export default router;