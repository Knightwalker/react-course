import { Request, Response } from "express";

// Configs
import { config } from "../../configs/server.config";

// Data
import postsDataJson from "./movies.data.json";

// Utils
import { wait } from "../../utils";

type TMovie = {
    name: string
};

const moviesData: TMovie[] = postsDataJson as TMovie[];

const getMovies = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    return res.status(200).json({
        data: moviesData,
        message: "Resource retrieved successfully",
        error: null
    });
};

export {
    getMovies
};