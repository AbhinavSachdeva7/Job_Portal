import jwt from "jsonwebtoken";
import { ITokenService, JwtPayload } from "../interfaces";

export class TokenService implements ITokenService{
    private readonly jwtSecret: string;
    private readonly accessTokenExpiresIn: string;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("Secret not defined")
        }
        this.jwtSecret = process.env.JWT_SECRET;
        this.accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '60m';
    }

    generateTokens(data: JwtPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(
                    data,
                    this.jwtSecret,
                    { expiresIn: this.accessTokenExpiresIn }
                );
                resolve(token);
            } catch (error) {
                reject(error || new Error('Token generation failed.'));
            }
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
