import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  SHORTLISTED = 'shortlisted',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEWED = 'interviewed',
  OFFERED = 'offered',
  HIRED = 'hired',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  developerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recruiterId: Types.ObjectId;

  @Prop({ required: true })
  coverLetter: string;

  @Prop({ required: true })
  resumeUrl: string;

  @Prop()
  portfolioUrl: string;

  @Prop()
  githubUrl: string;

  @Prop()
  linkedinUrl: string;

  @Prop({ default: ApplicationStatus.PENDING, enum: ApplicationStatus })
  status: ApplicationStatus;

  @Prop()
  recruiterNotes: string;

  @Prop()
  developerNotes: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  interviewDate: Date;

  @Prop()
  interviewNotes: string;

  @Prop()
  offerDetails: {
    salary: number;
    currency: string;
    startDate: Date;
    benefits: string[];
    notes: string;
  };

  @Prop({ default: 0 })
  rating: number; // 1-5 stars from recruiter

  @Prop()
  rejectionReason: string;

  // Test Results (if applicable)
  @Prop({ type: Types.ObjectId, ref: 'TestResult' })
  testResultId: Types.ObjectId;

  @Prop({ default: 0 })
  testScore: number;

  // Communication tracking
  @Prop({ type: [{ 
    type: { type: String, enum: ['message', 'email', 'call', 'interview'] },
    content: String,
    timestamp: { type: Date, default: Date.now },
    sender: { type: String, enum: ['developer', 'recruiter'] }
  }] })
  communications: {
    type: string;
    content: string;
    timestamp: Date;
    sender: string;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);