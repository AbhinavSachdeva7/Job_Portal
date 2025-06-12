import { Job, User } from "@prisma/client"

export interface CreateJobDTO{
    title: string,
    description: string,
    location: string,
    pay: string
}

export interface IJobRepository{
    create(jobData: CreateJobDTO, posterId: number, companyId: number): Promise<Job>
    findAll(): Promise<Job[]>
    findById(id: number): Promise<Job | null>
}

export interface IJobService{
    createJob(jobData: CreateJobDTO, currentUser: User): Promise<Job>
    getAllJobs(): Promise<Job[]>
    getJobById(id: number): Promise<Job | null>
}
