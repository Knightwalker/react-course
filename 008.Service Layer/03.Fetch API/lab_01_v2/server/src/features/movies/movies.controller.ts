import { Request, Response } from "express";

// Configs
import { config } from "../../configs/server.config";

// Data
import postsDataJson from "./movies.data.json";

// Utils
import { wait } from "../../utils/index";

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

const getMovies__SuccessWithNoData = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    const movies: TMovie[] = [];

    return res.status(200).json({
        data: movies,
        message: "Resource retrieved successfully",
        error: null
    });
};

export {
    getMovies,
    getMovies__SuccessWithNoData
};