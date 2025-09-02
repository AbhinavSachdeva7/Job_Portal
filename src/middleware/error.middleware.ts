// src/middleware/error.middleware.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app.error';

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            type: err.type,
            message: err.message,
        });
        return;
    }

    console.error(err.stack);

    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};
