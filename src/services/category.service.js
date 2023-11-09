import Category from "../models/category.model.js";
import { ErrorMessage } from "../error/message.error.js";
import Room from "../models/room.model.js";

const getAll = async () => {
    try {
        const categories = Category.find();
        return await categories;
    } catch (e) {
        return ErrorMessage(400, "Category not found");
    }
}
const getCategoryById = async (id) => {
    try {
        const category = Category.findById(id).populate("rooms");
        return await category;
    } catch (e) {
        return ErrorMessage(400, "Category not found");
    }
}
const countRoom = async () => {
    try {
        const result = [];
        const category = await Category.find();
        for(const item of category) {
            let count = 0;
            for(const room_id of item.rooms){
                const room = await Room.findById(room_id);
                if(room.isAvailable === "Available") count++;
            }
            result.push({ name: item.name, availabe: count, unavailable: item.rooms.length - count, total: item.rooms.length });
        }
        return result;
    } catch (e) {
        return ErrorMessage(400, "Category not found");
    }
}

const createCategory = async (category) => {
    try {
        const newCategory = new Category(category);
        return await newCategory.save();
    } catch (e) {
        return ErrorMessage(400, "Category not found");
    }
}
export default {
    getAll,
    getCategoryById ,
    countRoom,
    createCategory
}