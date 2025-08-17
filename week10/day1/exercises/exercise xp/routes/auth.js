import express from "express";

import { validateRegistration } from "../middleware/validateRegisteration.js";
import { registerController } from "../controllers/register.controller.js";
import { validateLogin } from "../middleware/validateLogin.js";
import { loginController } from "../controllers/login.controller.js";
import { logoutController } from "../controllers/logout.controller.js";
import { refreshController } from "../controllers/refresh.controller.js";
import { meController } from "../controllers/me.controller.js";

const router = express.Router();




// Register endpoint
router.post("/register", validateRegistration, registerController);

// Login endpoint
router.post("/login", validateLogin, loginController);

// Logout endpoint
router.post("/logout", logoutController);

// Refresh token endpoint
router.post("/refresh", refreshController);



// Check authentication status
router.get("/me", meController);

export default router;
