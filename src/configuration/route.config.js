import AuthRoute from "../routes/auth.route.js";
import ApiAuthRoute from "../routes/api/api.auth.route.js";
import HomeRoute from "../routes/home.route.js";
import ManagerRoute from "../routes/manager.route.js";
import ReceptionistRoute from "../routes/receptionist.route.js";
import { default as RoomRoutes} from '../routes/api/api.room.route.js';
import { default as TransportRoutes} from '../routes/api/api.transport.route.js';
import { default as CategoryRoutes} from '../routes/api/api.category.route.js';
import { default as MealRoutes} from '../routes/api/api.meal.route.js';
import { default as ReservationRoutes} from '../routes/api/api.reservation.route.js';
import { default as GuestRoutes} from '../routes/api/api.guest.route.js'
import { default as FeedbackRoutes} from '../routes/api/api.feedback.route.js'
import { default as InvoiceRoutes} from '../routes/api/api.invoice.route.js'
import { default as StatisticRoutes} from '../routes/api/api.statistic.route.js'
import session from "express-session";
import AuthMiddleware from "../middleware/auth.middleware.js";

export default (app) => {
    app.use('/', HomeRoute);
    app.use('/auth', AuthRoute);
    app.use('/api/v1/auth', ApiAuthRoute);
    app.use('/manager', AuthMiddleware, ManagerRoute);
    app.use('/receptionist', ReceptionistRoute);
    app.use('/api/room', AuthMiddleware,RoomRoutes);
    app.use('/api/transport', AuthMiddleware,TransportRoutes);
    app.use('/api/category', AuthMiddleware, CategoryRoutes);
    app.use('/api/meal', AuthMiddleware, MealRoutes);
    app.use('/api/guest', AuthMiddleware, GuestRoutes)
    app.use('/api/reservation', ReservationRoutes);
    app.use('/api/feedback', FeedbackRoutes);
    app.use('/api/invoice', AuthMiddleware, InvoiceRoutes);
    app.use('/api/statistic', AuthMiddleware, StatisticRoutes);

    app.get('/test', (req, res) => {
        if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
        return res.status(200).json({
            user: req.user,
            session: req.session
        });
    })
}
