import { NextFunction, Response } from "express";
import { AuthenticatedRequest, IJobService, IUserRepository, IValidationService, JwtPayload } from "../interfaces";
import { createJobSchema } from "../schemas/createJob.schema";
import { AppError } from "../errors/app.error";
import { ZodError } from "zod";

export class JobController{
    constructor(
        private jobService: IJobService,
        private validationService: IValidationService,
        private userRepository : IUserRepository
    ) { }

    async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>{
        try {
            const validatedData = this.validationService.validate(createJobSchema, req.body);

            const userPayload = req.user as JwtPayload;

            const currentUser = await this.userRepository.findById(userPayload.userId);

            if (!currentUser) {
                throw new AppError('NotFoundError', 'UserNotFound', 404);
            }

            const newJob = await this.jobService.createJob(validatedData, currentUser);

            res.status(200).json(newJob)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ errors: error.flatten().fieldErrors });
                return;
            }
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ type: error.type, message: error.message });
                return;
            }
            next(error);
        }
    }
}
