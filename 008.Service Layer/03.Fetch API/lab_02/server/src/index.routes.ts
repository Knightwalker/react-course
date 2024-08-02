// Libs
import express, { Request, Response } from "express";

// Controllers
import { 
    getMovies,
    getMovieById
} from "./features/movies/movies.controller";
import errorHandler from "./middleware/errorHandler.middleware";

const routerInstance = express.Router();

// Define routes
routerInstance.use("/", express.json());
routerInstance.use("/auth", express.urlencoded({ extended: true }));

routerInstance.get("/movies", getMovies);
routerInstance.get("/movies/:id", getMovieById);

routerInstance.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
        data: [],
        message: "Resource Not Found",
        error: null
    });
});

routerInstance.use(errorHandler);

// Export router for use in main application
export default routerInstance;