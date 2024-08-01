import { Request, Response } from "express";

// Configs
import { config } from "../../configs/server.config";

// Data
import postsDataJson from "./movies.data.json";

// Utils
import { wait } from "../../utils/index";

type TError = {
    message: string
};

type TMoviesResponse = {
    data: TMovie[] | null,
    message: string,
    error: TError | null
};

type TMovie = {
    id: string,
    name: string
};

type TMoviesData = Record<string, TMovie>;

const moviesData: TMoviesData = postsDataJson as TMoviesData;

const getMovies = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    const movies = Object
        .values(moviesData) // Convert the object to an array
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort the array by the "name" property

    const payload: TMoviesResponse = {
        data: movies,
        // data: [], // or we could have a success, but no movies in our database
        message: "Resource retrieved successfully",
        error: null
    };

    return res
        .status(200)
        .json(payload);
};

const getMovieById = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    const { id } = req.params;
    if (!id) {
        return res
            .status(401)
            .json({
                data: [],
                message: "Server is unable to process the request",
                error: null
            });
    };

    const movie = moviesData[id];
    if (!movie) {
        return res
            .status(404)
            .json({
                data: null,
                message: "Resource not found",
                error: "Post not found"
            });
    }
    return res
        .status(200)
        .json({
            data: movie,
            message: "Resource retrieved successfully",
            error: null
        });
};

export {
    getMovies,
    getMovieById
};