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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const job_schema_1 = require("../jobs/schemas/job.schema");
let AdminService = class AdminService {
    constructor(userModel, jobModel) {
        this.userModel = userModel;
        this.jobModel = jobModel;
    }
    async getDashboardStats() {
        const [totalUsers, totalJobs, activeUsers, activeJobs] = await Promise.all([
            this.userModel.countDocuments(),
            this.jobModel.countDocuments(),
            this.userModel.countDocuments({ isActive: true }),
            this.jobModel.countDocuments({ status: 'active' }),
        ]);
        return {
            totalUsers,
            totalJobs,
            totalRevenue: 45678,
            totalSubscriptions: 856,
            userGrowth: 5.2,
            jobGrowth: 12.5,
            revenueGrowth: 8.1,
            subscriptionGrowth: 15.3,
        };
    }
    async getUsers(params) {
        const { page = 1, limit = 20, search, role } = params;
        const skip = (page - 1) * limit;
        const filter = {};
        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        if (role && role !== 'all') {
            filter.role = role;
        }
        const [users, total] = await Promise.all([
            this.userModel.find(filter).skip(skip).limit(limit).exec(),
            this.userModel.countDocuments(filter),
        ]);
        return {
            users: users.map(user => ({
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                isActive: user.isActive,
            })),
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserById(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            isActive: user.isActive,
        };
    }
    async updateUser(id, updateData) {
        const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            isActive: user.isActive,
        };
    }
    async deleteUser(id) {
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) {
            throw new Error('User not found');
        }
        return { message: 'User deleted successfully' };
    }
    async toggleUserStatus(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.isActive = !user.isActive;
        await user.save();
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            isActive: user.isActive,
        };
    }
    async getJobs(params) {
        const { page = 1, limit = 20, search, status } = params;
        const skip = (page - 1) * limit;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
            ];
        }
        if (status && status !== 'all') {
            filter.status = status;
        }
        const [jobs, total] = await Promise.all([
            this.jobModel.find(filter).skip(skip).limit(limit).exec(),
            this.jobModel.countDocuments(filter),
        ]);
        return {
            jobs: jobs.map(job => ({
                id: job._id,
                title: job.title,
                company: job.company,
                status: job.status,
                createdAt: job.createdAt,
                applicationsCount: 0,
            })),
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getJobById(id) {
        const job = await this.jobModel.findById(id);
        if (!job) {
            throw new Error('Job not found');
        }
        return {
            id: job._id,
            title: job.title,
            company: job.company,
            status: job.status,
            createdAt: job.createdAt,
            applicationsCount: 0,
        };
    }
    async updateJobStatus(id, status) {
        const job = await this.jobModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!job) {
            throw new Error('Job not found');
        }
        return {
            id: job._id,
            title: job.title,
            company: job.company,
            status: job.status,
            createdAt: job.createdAt,
            applicationsCount: 0,
        };
    }
    async deleteJob(id) {
        const result = await this.jobModel.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Job not found');
        }
        return { message: 'Job deleted successfully' };
    }
    async getPayments(params) {
        return {
            payments: [],
            total: 0,
            totalPages: 0,
        };
    }
    async getPaymentById(id) {
        throw new Error('Payment not found');
    }
    async refundPayment(id) {
        throw new Error('Payment not found');
    }
    async getSubscriptions(params) {
        return {
            subscriptions: [],
            total: 0,
            totalPages: 0,
        };
    }
    async getSubscriptionById(id) {
        throw new Error('Subscription not found');
    }
    async cancelSubscription(id) {
        throw new Error('Subscription not found');
    }
    async renewSubscription(id) {
        throw new Error('Subscription not found');
    }
    async getAnalytics(params) {
        return {
            data: [],
            summary: {},
        };
    }
    async generateReport(reportData) {
        return {
            id: 'report-1',
            status: 'generated',
            downloadUrl: '/reports/report-1.pdf',
        };
    }
    async getReports(params) {
        return {
            reports: [],
            total: 0,
            totalPages: 0,
        };
    }
    async getSettings() {
        return {
            siteName: 'FlutterHire',
            maintenanceMode: false,
            allowRegistration: true,
        };
    }
    async updateSettings(settings) {
        return settings;
    }
    async getNotifications(params) {
        return {
            notifications: [],
            total: 0,
            totalPages: 0,
        };
    }
    async markNotificationAsRead(id) {
        return {
            id,
            read: true,
        };
    }
    async sendNotification(notificationData) {
        return {
            id: 'notification-1',
            sent: true,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map