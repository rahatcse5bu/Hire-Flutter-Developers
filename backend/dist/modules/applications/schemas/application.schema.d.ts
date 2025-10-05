import { Document, Types } from 'mongoose';
export type ApplicationDocument = Application & Document;
export declare enum ApplicationStatus {
    PENDING = "pending",
    REVIEWED = "reviewed",
    SHORTLISTED = "shortlisted",
    INTERVIEW_SCHEDULED = "interview_scheduled",
    INTERVIEWED = "interviewed",
    OFFERED = "offered",
    HIRED = "hired",
    REJECTED = "rejected",
    WITHDRAWN = "withdrawn"
}
export declare class Application {
    jobId: Types.ObjectId;
    developerId: Types.ObjectId;
    recruiterId: Types.ObjectId;
    coverLetter: string;
    resumeUrl: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    status: ApplicationStatus;
    recruiterNotes: string;
    developerNotes: string;
    tags: string[];
    interviewDate: Date;
    interviewNotes: string;
    offerDetails: {
        salary: number;
        currency: string;
        startDate: Date;
        benefits: string[];
        notes: string;
    };
    rating: number;
    rejectionReason: string;
    testResultId: Types.ObjectId;
    testScore: number;
    communications: {
        type: string;
        content: string;
        timestamp: Date;
        sender: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const ApplicationSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any, Document<unknown, any, Application> & Application & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Application, Document<unknown, {}, import("mongoose").FlatRecord<Application>> & import("mongoose").FlatRecord<Application> & {
    _id: Types.ObjectId;
}>;
