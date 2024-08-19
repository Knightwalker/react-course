import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (
    err: unknown, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (err instanceof Error) {
        console.log(err.name);
    }
};

export default errorHandler;