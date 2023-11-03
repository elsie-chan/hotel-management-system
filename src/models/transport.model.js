import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema({
    vehicle: {
        type: String,
        require: true
    },
    pickup_location: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    time: {
        type: Date,
        require: false,
        default: new Date(Date.now())
    },
    guest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }]
});

const Transport = mongoose.model('Transport', transportSchema);
export default Transport;