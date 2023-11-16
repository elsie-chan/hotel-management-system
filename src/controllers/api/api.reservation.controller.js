import { ReservationService } from "../../services/index.js";
import paginate from "../../utils/paginate.js";
import dayjs from "dayjs";

class ApiReservationController{
    async getAll(req, res){
        try {
            const page = req.query.page || 1;
            const reservations = await ReservationService.getAll();
            console.log(await reservations)
            return paginate(reservations, page, 10);
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
            // const from = new Date(dayjs(fromDate).format("YYYY-MM-DD"));
            // const to = new Date(dayjs(toDate).format("YYYY-MM-DD"));
            console.log(fromDate, toDate)
            const reservation = await ReservationService.bookingRoom(fromDate, toDate, quantity, isChildren);
            return res.status(200).json(reservation);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

    async autoUpdate(req, res){
        try {
            const reservation = await ReservationService.autoUpdate();
            return res.status(200).json(reservation);
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
    async addMealToReservation(req, res){
        try {
            const reservation = await ReservationService.addMeal(req.params.id, req.body.meals);
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
}

export default new ApiReservationController();