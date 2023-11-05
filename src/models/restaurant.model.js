import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    material: {
        type: Array,
        required: true
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;