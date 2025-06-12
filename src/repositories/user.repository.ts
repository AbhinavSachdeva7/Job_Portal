// src/repositories/user.repository.ts

import { CreateUserDTO, IUserRepository } from "../interfaces";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

export class UserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where:{email}
        })
    }

    async create(userData: CreateUserDTO): Promise<User> {
        return prisma.user.create({
            data: {
                email: userData.email,
                hashedPassword: userData.hashed_password,
                role: userData.role,
                status: userData.status
            }
        })
    }

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        });
    }
}
