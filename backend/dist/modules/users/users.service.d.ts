import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<UserDocument>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateData: Partial<User>): Promise<User>;
    updateSubscription(id: string, subscriptionData: any): Promise<User>;
    incrementJobPosts(id: string, count?: number): Promise<User>;
    decrementJobPosts(id: string, count?: number): Promise<User>;
    delete(id: string): Promise<void>;
    getAnalytics(): Promise<{
        totalUsers: number;
        developers: number;
        recruiters: number;
        verifiedUsers: number;
        unverifiedUsers: number;
    }>;
}
