import { Request } from 'express';
import { JwtPayload } from './auth.types'; // Assuming JwtPayload is here

// We create a new interface that extends the original Request from Express.
// This new interface has our custom 'user' property.
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
