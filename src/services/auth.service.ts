import {
    AuthResponse,
    IAuthService,
    IPasswordService,
    registerDTO,
    IUserRepository,
    ITokenService,
    loginDTO,
    UserStatus
} from '../interfaces';

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;
    private readonly passwordService: IPasswordService;
    private readonly tokenService: ITokenService;

    constructor(
        userRepository: IUserRepository,
        passwordService: IPasswordService,
        tokenService: ITokenService
    ) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }

    async registerUser(data: registerDTO): Promise<AuthResponse> {

        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User Exists")
        }

        const hashedPassword = await this.passwordService.hash(data.password);

        const newUser = await this.userRepository.create({
            email: data.email,
            hashed_password: hashedPassword,
            role: data.role,
            status: UserStatus.pending_profile
        });

        const tokens = await this.tokenService.generateTokens({ userId: newUser.id, role: newUser.role });

        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                status: newUser.status
            },
            tokens: {accessToken: tokens}
        };
    }

    async loginUser(data: loginDTO): Promise<AuthResponse> {
        // Implementation
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error("User does not exist")
        }

        const isPasswordCorrect = await this.passwordService.compare(data.password, user.hashedPassword);

        if (!isPasswordCorrect) {
            throw new Error("incorrect credentials")
        }

        if (user.status === UserStatus.suspended || user.status === UserStatus.deleted) {
            throw new Error("incorrect credentials")
        }

        const tokens = await this.tokenService.generateTokens({userId: user.id, role: user.role});

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status
            },
            tokens: { accessToken: tokens }
        };
    }
}
