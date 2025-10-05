import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    DEVELOPER = "developer",
    RECRUITER = "recruiter",
    ADMIN = "admin"
}
export declare enum SubscriptionTier {
    FREE = "free",
    BASIC = "basic",
    PREMIUM = "premium",
    ENTERPRISE = "enterprise"
}
export declare class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    verificationToken: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    profileImage: string;
    phone: string;
    country: string;
    timezone: string;
    subscriptionTier: SubscriptionTier;
    subscriptionId: string;
    subscriptionEndDate: Date;
    jobPostsRemaining: number;
    lastLoginDate: Date;
    loginCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
