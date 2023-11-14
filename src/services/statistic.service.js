import Invoice from "../models/invoice.model.js";
import {ErrorMessage} from "../error/message.error.js";
const mealRevenue = async() => {
    try {
        const invoices = await Invoice.find().populate({
            path: "reservation",
            populate: {
                path: "meals",
                populate: {
                    path: "meal_id"
                }
            }
        });
        let total = 0;
        invoices.forEach(invoice => {
            total += invoice.mealTotal;
        })
        return total;
    } catch (e) {
        return ErrorMessage(500, e.message);
    }
}

const roomRevenue = async() => {
    try {
        const invoices = await Invoice.find().populate({
            path: "reservation",
            populate: {
                path: "room"
            }
        });
        let total = 0;
        invoices.forEach(invoice => {
            total += invoice.roomTotal;
        })
        return total;
    } catch (e) {
        return ErrorMessage(500, e.message);
    }
}

const transportRevenue = async() => {
    try {
        const invoices = await Invoice.find().populate({
            path: "reservation",
            populate: {
                path: "transport"
            }
        });
        let total = 0;
        invoices.forEach(invoice => {
            total += invoice.transportTotal;
        })
        return total;
    } catch (e) {
        return ErrorMessage(500, e.message);
    }
}

const totalRevenue = async() => {
    try {
        const invoices = await Invoice.find();
        let total = 0;
        invoices.forEach(invoice => {
            total += invoice.total;
        })
        return total;
    } catch(e){
        return ErrorMessage(500, e.message);
    }
}

const subtotalRevenue = async() => {
    try {
        const invoices = await Invoice.find();
        let total = 0;
        invoices.forEach(invoice => {
            total += invoice.subTotal;
        })
        return total;
    } catch(e){
        return ErrorMessage(500, e.message);
    }
}
export default {
    transportRevenue,
    mealRevenue,
    subtotalRevenue,
    roomRevenue,
    totalRevenue
}