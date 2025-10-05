import { Model, Types } from 'mongoose';
import { Job, JobDocument, JobStatus } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    create(createJobDto: CreateJobDto, recruiterId: string): Promise<Job>;
    findAll(filters?: any, page?: number, limit?: number): Promise<{
        jobs: Job[];
        total: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Job>;
    findByRecruiter(recruiterId: string, page?: number, limit?: number): Promise<{
        jobs: Job[];
        total: number;
    }>;
    update(id: string, updateJobDto: Partial<CreateJobDto>, recruiterId: string): Promise<Job>;
    updateStatus(id: string, status: JobStatus, recruiterId: string): Promise<Job>;
    remove(id: string, recruiterId: string): Promise<void>;
    boostJob(id: string, boostLevel: number, recruiterId: string): Promise<Job>;
    getAnalytics(recruiterId?: string): Promise<{
        totalJobs: number;
        activeJobs: number;
        totalApplications: any;
        jobsByType: any[];
        jobsByExperience: any[];
        recentJobs: (import("mongoose").Document<unknown, {}, JobDocument> & Job & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        })[];
    }>;
    getFeaturedJobs(): Promise<Job[]>;
    incrementApplicationCount(id: string): Promise<Job>;
}
