import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        require: true
    },
    time:{
        type: Date,
        require: true
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    status: {
        type: String,
        require: true
    },
    guestNumber: {
        type: Number,
        require: true
    }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;