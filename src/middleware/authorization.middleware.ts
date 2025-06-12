import { Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { AuthenticatedRequest } from '../interfaces';
import { AppError } from '../errors/app.error';

export function createAuthorizationMiddleware(allowedRoles: UserRole[]) {
    return function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const user = req.user;

        // This should theoretically not be hit if auth middleware runs first, but it's a good safeguard.
        if (!user) {
            return next(new AppError('Unauthorized', 'Authentication is required and has failed.', 401));
        }

        if (!allowedRoles.includes(user.role)) {
            return next(new AppError('Forbidden', 'You do not have permission to perform this action.', 403));
        }

        // If the user's role is in the allowed list, proceed to the next handler.
        next();
    };
}
