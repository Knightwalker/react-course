"use strict";

// Libs
import express from "express";

// Controllers
import { 
    getMovies,
    getMovies__SuccessWithNoData
} from "./modules/Example_001/Example_001.js";

const routerInstance = express.Router();

// Define routes
routerInstance.use("/", express.json());
routerInstance.use("/auth", express.urlencoded({ extended: true }));

routerInstance.get("/example_001/getMovies", getMovies);
routerInstance.get("/example_001/getMovies__SuccessWithNoData", getMovies__SuccessWithNoData);

// Export router for use in main application
export default routerInstance;