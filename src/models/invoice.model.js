import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    taxes: {
        type: Number,
        require: true
    },
    roomTotal: {
        type: Number,
        require: false

    },
    transportTotal: {
        type: Number,
        require: false
    },
    mealTotal: {
        type: Number,
        require: false
    },
    subTotal: {
        type: Number,
        require: false
    },
    total: {
        type: Number,
        require: true
    },
    paid_at: {
        type: Date,
        require: false,
        default: Date.now()
    },
    payment_method: {
        type: String,
        require: true
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;