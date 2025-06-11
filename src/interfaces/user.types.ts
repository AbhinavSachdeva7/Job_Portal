export interface IUser{
    id: number,
    name?: string,
    role: UserType,
    email: string
    createdAt: Date,
    updatedAt: Date,
    lastLoginAt: Date,
    status: StatusType
}

export enum StatusType {
    Active = 'Active',
    Inactive = 'Inactive',
    Pending = 'PendingProfile',
    Suspended = 'Suspended',
    Deleted = 'Deleted'
}

export enum UserType {
  Poster = 'Poster',
  Candidate = 'Candidate'
}

export interface CreateUserDTO{
    email: string,
    hashed_password: string,
    role: UserType
}

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(userData: CreateUserDTO): Promise<User>;
}
