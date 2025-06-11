import jwt from "jsonwebtoken";
import { ITokenService, JwtPayload } from "../interfaces";

export class TokenService implements ITokenService{
    private readonly jwtSecret: string;
    private readonly accessTokenExpiresIn: number;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("Secret not defined")
        }
        this.jwtSecret = process.env.JWT_SECRET;
        this.accessTokenExpiresIn =  parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN || '86400', 10);
    }

    generateTokens(data: JwtPayload): Promise<string> {
        // Use the callback pattern. This is the most reliable way to avoid overload errors.
        return new Promise((resolve, reject) => {
            jwt.sign(
                data,
                this.jwtSecret,
                { expiresIn: this.accessTokenExpiresIn },
                (error, token) => {
                    if (error || !token) {
                        return reject(error || new Error('Token generation failed.'));
                    }
                    resolve(token);
                }
            );
        });
    }

    verifyToken(token: string): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            try {
                const payload = jwt.verify(token, this.jwtSecret) as JwtPayload;
                resolve(payload);
            } catch (error) {
                // This will catch expired tokens, invalid signatures, etc.
                reject(new Error(String(error)));
            }
        });
    }
}
