import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
}

export enum ExperienceLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  PRINCIPAL = 'principal',
}

export enum JobStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed',
  EXPIRED = 'expired',
}

export enum RemoteType {
  REMOTE = 'remote',
  HYBRID = 'hybrid',
  ON_SITE = 'on_site',
}

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  company: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recruiterId: Types.ObjectId;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: RemoteType })
  remoteType: RemoteType;

  @Prop({ required: true, enum: JobType })
  type: JobType;

  @Prop({ required: true, enum: ExperienceLevel })
  experienceLevel: ExperienceLevel;

  @Prop({ type: [String], required: true })
  requiredSkills: string[];

  @Prop({ type: [String] })
  preferredSkills: string[];

  @Prop({ required: true })
  salaryMin: number;

  @Prop({ required: true })
  salaryMax: number;

  @Prop({ required: true })
  currency: string;

  @Prop()
  benefits: string[];

  @Prop({ required: true })
  applicationDeadline: Date;

  @Prop({ default: JobStatus.DRAFT, enum: JobStatus })
  status: JobStatus;

  @Prop({ default: 0 })
  applicationCount: number;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop()
  companyLogo: string;

  @Prop()
  companyWebsite: string;

  @Prop()
  companySize: string;

  @Prop()
  industry: string;

  @Prop({ default: false })
  isUrgent: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  applicationInstructions: string;

  @Prop({ type: [String] })
  tags: string[];

  // Business Model Fields
  @Prop({ default: false })
  isPremium: boolean; // Premium job posts get better visibility

  @Prop()
  promotedUntil: Date; // Promoted job posts

  @Prop({ default: 0 })
  boostLevel: number; // 0-3, higher = better visibility

  createdAt: Date;
  updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);