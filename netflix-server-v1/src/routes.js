import express from "express";
import { registerUser } from "./modules/auth/authController.js";

const routerInstance = express.Router();

// // Define routes
routerInstance.post("/api/auth/register", registerUser);
routerInstance.get("/api/auth/login", registerUser);

// Export router for use in main application
export default routerInstance;