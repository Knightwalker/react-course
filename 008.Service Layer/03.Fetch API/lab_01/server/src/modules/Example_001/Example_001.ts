"use strict";

import { Request, Response } from "express";

// Configs
import { config } from "../../configs/server.config.js";

// Utils
import { wait } from "../../utils/index.js";

type TMovie = {
    name: string
};

const getMovies = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    const movies: TMovie[] = [
        {
            name: "Inception"
        },
        {
            name: "The Matrix"
        },
        {
            name: "Star Wars"
        }
    ];

    return res.status(200).json({
        data: movies,
        message: "Operation completed successfully"
    });
};

const getMovies__SuccessWithNoData = async (req: Request, res: Response) => {
    await wait(config.throttle_by);

    const movies: TMovie[] = [];

    return res.status(200).json({
        data: movies,
        message: "Operation completed successfully"
    });
};

export {
    getMovies,
    getMovies__SuccessWithNoData
};