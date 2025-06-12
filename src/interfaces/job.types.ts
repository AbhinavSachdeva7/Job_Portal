import { Job, User } from "@prisma/client"

export interface CreateJobDTO{
    title: string,
    description: string[],
    location: string,
    pay: string
}

export interface IJobRepository{
    create(jobData: CreateJobDTO, posterId: number, companyId: number): Promise<Job>
}

export interface IJobService{
    createJob(jobData: CreateJobDTO, currentUser: User): Promise<Job>
}
