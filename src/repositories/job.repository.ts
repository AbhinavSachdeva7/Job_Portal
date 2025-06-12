import { CreateJobDTO, IJobRepository } from "../interfaces/job.types";
import { prisma } from "../config/prisma";
import { Job } from "@prisma/client";

export class JobRepository implements IJobRepository{
    async create(jobData: CreateJobDTO, posterId: number, companyId: number): Promise<Job> {
        return prisma.job.create({
            data: {
                title: jobData.title,
                description: jobData.description,
                location: jobData.location,
                pay: jobData.pay,
                company: {connect : {id: companyId}},
                poster: {connect: { id: posterId }}
            }
        })
    }
}
