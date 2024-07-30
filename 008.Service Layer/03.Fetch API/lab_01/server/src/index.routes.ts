// Libs
import express, { Request, Response } from "express";

// Controllers
import { 
    getMovies,
    getMovies__SuccessWithNoData
} from "./features/movies/movies.controller";

const routerInstance = express.Router();

// Define routes
routerInstance.use("/", express.json());
routerInstance.use("/auth", express.urlencoded({ extended: true }));

routerInstance.get("/movies", getMovies);
// routerInstance.get("/movies", getMovies__SuccessWithNoData);

routerInstance.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
        data: [],
        message: "Resource Not Found",
        error: null
    });
});

// Export router for use in main application
export default routerInstance;