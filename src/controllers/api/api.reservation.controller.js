import { ReservationService } from "../../services/index.js";
import paginate from "../../utils/paginate.js";

class ApiReservationController{
    async getAll(req, res){
        try {
            const reservations = await ReservationService.getAll();
            return res.status(200).json(reservations);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async getReservationById(req, res){
        try {
            const reservation = await ReservationService.getReservationById(req.params.id);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async getReservationByGuest(req, res){
        try {
            const reservation = await ReservationService.getReservationByGuest(req.params.guest);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async bookingRoom(req, res){
        try {
            const { fromDate, toDate, quantity, isChildren } = req.body;
            console.log(fromDate, toDate, quantity, isChildren)
            const reservation = await ReservationService.bookingRoom("2023-11-04", "2023-11-05", 1, false);
            // return res.status(200).json(reservation);
            return res.json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async updateCheckIn(req, res){
        try {
            const reservation = await ReservationService.updateCheckIn(req.params.id, req.body.checkIn);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async updateCheckOut(req, res){
        try {
            const reservation = await ReservationService.updateCheckOut(req.params.id, req.body.checkOut);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async create(req, res){
        try {
            const reservation = await ReservationService.create(req.body);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async update(req, res){
        try {
            const reservation = await ReservationService.update(req.params.id, req.body);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    async delete(req, res){
        try {
            const reservation = await ReservationService.remove(req.params.id);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }
    // async paginate(req, res){
    //     try {
    //         const reservations = await ReservationService.getAll();
    //         const page = parseInt(req.query.page);
    //         const limit = parseInt(req.query.limit);
    //         const results = paginate(reservations, page, limit);
    //         return res.status(200).json(results);
    //     } catch (e) {
    //         return res.status(400).json(e.message);
    //     }
    // }
}

export default new ApiReservationController();