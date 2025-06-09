// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/auth.types';

export class AuthController {
    constructor(private authService: IAuthService) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const userId = await this.authService.registerUser(email, password);
            res.status(201).json({ userId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}