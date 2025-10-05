import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  PENDING = 'pending',
  TRIAL = 'trial',
}

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: SubscriptionPlan })
  plan: SubscriptionPlan;

  @Prop({ required: true, enum: SubscriptionStatus })
  status: SubscriptionStatus;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop()
  stripeSubscriptionId: string;

  @Prop()
  stripeCustomerId: string;

  @Prop()
  stripePriceId: string;

  // Plan features
  @Prop({ default: 1 })
  jobPostsPerMonth: number;

  @Prop({ default: false })
  featuredJobPosts: boolean;

  @Prop({ default: false })
  prioritySupport: boolean;

  @Prop({ default: false })
  advancedAnalytics: boolean;

  @Prop({ default: false })
  customBranding: boolean;

  @Prop({ default: 0 })
  boostCredits: number;

  @Prop({ default: false })
  unlimitedJobPosts: boolean;

  @Prop({ default: false })
  applicantTracking: boolean;

  @Prop({ default: false })
  teamCollaboration: boolean;

  @Prop({ default: false })
  apiAccess: boolean;

  // Billing
  @Prop({ default: false })
  autoRenew: boolean;

  @Prop()
  nextBillingDate: Date;

  @Prop()
  cancelledAt: Date;

  @Prop()
  cancellationReason: string;

  // Usage tracking
  @Prop({ default: 0 })
  jobPostsUsed: number;

  @Prop({ default: 0 })
  boostCreditsUsed: number;

  createdAt: Date;
  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

// Business Model Pricing Configuration
export const SUBSCRIPTION_PLANS = {
  [SubscriptionPlan.FREE]: {
    price: 0,
    jobPostsPerMonth: 1,
    featuredJobPosts: false,
    prioritySupport: false,
    advancedAnalytics: false,
    customBranding: false,
    boostCredits: 0,
    unlimitedJobPosts: false,
    applicantTracking: false,
    teamCollaboration: false,
    apiAccess: false,
  },
  [SubscriptionPlan.BASIC]: {
    price: 2999, // $29.99
    jobPostsPerMonth: 5,
    featuredJobPosts: false,
    prioritySupport: true,
    advancedAnalytics: true,
    customBranding: false,
    boostCredits: 2,
    unlimitedJobPosts: false,
    applicantTracking: true,
    teamCollaboration: false,
    apiAccess: false,
  },
  [SubscriptionPlan.PREMIUM]: {
    price: 4999, // $49.99
    jobPostsPerMonth: 15,
    featuredJobPosts: true,
    prioritySupport: true,
    advancedAnalytics: true,
    customBranding: true,
    boostCredits: 5,
    unlimitedJobPosts: false,
    applicantTracking: true,
    teamCollaboration: true,
    apiAccess: false,
  },
  [SubscriptionPlan.ENTERPRISE]: {
    price: 9999, // $99.99
    jobPostsPerMonth: -1, // unlimited
    featuredJobPosts: true,
    prioritySupport: true,
    advancedAnalytics: true,
    customBranding: true,
    boostCredits: 20,
    unlimitedJobPosts: true,
    applicantTracking: true,
    teamCollaboration: true,
    apiAccess: true,
  },
};