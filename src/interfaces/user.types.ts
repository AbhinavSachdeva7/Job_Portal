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

export interface IUserRepository {
    findByEmail(email: string): Promise<string>;
    create(userData: CreateUserDTO): Promise<IUser>;
}
