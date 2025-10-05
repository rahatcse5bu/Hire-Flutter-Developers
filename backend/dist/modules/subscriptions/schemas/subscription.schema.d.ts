import { Document, Types } from 'mongoose';
export type SubscriptionDocument = Subscription & Document;
export declare enum SubscriptionPlan {
    FREE = "free",
    BASIC = "basic",
    PREMIUM = "premium",
    ENTERPRISE = "enterprise"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled",
    EXPIRED = "expired",
    PENDING = "pending",
    TRIAL = "trial"
}
export declare class Subscription {
    userId: Types.ObjectId;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    price: number;
    currency: string;
    stripeSubscriptionId: string;
    stripeCustomerId: string;
    stripePriceId: string;
    jobPostsPerMonth: number;
    featuredJobPosts: boolean;
    prioritySupport: boolean;
    advancedAnalytics: boolean;
    customBranding: boolean;
    boostCredits: number;
    unlimitedJobPosts: boolean;
    applicantTracking: boolean;
    teamCollaboration: boolean;
    apiAccess: boolean;
    autoRenew: boolean;
    nextBillingDate: Date;
    cancelledAt: Date;
    cancellationReason: string;
    jobPostsUsed: number;
    boostCreditsUsed: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SubscriptionSchema: import("mongoose").Schema<Subscription, import("mongoose").Model<Subscription, any, any, any, Document<unknown, any, Subscription> & Subscription & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscription, Document<unknown, {}, import("mongoose").FlatRecord<Subscription>> & import("mongoose").FlatRecord<Subscription> & {
    _id: Types.ObjectId;
}>;
export declare const SUBSCRIPTION_PLANS: {
    free: {
        price: number;
        jobPostsPerMonth: number;
        featuredJobPosts: boolean;
        prioritySupport: boolean;
        advancedAnalytics: boolean;
        customBranding: boolean;
        boostCredits: number;
        unlimitedJobPosts: boolean;
        applicantTracking: boolean;
        teamCollaboration: boolean;
        apiAccess: boolean;
    };
    basic: {
        price: number;
        jobPostsPerMonth: number;
        featuredJobPosts: boolean;
        prioritySupport: boolean;
        advancedAnalytics: boolean;
        customBranding: boolean;
        boostCredits: number;
        unlimitedJobPosts: boolean;
        applicantTracking: boolean;
        teamCollaboration: boolean;
        apiAccess: boolean;
    };
    premium: {
        price: number;
        jobPostsPerMonth: number;
        featuredJobPosts: boolean;
        prioritySupport: boolean;
        advancedAnalytics: boolean;
        customBranding: boolean;
        boostCredits: number;
        unlimitedJobPosts: boolean;
        applicantTracking: boolean;
        teamCollaboration: boolean;
        apiAccess: boolean;
    };
    enterprise: {
        price: number;
        jobPostsPerMonth: number;
        featuredJobPosts: boolean;
        prioritySupport: boolean;
        advancedAnalytics: boolean;
        customBranding: boolean;
        boostCredits: number;
        unlimitedJobPosts: boolean;
        applicantTracking: boolean;
        teamCollaboration: boolean;
        apiAccess: boolean;
    };
};
