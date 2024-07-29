import {
    Router,
    Request,
    Response,
    NextFunction
} from "express";

import { 
    getMovies 
} from "./features/movies/movies.controller";

const routerInstance = Router();

routerInstance.get("/movies", getMovies);

routerInstance.get("/health/live", (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json({ message: "ok" });
});

export default routerInstance;