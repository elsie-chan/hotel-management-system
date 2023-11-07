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

router.post('/add', validation, upload.single('image'), ApiRoomController.createRoom.bind(ApiRoomController));
router.get('/', ApiRoomController.getAll);
router.post('/room-number', validation, ApiRoomController.getRoomByNumber);
router.get('/count', ApiRoomController.countRoom);
router.get('/available', ApiRoomController.getRoomIsAvailable);
router.get('/unavailable', ApiRoomController.getRoomIsUnavailable);
router.get('/category/available/:id', ApiRoomController.getRoomIsAvailableOfCategory);
router.put('/:id', validation, ApiRoomController.updateRoom);
router.delete('/:id', ApiRoomController.deleteRoom);
router.get('/:id', ApiRoomController.getRoomById);

router.put('/update/:id', validation, upload.single('image'), ApiRoomController.updateRoom);
router.delete('/delete/:id', ApiRoomController.deleteRoom);
export default router;