import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  DEVELOPER = 'developer',
  RECRUITER = 'recruiter',
  ADMIN = 'admin',
}

export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationToken: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: Date;

  @Prop()
  profileImage: string;

  @Prop()
  phone: string;

  @Prop()
  country: string;

  @Prop()
  timezone: string;

  // Subscription related
  @Prop({ default: SubscriptionTier.FREE, enum: SubscriptionTier })
  subscriptionTier: SubscriptionTier;

  @Prop()
  subscriptionId: string;

  @Prop()
  subscriptionEndDate: Date;

  @Prop({ default: 0 })
  jobPostsRemaining: number;

  // Analytics
  @Prop({ default: Date.now })
  lastLoginDate: Date;

  @Prop({ default: 0 })
  loginCount: number;

  @Prop({ default: true })
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);