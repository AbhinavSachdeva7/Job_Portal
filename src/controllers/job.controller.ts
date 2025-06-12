import { NextFunction, Response, Request } from "express";
import { AuthenticatedRequest, IJobService, IUserRepository, IValidationService, JwtPayload } from "../interfaces";
import { createJobSchema } from "../schemas/createJob.schema";
import { AppError } from "../errors/app.error";
import { ZodError } from "zod";

export class JobController {
    constructor(
        private jobService: IJobService,
        private userRepository: IUserRepository
    ) { }

    async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userPayload = req.user as JwtPayload;

            const currentUser = await this.userRepository.findById(userPayload.userId);

            if (!currentUser) {
                throw new AppError('NotFoundError', 'UserNotFound', 404);
            }

            const newJob = await this.jobService.createJob(req.body, currentUser);

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

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const jobs = await this.jobService.getAllJobs();
            res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const jobId = parseInt(req.params.id, 10);
            if (isNaN(jobId)) {
                throw new AppError('BadRequest', 'Invalid job ID format.', 400);
            }
            const job = await this.jobService.getJobById(jobId);
            res.status(200).json(job);
        } catch (error) {
            next(error);
        }
    }
}
