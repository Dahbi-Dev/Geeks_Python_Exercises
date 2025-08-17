import { verifyAccessToken } from "../utils/jwt.js";

// JWT Authentication Middleware
export const authenticateToken = (req, res, next) => {
    // Try to get token from cookies first, then from Authorization header
    const token =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            error: "Access denied. No token provided.",
            code: "NO_TOKEN",
        });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid or expired token.",
            code: "INVALID_TOKEN",
        });
    }
};

// Optional authentication middleware (doesn't block if no token)
export const optionalAuth = (req, res, next) => {
    const token =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
        try {
            const decoded = verifyAccessToken(token);
            req.user = decoded;
        } catch (error) {
            // Token is invalid but we don't block the request
            req.user = null;
        }
    }

    next();
};

// Admin role middleware (use after authenticateToken)
export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            error: "Access denied. Admin privileges required.",
            code: "INSUFFICIENT_PERMISSIONS",
        });
    }
    next();
};
