import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateResource = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (e: any) {
        res.status(400).send(e.errors);
    }
}; 