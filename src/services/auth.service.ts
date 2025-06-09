import { IAuthService, registerDTO } from '../interfaces/auth.types';
import { IUserRepository } from '../interfaces/user.types';
import { IValidationService } from '../interfaces/auth.types';

export class AuthService implements IAuthService {
    constructor(
        private userRepository: IUserRepository,
        private validationService: IValidationService
    ) {}

    async registerUser(data: registerDTO): Promise<number> {
        if (!this.validationService.validUserEmailCheck(data.email) ||
            !this.validationService.validPasswordCheck(data.password)) {
            throw new Error('Invalid email or password');
        }

        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User Exists")
        }

        const hashedPassword = await this.passwordService.hash(data.password);

        const newUser = await this.userRepository.create({
            emai: data.email, password: hashedPassword,
            role: data.role, status: 'PendingProfile'
        });

        const tokens = await this.tokenService.generateTokens({ userId: newUser.id, role: newUser.type });

        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.type
            },
            tokens: tokens
        };
    }

    async loginUser(email: string, password: string): Promise<boolean> {
        // Implementation
    }
}
