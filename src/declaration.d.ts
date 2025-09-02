import { JwtPayload } from "./interfaces";

// declarations.d.ts

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
