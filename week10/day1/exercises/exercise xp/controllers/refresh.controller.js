import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../utils/jwt.js";

export const refreshController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                error: "Refresh token not provided",
            });
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Find user and check if refresh token matches
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({
                error: "Invalid refresh token",
            });
        }

        // Generate new access token
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        const newAccessToken = generateAccessToken(payload);

        // Set new access token as cookie
        res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

        res.json({
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(403).json({
            error: "Invalid or expired refresh token",
        });
    }
}