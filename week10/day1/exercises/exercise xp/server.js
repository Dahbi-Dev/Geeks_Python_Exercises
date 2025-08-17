import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";
import testRoutes from "./routes/test.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/", testRoutes);

app.get("/", (req, res) => {
    res.json({ message: "JWT Authentication Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
