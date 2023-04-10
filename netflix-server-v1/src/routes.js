import express from "express";
import { registerUser, loginUser } from "./modules/auth/authController.js";

const routerInstance = express.Router();

// // Define routes
routerInstance.post("/api/auth/register", registerUser);
routerInstance.post("/api/auth/login", loginUser);

// Export router for use in main application
export default routerInstance;