// Libs
import express from "express";

// Controllers
import { 
    getMovies,
    getMovies__SuccessWithNoData
} from "./features/example_001/example_001.controller";

const routerInstance = express.Router();

// Define routes
routerInstance.use("/", express.json());
routerInstance.use("/auth", express.urlencoded({ extended: true }));

routerInstance.get("/example_001/movies", getMovies);
// routerInstance.get("/example_001/movies", getMovies__SuccessWithNoData);

// Export router for use in main application
export default routerInstance;