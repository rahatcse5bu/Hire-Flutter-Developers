"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.find().select('-password');
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).select('-password');
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async create(createUserDto) {
        const user = new this.userModel(createUserDto);
        await user.save();
        return user.toObject({ transform: (doc, ret) => {
                delete ret.password;
                return ret;
            } });
    }
    async update(id, updateData) {
        const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateSubscription(id, subscriptionData) {
        return this.update(id, subscriptionData);
    }
    async incrementJobPosts(id, count = 1) {
        const user = await this.userModel.findByIdAndUpdate(id, { $inc: { jobPostsRemaining: count } }, { new: true }).select('-password');
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async decrementJobPosts(id, count = 1) {
        const user = await this.userModel.findByIdAndUpdate(id, { $inc: { jobPostsRemaining: -count } }, { new: true }).select('-password');
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async delete(id) {
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async getAnalytics() {
        const totalUsers = await this.userModel.countDocuments();
        const developers = await this.userModel.countDocuments({ role: 'developer' });
        const recruiters = await this.userModel.countDocuments({ role: 'recruiter' });
        const verifiedUsers = await this.userModel.countDocuments({ isVerified: true });
        return {
            totalUsers,
            developers,
            recruiters,
            verifiedUsers,
            unverifiedUsers: totalUsers - verifiedUsers,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map