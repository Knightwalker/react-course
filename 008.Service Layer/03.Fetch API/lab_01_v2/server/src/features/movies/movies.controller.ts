import { Request, Response } from "express";

// Configs
import { config } from "../../configs/server.config";

// Data
import postsDataJson from "./movies.data.json";

// Utils
import { wait } from "../../utils/index";

type TMovie = {
    id: string,
    name: string
};

type TMoviesData = {
    [key: string]: TMovie;
};

const moviesData: TMoviesData = postsDataJson as TMoviesData;

const getMovies = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    return res.status(200).json({
        data: moviesData,
        // data: {}, // or we could have a success, but no movies in our database
        message: "Resource retrieved successfully",
        error: null
    });
};

const getMovieById = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    const { id } = req.params;
    if (!id) {
        return res.status(401).json({
            data: [],
            message: "Server is unable to process the request",
            error: null
        });
    };

    const movie = moviesData[id];
    if (!movie) {
        return res.status(404).json({
            data: null,
            message: "Resource not found",
            error: "Post not found"
        });
    }
    return res.status(200).json({
        data: movie,
        message: "Resource retrieved successfully",
        error: null
    });
};

export {
    getMovies,
    getMovieById
};