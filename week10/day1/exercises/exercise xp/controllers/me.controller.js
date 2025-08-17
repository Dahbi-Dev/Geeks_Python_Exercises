import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../utils/jwt.js";
import { validateRegistration } from "../middleware/validateRegisteration.js";
import { registerController } from "../controllers/register.controller.js";
import { validateLogin } from "../middleware/validateLogin.js";
import { loginController } from "../controllers/login.controller.js";
import { logoutController } from "../controllers/logout.controller.js";
import { refreshController } from "../controllers/refresh.controller.js";

export const meController = async (req, res) => {
    try {
        const token =
            req.cookies.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                error: "No token provided",
                authenticated: false,
            });
        }

        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
                authenticated: false,
            });
        }

        res.json({
            authenticated: true,
            user: user.toJSON(),
        });
    } catch (error) {
        res.status(403).json({
            error: "Invalid token",
            authenticated: false,
        });
    }
}