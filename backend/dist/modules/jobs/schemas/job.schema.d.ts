import { Document, Types } from 'mongoose';
export type JobDocument = Job & Document;
export declare enum JobType {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    CONTRACT = "contract",
    FREELANCE = "freelance",
    INTERNSHIP = "internship"
}
export declare enum ExperienceLevel {
    ENTRY = "entry",
    JUNIOR = "junior",
    MID = "mid",
    SENIOR = "senior",
    LEAD = "lead",
    PRINCIPAL = "principal"
}
export declare enum JobStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    PAUSED = "paused",
    CLOSED = "closed",
    EXPIRED = "expired"
}
export declare enum RemoteType {
    REMOTE = "remote",
    HYBRID = "hybrid",
    ON_SITE = "on_site"
}
export declare class Job {
    title: string;
    description: string;
    company: string;
    recruiterId: Types.ObjectId;
    location: string;
    remoteType: RemoteType;
    type: JobType;
    experienceLevel: ExperienceLevel;
    requiredSkills: string[];
    preferredSkills: string[];
    salaryMin: number;
    salaryMax: number;
    currency: string;
    benefits: string[];
    applicationDeadline: Date;
    status: JobStatus;
    applicationCount: number;
    viewCount: number;
    companyLogo: string;
    companyWebsite: string;
    companySize: string;
    industry: string;
    isUrgent: boolean;
    isFeatured: boolean;
    applicationInstructions: string;
    tags: string[];
    isPremium: boolean;
    promotedUntil: Date;
    boostLevel: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const JobSchema: import("mongoose").Schema<Job, import("mongoose").Model<Job, any, any, any, Document<unknown, any, Job> & Job & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Job, Document<unknown, {}, import("mongoose").FlatRecord<Job>> & import("mongoose").FlatRecord<Job> & {
    _id: Types.ObjectId;
}>;
