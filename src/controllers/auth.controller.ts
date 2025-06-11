// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { IAuthService, UserRole } from '../interfaces';

export class AuthController {
    constructor(private authService: IAuthService) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, role } = req.body as { email: string, password: string, role: UserRole };
            const authResponse = await this.authService.registerUser({ email, password, role });
            res.status(201).json(authResponse);
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body as { email: string, password: string };
            const authResponse = await this.authService.loginUser({ email, password })
            res.status(200).json(authResponse)
        } catch (error) {
            next(error)
        }
    }
}
