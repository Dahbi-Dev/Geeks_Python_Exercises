import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Serve a simple HTML test page
router.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/test.html"));
});

export default router;
