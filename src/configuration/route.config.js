import AuthRoute from "../routes/auth.route.js";
import ApiAuthRoute from "../routes/api/api.auth.route.js";
import HomeRoute from "../routes/home.route.js";
import ManagerRoute from "../routes/manager.route.js";
import { default as RoomRoutes} from '../routes/api/api.room.route.js';
import { default as TransportRoutes} from '../routes/api/api.transport.route.js';
import { default as CategoryRoutes} from '../routes/api/api.category.route.js';
import { default as MealRoutes} from '../routes/api/api.meal.route.js';
import { default as ReservationRoutes} from '../routes/api/api.reservation.route.js';
import { default as GuestRoutes} from '../routes/api/api.guest.route.js'
import session from "express-session";

export default (app) => {
    app.use('/', HomeRoute);
    app.use('/auth', AuthRoute);
    app.use('/api/v1/auth', ApiAuthRoute);
    app.use('/manager', ManagerRoute);
    app.use('/api/room',RoomRoutes);
    app.use('/api/transport',TransportRoutes);
    app.use('/api/category', CategoryRoutes);
    app.use('/api/meal', MealRoutes);
    app.use('/api/guest', GuestRoutes)
    app.use('/api/reservation', ReservationRoutes);

    app.get('/test', (req, res) => {
        if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
        return res.status(200).json({
            user: req.user,
            session: req.session
        });
    })
}
