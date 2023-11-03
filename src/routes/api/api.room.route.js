import express from 'express';
import validation from '../../validator/validation.route.js';
import ApiRoomController from "../../controllers/api/api.room.controller.js";
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads/rooms')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

router.get('/room', ApiRoomController.getAll);
router.get('/room/:id', ApiRoomController.getRoomById);
router.post('/add', validation, upload.single('image'), ApiRoomController.createRoom.bind(ApiRoomController));
router.put('/room/update/:id', validation, ApiRoomController.updateRoom);
router.delete('/room/delete/:id', ApiRoomController.deleteRoom);
export default router;