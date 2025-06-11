// src/repositories/user.repository.ts
import { user } from "@prisma/client";
import { CreateUserDTO, IUser, IUserRepository } from "../interfaces";
import { prisma } from "../config/prisma";

export class UserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<user | null> {
        return prisma.user.findUnique({
            where:{email}
        })
    }

    async create(userData: CreateUserDTO): Promise<User> {
        return prisma.user.create({
            data: {
                email: userData.email,
                password: userData.hashed_password,
                role: userData.role,
            }
        })
    }
}
