import { NextFunction, Response } from 'express';
import { AuthenticatedRequest, IUserService } from '../interfaces';
import { UpdateProfileDTO } from '../schemas/profile.schema';

export class UserController {
    constructor(private userService: IUserService) {
        this.updateProfile = this.updateProfile.bind(this);
    }

    async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.userId;

            const profileData = req.body as UpdateProfileDTO;

            const updatedUser = await this.userService.updateProfile(userId, profileData);

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
}
