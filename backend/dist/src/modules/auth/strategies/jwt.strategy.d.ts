import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { UserDocument } from '../../users/schemas/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: Model<UserDocument>, config: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        email: string;
        role: import("../../users/schemas/user.schema").UserRole;
        subscriptionTier: import("../../users/schemas/user.schema").SubscriptionTier;
    }>;
}
export {};
