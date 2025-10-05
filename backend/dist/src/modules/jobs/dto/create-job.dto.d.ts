import { JobType, ExperienceLevel, RemoteType } from '../schemas/job.schema';
export declare class CreateJobDto {
    title: string;
    description: string;
    company: string;
    location: string;
    remoteType: RemoteType;
    type: JobType;
    experienceLevel: ExperienceLevel;
    requiredSkills: string[];
    preferredSkills?: string[];
    salaryMin: number;
    salaryMax: number;
    currency: string;
    benefits?: string[];
    applicationDeadline: Date;
    companyLogo?: string;
    companyWebsite?: string;
    companySize?: string;
    industry?: string;
    applicationInstructions?: string;
    tags?: string[];
}
