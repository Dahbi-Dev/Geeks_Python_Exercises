import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../utils/jwt.js";


export const logoutController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            // Find user and remove refresh token
            const decoded = verifyRefreshToken(refreshToken);
            const user = await User.findById(decoded.userId);

            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        // Clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            message: "Logged out successfully",
        });
    } catch (error) {
        // Even if there's an error, we still clear the cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            message: "Logged out successfully",
        });
    }
}

