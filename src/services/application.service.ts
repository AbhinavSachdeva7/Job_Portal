import { JobApplication, UserRole } from '@prisma/client';
import { AppError } from '../errors/app.error';
import { IApplicationRepository, IJobRepository, IApplicationService, JwtPayload } from '../interfaces';
import { ApplyToJobDTO } from '../schemas/application.schema';

export class ApplicationService implements IApplicationService {
  constructor(
    private applicationRepository: IApplicationRepository,
    private jobRepository: IJobRepository
  ) {}

  async applyToJob(jobId: number, user: JwtPayload, data: ApplyToJobDTO): Promise<JobApplication> {
    if (user.role !== UserRole.candidate) {
      throw new AppError('Forbidden', 'Only candidates can apply for jobs.', 403);
    }

    const job = await this.jobRepository.findById(jobId);
    if (!job) {
      throw new AppError('NotFound', 'Job not found.', 404);
    }

    const existingApplication = await this.applicationRepository.findByJobAndUser(jobId, user.userId);
    if (existingApplication) {
      throw new AppError('Conflict', 'You have already applied for this job.', 409);
    }

    return this.applicationRepository.create(jobId, user.userId, data);
  }

  async getApplicationsForJob(jobId: number, user: JwtPayload): Promise<JobApplication[]> {
    if (user.role !== UserRole.recruiter) {
      throw new AppError('Forbidden', 'You do not have permission to view job applications.', 403);
    }

    const job = await this.jobRepository.findById(jobId);
    if (!job) {
      throw new AppError('NotFound', 'Job not found.', 404);
    }

    if (job.userId !== user.userId) {
      throw new AppError('Forbidden', 'You can only view applications for jobs you have posted.', 403);
    }

    return this.applicationRepository.findByJobId(jobId);
  }
}
