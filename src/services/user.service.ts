import { User, UserStatus } from "@prisma/client";
import { AppError } from "../errors/app.error";
import { IUserRepository, IUserService } from "../interfaces";
import { UpdateProfileDTO } from "../schemas/profile.schema";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async updateProfile(userId: number, data: UpdateProfileDTO): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError('NotFound', 'User not found', 404);
        }

        const dataToUpdate = {
            ...data,
            status: UserStatus.active,
        };

        const updatedUser = await this.userRepository.update(userId, dataToUpdate);

        return updatedUser;
    }
}
