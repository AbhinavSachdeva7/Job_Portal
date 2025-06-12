import { User, UserRole, UserStatus } from "@prisma/client";
import { UpdateProfileDTO } from "../schemas/profile.schema";
export { UserRole, UserStatus }

export interface IUser{
    id: number,
    name?: string,
    role: UserRole,
    email: string
    createdAt: Date,
    updatedAt: Date,
    lastLoginAt: Date,
    status: UserStatus
}

enum StatusType {
    Active = 'Active',
    Inactive = 'Inactive',
    Pending = 'PendingProfile',
    Suspended = 'Suspended',
    Deleted = 'Deleted'
}

enum UserType {
  Poster = 'Poster',
  Candidate = 'Candidate'
}

export interface CreateUserDTO{
    email: string,
    hashed_password: string,
    role: UserRole,
    status: UserStatus
}

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(userData: CreateUserDTO): Promise<User>;
    findById(id: number): Promise<User | null>;
    update(id: number, data: Partial<User>): Promise<User>;
}

export interface IUserService {
    updateProfile(userId: number, data: UpdateProfileDTO): Promise<User>;
}
