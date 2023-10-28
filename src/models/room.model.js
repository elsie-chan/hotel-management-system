import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    roomFloor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    facilities: {
        type: Array,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    isChildren: {
        type: Boolean,
        required: false,
        default: false
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Room = mongoose.model('Room', roomSchema);
export default Room;