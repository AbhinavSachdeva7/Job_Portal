import { JobApplication } from '@prisma/client';
import { prisma } from '../config/prisma';
import { IApplicationRepository } from '../interfaces';
import { ApplyToJobDTO } from '../schemas/application.schema';

export class ApplicationRepository implements IApplicationRepository {
  async create(jobId: number, userId: number, data: ApplyToJobDTO): Promise<JobApplication> {
    return prisma.jobApplication.create({
      data: {
        jobId,
        userId,
        coverLetter: data.coverLetter,
      },
    });
  }

  async findByJobAndUser(jobId: number, userId: number): Promise<JobApplication | null> {
    return prisma.jobApplication.findUnique({
      where: {
        jobId_userId: { jobId, userId },
      },
    });
  }

  async findByJobId(jobId: number): Promise<JobApplication[]> {
    return prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        user: { // We include the user details for each application
          select: {
            id: true,
            name: true,
            email: true,
            profile: true, // We also include the user's profile
          },
        },
      },
    });
  }
}
