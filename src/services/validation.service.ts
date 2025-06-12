import { ZodType } from 'zod';
import { IValidationService } from '../interfaces/auth.types';

export class ValidationService implements IValidationService {
    validate<T>(schema: ZodType<T>, data: unknown): T {
        try {
            return schema.parse(data);
        } catch (error) {
            throw error
        }
    }
}
