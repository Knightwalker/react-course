import express from "express";
import { loginUser, registerUser } from "./modules/auth/authController.js"
import { getMovies, getMovieById, getRandomMovie } from "./modules/home/homeController.js";

const routerInstance = express.Router();

// Define routes
routerInstance.post("/api/auth/login", loginUser);
routerInstance.post("/api/auth/register", registerUser);
routerInstance.get("/api/home/movies", getMovies);
routerInstance.get("/api/home/movie", getMovieById);
routerInstance.get("/api/home/random-movie", getRandomMovie);

// Export router for use in main application
export default routerInstance;