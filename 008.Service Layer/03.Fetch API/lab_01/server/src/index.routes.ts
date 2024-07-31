// Libs
import express, { Request, Response } from "express";

// Controllers
import { 
    getMovies
} from "./features/movies/movies.controller";

const routerInstance = express.Router();

// Define routes
routerInstance.get("/movies", getMovies);

routerInstance.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
        data: [],
        message: "Resource Not Found",
        error: null
    });
});

// Export router for use in main application
export default routerInstance;