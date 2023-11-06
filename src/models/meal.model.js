import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: String,
        required: true,
        trim: true
    }
});

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;