import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus } from './schemas/job.schema';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, req: any): Promise<import("./schemas/job.schema").Job>;
    findAll(query: any): Promise<{
        jobs: import("./schemas/job.schema").Job[];
        total: number;
        totalPages: number;
    }>;
    getFeatured(): Promise<import("./schemas/job.schema").Job[]>;
    getMyJobs(req: any, query: any): Promise<{
        jobs: import("./schemas/job.schema").Job[];
        total: number;
    }>;
    getAnalytics(req: any): Promise<{
        totalJobs: number;
        activeJobs: number;
        totalApplications: any;
        jobsByType: any[];
        jobsByExperience: any[];
        recentJobs: (import("mongoose").Document<unknown, {}, import("./schemas/job.schema").JobDocument> & import("./schemas/job.schema").Job & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findOne(id: string): Promise<import("./schemas/job.schema").Job>;
    update(id: string, updateJobDto: Partial<CreateJobDto>, req: any): Promise<import("./schemas/job.schema").Job>;
    updateStatus(id: string, body: {
        status: JobStatus;
    }, req: any): Promise<import("./schemas/job.schema").Job>;
    boostJob(id: string, body: {
        boostLevel: number;
    }, req: any): Promise<import("./schemas/job.schema").Job>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
