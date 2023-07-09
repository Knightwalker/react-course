"use strict";

// Libs
import express from "express";

// Controllers
import { login, logout, register } from "./modules/auth/authController.js"
import { getMovies, getMovieById, getRandomMovie } from "./modules/home/homeController.js";

// Middlewares
import AuthenticationMiddleware from "./modules/auth/middleware/authenticationMiddleware.js";

const routerInstance = express.Router();
// Define routes
routerInstance.use("/api", express.json());
routerInstance.use("/api/auth", express.urlencoded({ extended: true }));

routerInstance.post("/api/auth/login", login);
routerInstance.post("/api/auth/register", register);
routerInstance.post("/api/auth/logout", AuthenticationMiddleware, logout);

routerInstance.get("/api/home/movies", getMovies);
routerInstance.get("/api/home/movie", getMovieById);
routerInstance.get("/api/home/random-movie", getRandomMovie);

// Export router for use in main application
export default routerInstance;