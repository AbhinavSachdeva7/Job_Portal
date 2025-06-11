import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../services/token.service';
import { ITokenService, JwtPayload } from '../../interfaces';

export function createAuthMiddleware(tokenService: ITokenService) {
    return async function authMiddleware(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header is missing or malformed.' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not found.' });
        }

        try {
            const payload = await tokenService.verifyToken(token);
            req.user = payload; // Attach user payload to the request
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            // This will catch errors from verifyToken (e.g., expired, invalid)
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    };
}
