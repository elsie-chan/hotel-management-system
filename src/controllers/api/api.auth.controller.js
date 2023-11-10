import {AuthService} from "../../services/index.js";
import Account from "../../models/account.model.js";

class ApiAuthController {
    async create(req, res) {
        try {
            const data = req.body
            const account = await AuthService.create(data)
            switch (account.status) {
                case 400:
                    return res.status(400).json(account)
                case 500:
                    return res.status(500).json(account)
                default:
                    return res.status(200).json(account)
            }
        } catch (e) {
            return res.status(500).json(e)
        }
    }
    async logout(req, res) {
        req.session.destroy();
        res.clearCookie("refreshToken");
        res.clearCookie("role");
        return res.status(200).json({message: "Logout success"});
    }

}

export default new ApiAuthController();