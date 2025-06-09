import { IAuthService } from '../interfaces/auth.types';
import { IUserRepository } from '../interfaces/auth.types';
import { IValidationService } from '../interfaces/auth.types';

export class AuthService implements IAuthService {
    constructor(
        private userRepository: IUserRepository,
        private validationService: IValidationService
    ) {}

    async registerUser(email: string, password: string): Promise<number> {
        if (!this.validationService.validateEmail(email) ||
            !this.validationService.validatePassword(password)) {
            throw new Error('Invalid email or password');
        }
        return this.userRepository.createUser(email, password);
    }

    async loginUser(email: string, password: string): Promise<boolean> {
        // Implementation
    }
}
