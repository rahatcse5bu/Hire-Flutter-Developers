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
        const { page = 1, limit = 20, search, status } = params;
        const allPayments = [
            {
                id: 'pay_001',
                userId: 'user_001',
                userName: 'John Smith',
                amount: 49.99,
                currency: 'USD',
                status: 'completed',
                createdAt: new Date('2025-01-15T10:30:00Z'),
                description: 'Premium Subscription - Monthly',
                paymentMethod: 'Credit Card',
                transactionId: 'txn_1234567890'
            },
            {
                id: 'pay_002',
                userId: 'user_002',
                userName: 'Sarah Johnson',
                amount: 299.99,
                currency: 'USD',
                status: 'completed',
                createdAt: new Date('2025-01-14T14:20:00Z'),
                description: 'Job Posting Credits - 10 Posts',
                paymentMethod: 'PayPal',
                transactionId: 'txn_0987654321'
            },
            {
                id: 'pay_003',
                userId: 'user_003',
                userName: 'Mike Chen',
                amount: 199.99,
                currency: 'USD',
                status: 'pending',
                createdAt: new Date('2025-01-13T09:15:00Z'),
                description: 'Annual Premium Subscription',
                paymentMethod: 'Bank Transfer',
                transactionId: 'txn_1122334455'
            },
            {
                id: 'pay_004',
                userId: 'user_004',
                userName: 'Emily Davis',
                amount: 99.99,
                currency: 'USD',
                status: 'refunded',
                createdAt: new Date('2025-01-12T16:45:00Z'),
                description: 'Premium Features Package',
                paymentMethod: 'Credit Card',
                transactionId: 'txn_5566778899'
            },
            {
                id: 'pay_005',
                userId: 'user_005',
                userName: 'David Wilson',
                amount: 149.99,
                currency: 'USD',
                status: 'failed',
                createdAt: new Date('2025-01-11T11:30:00Z'),
                description: 'Job Boost Package',
                paymentMethod: 'Credit Card',
                transactionId: 'txn_9988776655'
            }
        ];
        let filteredPayments = allPayments;
        if (search) {
            filteredPayments = allPayments.filter(payment => payment.userName.toLowerCase().includes(search.toLowerCase()) ||
                payment.description.toLowerCase().includes(search.toLowerCase()));
        }
        if (status && status !== 'all') {
            filteredPayments = filteredPayments.filter(payment => payment.status === status);
        }
        const total = filteredPayments.length;
        const start = (page - 1) * limit;
        const payments = filteredPayments.slice(start, start + limit);
        return {
            payments,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getPaymentById(id) {
        const payments = await this.getPayments({});
        const payment = payments.payments.find(p => p.id === id);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    }
    async refundPayment(id) {
        const payment = await this.getPaymentById(id);
        return {
            ...payment,
            status: 'refunded',
            refundedAt: new Date(),
            refundAmount: payment.amount
        };
    }
    async getSubscriptions(params) {
        const { page = 1, limit = 20, search, status } = params;
        const allSubscriptions = [
            {
                id: 'sub_001',
                userId: 'user_001',
                userName: 'John Smith',
                planName: 'Premium Monthly',
                status: 'active',
                startDate: new Date('2025-01-01T00:00:00Z'),
                endDate: new Date('2025-02-01T00:00:00Z'),
                amount: 49.99,
                currency: 'USD',
                autoRenew: true,
                features: ['Unlimited job applications', 'Profile boost', 'Priority support']
            },
            {
                id: 'sub_002',
                userId: 'user_002',
                userName: 'Sarah Johnson',
                planName: 'Business Annual',
                status: 'active',
                startDate: new Date('2024-12-01T00:00:00Z'),
                endDate: new Date('2025-12-01T00:00:00Z'),
                amount: 599.99,
                currency: 'USD',
                autoRenew: true,
                features: ['50 job posts', 'Advanced analytics', 'Candidate filtering']
            },
            {
                id: 'sub_003',
                userId: 'user_003',
                userName: 'Mike Chen',
                planName: 'Developer Pro',
                status: 'expired',
                startDate: new Date('2024-11-01T00:00:00Z'),
                endDate: new Date('2024-12-31T00:00:00Z'),
                amount: 29.99,
                currency: 'USD',
                autoRenew: false,
                features: ['Portfolio showcase', 'Skill verification', 'Direct messaging']
            },
            {
                id: 'sub_004',
                userId: 'user_004',
                userName: 'Emily Davis',
                planName: 'Startup Package',
                status: 'cancelled',
                startDate: new Date('2024-10-01T00:00:00Z'),
                endDate: new Date('2025-01-01T00:00:00Z'),
                amount: 199.99,
                currency: 'USD',
                autoRenew: false,
                features: ['10 job posts', 'Basic analytics', 'Email support']
            }
        ];
        let filteredSubscriptions = allSubscriptions;
        if (search) {
            filteredSubscriptions = allSubscriptions.filter(sub => sub.userName.toLowerCase().includes(search.toLowerCase()) ||
                sub.planName.toLowerCase().includes(search.toLowerCase()));
        }
        if (status && status !== 'all') {
            filteredSubscriptions = filteredSubscriptions.filter(sub => sub.status === status);
        }
        const total = filteredSubscriptions.length;
        const start = (page - 1) * limit;
        const subscriptions = filteredSubscriptions.slice(start, start + limit);
        return {
            subscriptions,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getSubscriptionById(id) {
        const subscriptions = await this.getSubscriptions({});
        const subscription = subscriptions.subscriptions.find(s => s.id === id);
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        return subscription;
    }
    async cancelSubscription(id) {
        const subscription = await this.getSubscriptionById(id);
        return {
            ...subscription,
            status: 'cancelled',
            cancelledAt: new Date(),
            autoRenew: false
        };
    }
    async renewSubscription(id) {
        const subscription = await this.getSubscriptionById(id);
        const newEndDate = new Date(subscription.endDate);
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        return {
            ...subscription,
            status: 'active',
            endDate: newEndDate,
            renewedAt: new Date(),
            autoRenew: true
        };
    }
    async getAnalytics(params) {
        const { type = 'overview' } = params;
        const baseData = {
            userRegistrations: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [120, 150, 180, 220, 190, 250]
            },
            jobPostings: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [45, 52, 48, 67, 59, 73]
            },
            revenue: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [12500, 15200, 18900, 22100, 19800, 28500]
            },
            topCountries: [
                { country: 'United States', users: 1250, percentage: 35.2 },
                { country: 'India', users: 890, percentage: 25.1 },
                { country: 'United Kingdom', users: 445, percentage: 12.5 },
                { country: 'Canada', users: 320, percentage: 9.0 },
                { country: 'Germany', users: 285, percentage: 8.0 }
            ],
            platformMetrics: {
                averageSessionDuration: '8m 32s',
                bounceRate: '24.5%',
                conversionRate: '3.8%',
                activeUsers: 2890,
                totalSessions: 45672
            }
        };
        switch (type) {
            case 'users':
                return {
                    data: baseData.userRegistrations,
                    summary: {
                        totalUsers: 3549,
                        newUsers: 250,
                        activeUsers: 2890,
                        retentionRate: '78.5%'
                    }
                };
            case 'jobs':
                return {
                    data: baseData.jobPostings,
                    summary: {
                        totalJobs: 344,
                        activeJobs: 189,
                        filledJobs: 98,
                        averageTimeToFill: '12.5 days'
                    }
                };
            case 'revenue':
                return {
                    data: baseData.revenue,
                    summary: {
                        totalRevenue: 117000,
                        monthlyRecurring: 45600,
                        averageOrderValue: 156.75,
                        churnRate: '5.2%'
                    }
                };
            default:
                return {
                    userRegistrations: baseData.userRegistrations,
                    jobPostings: baseData.jobPostings,
                    revenue: baseData.revenue,
                    topCountries: baseData.topCountries,
                    platformMetrics: baseData.platformMetrics
                };
        }
    }
    async generateReport(reportData) {
        const { type, format = 'pdf', dateRange } = reportData;
        return {
            id: `report_${Date.now()}`,
            type,
            format,
            status: 'generating',
            createdAt: new Date(),
            estimatedCompletion: new Date(Date.now() + 60000),
            downloadUrl: null
        };
    }
    async getReports(params) {
        const { page = 1, limit = 20, type } = params;
        const allReports = [
            {
                id: 'report_001',
                name: 'Monthly User Activity Report',
                type: 'user-activity',
                format: 'pdf',
                status: 'completed',
                createdAt: new Date('2025-01-15T09:00:00Z'),
                downloadUrl: '/reports/monthly-user-activity-jan-2025.pdf',
                size: '2.1 MB'
            },
            {
                id: 'report_002',
                name: 'Revenue Analytics Q4 2024',
                type: 'revenue',
                format: 'xlsx',
                status: 'completed',
                createdAt: new Date('2025-01-10T14:30:00Z'),
                downloadUrl: '/reports/revenue-analytics-q4-2024.xlsx',
                size: '1.8 MB'
            },
            {
                id: 'report_003',
                name: 'Job Market Trends Report',
                type: 'jobs',
                format: 'pdf',
                status: 'generating',
                createdAt: new Date('2025-01-16T11:15:00Z'),
                downloadUrl: null,
                size: null,
                progress: 75
            },
            {
                id: 'report_004',
                name: 'Security Audit Report',
                type: 'security',
                format: 'pdf',
                status: 'failed',
                createdAt: new Date('2025-01-14T16:45:00Z'),
                downloadUrl: null,
                size: null,
                error: 'Insufficient permissions to access security logs'
            }
        ];
        let filteredReports = allReports;
        if (type && type !== 'all') {
            filteredReports = allReports.filter(report => report.type === type);
        }
        const total = filteredReports.length;
        const start = (page - 1) * limit;
        const reports = filteredReports.slice(start, start + limit);
        return {
            reports,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getSettings() {
        return {
            platform: {
                siteName: 'FlutterHire',
                tagline: 'Connect Flutter Developers Worldwide',
                maintenanceMode: false,
                allowRegistration: true,
                requireEmailVerification: true,
                maxJobsPerUser: 10,
                maxApplicationsPerJob: 100
            },
            email: {
                smtpServer: 'smtp.example.com',
                smtpPort: 587,
                smtpUser: 'notifications@flutterhire.com',
                smtpSecure: true,
                fromName: 'FlutterHire Team',
                fromEmail: 'noreply@flutterhire.com'
            },
            payment: {
                stripePublicKey: 'pk_test_...',
                paypalClientId: 'AYx...',
                currency: 'USD',
                taxRate: 8.5,
                allowRefunds: true,
                refundWindow: 14
            },
            security: {
                twoFactorEnabled: true,
                passwordMinLength: 8,
                sessionTimeout: 3600,
                maxLoginAttempts: 5,
                ipWhitelist: [],
                rateLimitEnabled: true
            },
            features: {
                enableJobBoosts: true,
                enableSkillTests: true,
                enableVideoInterviews: true,
                enableDirectMessaging: true,
                enableProfileAnalytics: true
            }
        };
    }
    async updateSettings(settings) {
        return {
            ...settings,
            updatedAt: new Date(),
            success: true,
            message: 'Settings updated successfully'
        };
    }
    async getNotifications(params) {
        const { page = 1, limit = 20, read } = params;
        const allNotifications = [
            {
                id: 'notif_001',
                title: 'New User Registration Spike',
                message: 'User registrations have increased by 45% in the last 24 hours.',
                type: 'info',
                priority: 'medium',
                read: false,
                createdAt: new Date('2025-01-16T10:30:00Z'),
                actionUrl: '/admin/users'
            },
            {
                id: 'notif_002',
                title: 'Payment Failed',
                message: 'Payment processing failed for subscription ID: sub_12345',
                type: 'error',
                priority: 'high',
                read: false,
                createdAt: new Date('2025-01-16T09:15:00Z'),
                actionUrl: '/admin/payments/sub_12345'
            },
            {
                id: 'notif_003',
                title: 'System Maintenance Scheduled',
                message: 'Scheduled maintenance on Jan 20, 2025 from 2:00 AM - 4:00 AM UTC',
                type: 'warning',
                priority: 'medium',
                read: true,
                createdAt: new Date('2025-01-15T14:20:00Z'),
                actionUrl: '/admin/settings'
            },
            {
                id: 'notif_004',
                title: 'Monthly Revenue Target Achieved',
                message: 'Congratulations! This month\'s revenue target of $25,000 has been reached.',
                type: 'success',
                priority: 'low',
                read: true,
                createdAt: new Date('2025-01-15T11:45:00Z'),
                actionUrl: '/admin/analytics?type=revenue'
            },
            {
                id: 'notif_005',
                title: 'Security Alert',
                message: 'Multiple failed login attempts detected from IP: 192.168.1.100',
                type: 'error',
                priority: 'high',
                read: false,
                createdAt: new Date('2025-01-14T22:30:00Z'),
                actionUrl: '/admin/security/logs'
            }
        ];
        let filteredNotifications = allNotifications;
        if (read !== undefined) {
            filteredNotifications = allNotifications.filter(notif => notif.read === read);
        }
        const total = filteredNotifications.length;
        const start = (page - 1) * limit;
        const notifications = filteredNotifications.slice(start, start + limit);
        return {
            notifications,
            total,
            totalPages: Math.ceil(total / limit),
            unreadCount: allNotifications.filter(n => !n.read).length
        };
    }
    async markNotificationAsRead(id) {
        return {
            id,
            read: true,
            readAt: new Date()
        };
    }
    async sendNotification(notificationData) {
        const { title, message, type, userIds, sendEmail = false } = notificationData;
        return {
            id: `notif_${Date.now()}`,
            title,
            message,
            type,
            sent: true,
            sentAt: new Date(),
            recipientCount: userIds ? userIds.length : 1,
            emailSent: sendEmail,
            status: 'delivered'
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