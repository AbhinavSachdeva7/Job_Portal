import { IPasswordService } from "../interfaces";
import bcrypt from 'bcryptjs'

export class PasswordService implements IPasswordService {

    private readonly saltRounds: number;

    constructor() {
        this.saltRounds = +(process.env.BCRYPT_SALT_ROUNDS || 12)
    }

    async hash(password: string): Promise<string>{
        const hashedPassword: string = await bcrypt.hash(password, this.saltRounds)
        return hashedPassword
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        const isPasswordCorrect: boolean = await bcrypt.compare(plain, hashed);
        return isPasswordCorrect
    }
}
