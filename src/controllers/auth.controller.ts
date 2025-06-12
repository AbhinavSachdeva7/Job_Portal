// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { IAuthService, IValidationService, UserRole } from '../interfaces';
import { loginSchema, registerSchema } from '../schemas/register.schema';
import { ZodError } from 'zod';

export class AuthController {
    constructor(private authService: IAuthService) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authResponse = await this.authService.registerUser(req.body);
            res.status(201).json(authResponse);
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ errors: error.flatten().fieldErrors });
                return; // Stop execution
            }
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authResponse = await this.authService.loginUser(req.body)
            res.status(200).json(authResponse)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ errors: error.flatten().fieldErrors });
                return; // Stop execution
            }
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).json({ message: "logged out" });
        } catch (error) {
            next(error);
        }
    }
}
