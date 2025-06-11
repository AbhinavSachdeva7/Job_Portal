// src/interfaces/auth.types.ts

import { IUser, UserStatus, UserRole } from "../interfaces";

export interface registerDTO{
    email: string,
    password: string,
    role: UserRole
}

export interface JwtPayload{
    userId: number,
    role: UserRole
}

export interface AuthResponse{
    user: {
        id: number,
        email: string,
        role: UserRole,
        status: UserStatus | null
    };
    tokens: {
        accessToken: string;
    };
}

interface ILoginResponse {
    token: string,
    user: IUser,
    refreshToken: string,
    expiresIn: number
}

enum AuthErrorType {
    InvalidCredentials = 'InvalidCredentials',
    UserNotFound = 'UserNotFound',
    AccountSuspended = 'AccountSuspended',
    AccountDeleted = 'AccountDeleted',
    EmailNotVerified = 'EmailNotVerified',
    TooManyAttempts = 'TooManyAttempts',
    TokenExpired = 'TokenExpired',
    InvalidToken = 'InvalidToken'
}

interface IAuthError {
    type: AuthErrorType;
    message: string;
    code: number;  // HTTP status code
    timestamp: Date;
}

export interface loginDTO {
    email: string,
    password: string
}

export interface IAuthService {
    registerUser(data: registerDTO): Promise<AuthResponse>;
    loginUser(data:loginDTO): Promise<ILoginResponse | IAuthError | AuthResponse>;
}

export interface IValidationService{
    validUserEmailCheck(email: string): boolean;
    validPasswordCheck(password: string): boolean;
}
