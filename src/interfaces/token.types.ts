import { JwtPayload } from "./auth.types";

export interface ITokenService{
    generateTokens(data: JwtPayload): Promise<string>;
    verifyToken(token: string): Promise<JwtPayload>
}
