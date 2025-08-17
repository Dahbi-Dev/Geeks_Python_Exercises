import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../utils/jwt.js";

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User with this email or username already exists",
            });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

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

        res.status(201).json({
            message: "User registered successfully",
            user: user.toJSON(),
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: "User with this email or username already exists",
            });
        }

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                error: "Validation error",
                details: messages,
            });
        }

        console.error("Registration error:", error);
        res.status(500).json({
            error: "Internal server error during registration",
        });
    }
};