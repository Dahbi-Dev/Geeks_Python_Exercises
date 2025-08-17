import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/profile", async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        res.json({
            message: "Profile retrieved successfully",
            user: user.toJSON(),
        });
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.put("/profile", async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                error: "Username is required",
            });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        // Check if username is already taken by another user
        if (username !== user.username) {
            const existingUser = await User.findOne({
                username,
                _id: { $ne: req.user.userId },
            });

            if (existingUser) {
                return res.status(400).json({
                    error: "Username is already taken",
                });
            }
        }

        user.username = username;
        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: user.toJSON(),
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                error: "Validation error",
                details: messages,
            });
        }

        console.error("Profile update error:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "-password -refreshToken");

        res.json({
            message: "Users retrieved successfully",
            users,
            total: users.length,
        });
    } catch (error) {
        console.error("Users fetch error:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.delete("/account", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.userId);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        // Clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("Account deletion error:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/check", (req, res) => {
    res.json({
        message: "Authentication successful",
        user: {
            userId: req.user.userId,
            username: req.user.username,
            email: req.user.email,
        },
        authenticated: true,
    });
});

router.get("/dashboard", (req, res) => {
    res.json({
        message: "Welcome to your dashboard!",
        user: {
            userId: req.user.userId,
            username: req.user.username,
            email: req.user.email,
        },
        data: {
            notifications: [
                { id: 1, message: "Welcome to the platform!" },
                { id: 2, message: "Hello World!" },
            ],
            stats: {
                loginCount: 1,
                lastLogin: new Date().toISOString(),
            },
        },
    });
});

export default router;