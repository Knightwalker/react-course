import express from "express";
import { registerUser, loginUser } from "./modules/auth/authController.js"
import { getAllMovies } from "./modules/home/homeController.js";

const routerInstance = express.Router();

// Define routes
routerInstance.post("/api/auth/register", registerUser);
routerInstance.post("/api/auth/login", loginUser);
routerInstance.get("/api/home/movies", getAllMovies);

// Export router for use in main application
export default routerInstance;