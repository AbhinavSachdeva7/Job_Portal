import { UserRole } from '@prisma/client';
import z from 'zod';

export const registerSchema = z.object({
    email: z.string({
        required_error: "Email required",
    }).email({
        message:"Invalid email format"
    }),
    password: z.string({
        required_error:"Password required",
    }).min(8, {
        message:"Password must be 8 characters long"
    }),
    role: z.nativeEnum(UserRole, {
        required_error: 'Role required',
        invalid_type_error: `Role must be ${UserRole.candidate} or ${UserRole.recruiter}`,
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email required",
    }).email({
        message:"Invalid email format"
    }),
    password: z.string({
        required_error:"Password required",
    })
})
