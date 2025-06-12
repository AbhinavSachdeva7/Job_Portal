import { JobApplication, User } from '@prisma/client';
import { ApplyToJobDTO } from '../schemas/application.schema';
import { JwtPayload } from './auth.types';

export interface IApplicationRepository {
  create(jobId: number, userId: number, data: ApplyToJobDTO): Promise<JobApplication>;
  findByJobAndUser(jobId: number, userId: number): Promise<JobApplication | null>;
  findByJobId(jobId: number): Promise<JobApplication[]>;
}

export interface IApplicationService {
  applyToJob(jobId: number, user: JwtPayload, data: ApplyToJobDTO): Promise<JobApplication>;
  getApplicationsForJob(jobId: number, user: JwtPayload): Promise<JobApplication[]>;
}
