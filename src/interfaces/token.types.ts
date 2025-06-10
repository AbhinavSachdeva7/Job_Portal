import { JwtPayload } from "jsonwebtoken";

export interface ITokenService{
    generateTokens(data: JwtPayload): Promise<string>;
    verifyToken(token: string): Promise<JwtPayload>
}
