import { User, Job, UserRole } from "@prisma/client";
import { CreateJobDTO, IJobRepository, IJobService } from "../interfaces/job.types";
import { AppError } from "../errors/app.error";

export class JobService implements IJobService{
    constructor(private jobRepository: IJobRepository ){}
    async createJob(jobData: CreateJobDTO, currentUser: User): Promise<Job> {
        if (currentUser.role != UserRole.recruiter) {
            throw new AppError('Auth Error', 'only recruiters can post jobs', 403);
        }

        if (typeof currentUser.companyId !== "number") {
            throw new AppError('Validation Error', 'only recruiter associated with the company can post jobs', 400);
        }

        const newJob = await this.jobRepository.create(jobData, currentUser.id, currentUser.companyId);

        return newJob
    }

    async getAllJobs(): Promise<Job[]> {
        const jobs = await this.jobRepository.findAll();
        return jobs;
    }

    async getJobById(id: number): Promise<Job | null> {
        const job = await this.jobRepository.findById(id);

        if (!job) {
            throw new AppError('NotFoundError', 'Job not found', 404);
        }

        return job;
    }
}
