// src/interfaces/auth.types.ts

export interface IAuthService {
    registerUser(email: string, password: string): Promise<number>;
    loginUser(email: string, password: string): Promise<ILoginResponse | IAuthError>;
}

interface IUser{
    id: number,
    name?: string,
    type: UserType,
    email: string
    createdAt: Date,
    updatedAt: Date,
    lastLoginAt: Date,
    status: StatusType
}

enum StatusType {
    Active = 'Active',
    Inactive = 'Inactive',
    Pending = 'Pending',
    Suspended = 'Suspended',
    Deleted = 'Deleted'
}

enum UserType {
  Poster = 'Poster',
  Candidate = 'Candidate'
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
