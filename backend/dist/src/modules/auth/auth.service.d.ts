import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from '../users/schemas/user.schema';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../users/schemas/user.schema").UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../users/schemas/user.schema").UserRole;
            subscriptionTier: import("../users/schemas/user.schema").SubscriptionTier;
        };
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
