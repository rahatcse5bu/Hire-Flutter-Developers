import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    findAll(): Promise<import("./schemas/user.schema").User[]>;
    getAnalytics(): Promise<{
        totalUsers: number;
        developers: number;
        recruiters: number;
        verifiedUsers: number;
        unverifiedUsers: number;
    }>;
    findOne(id: string): Promise<import("./schemas/user.schema").User>;
    update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<import("./schemas/user.schema").User>;
    remove(id: string): Promise<void>;
}
