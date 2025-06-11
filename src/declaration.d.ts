import { JwtPayload } from "./interfaces";

// declarations.d.ts
declare module 'eslint-plugin-import';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
