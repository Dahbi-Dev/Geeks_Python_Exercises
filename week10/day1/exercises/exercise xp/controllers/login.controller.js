import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../utils/jwt.js";



export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        // Generate tokens
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        // Set tokens as HTTP cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        res.json({
            message: "Login successful",
            user: user.toJSON(),
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Internal server error during login",
        });
    }
}