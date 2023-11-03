import AuthRoute from "../routes/auth.route.js";
import ApiAuthRoute from "../routes/api/api.auth.route.js";
import HomeRoute from "../routes/home.route.js";
import ManagerRoute from "../routes/manager.route.js";
import ApiRoomRoute from "../routes/api/api.room.route.js";

const routes = function(app) {
    app.use('/', HomeRoute);
    app.use('/auth', AuthRoute);
    app.use('/api/v1/auth', ApiAuthRoute);
    app.use('/api/room', ApiRoomRoute);
    app.use('/manager', ManagerRoute);
}

export default routes;
