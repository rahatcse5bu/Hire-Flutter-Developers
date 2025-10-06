import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalJobs: number;
        totalRevenue: number;
        totalSubscriptions: number;
        userGrowth: number;
        jobGrowth: number;
        revenueGrowth: number;
        subscriptionGrowth: number;
    }>;
    getUsers(page?: number, limit?: number, search?: string, role?: string): Promise<{
        users: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            createdAt: Date;
            isActive: boolean;
        }[];
        total: number;
        totalPages: number;
    }>;
    getUserById(id: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: import("../users/schemas/user.schema").UserRole;
        createdAt: Date;
        isActive: boolean;
    }>;
    updateUser(id: string, updateData: any): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: import("../users/schemas/user.schema").UserRole;
        createdAt: Date;
        isActive: boolean;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    toggleUserStatus(id: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: import("../users/schemas/user.schema").UserRole;
        createdAt: Date;
        isActive: boolean;
    }>;
    getJobs(page?: number, limit?: number, search?: string, status?: string): Promise<{
        jobs: {
            id: import("mongoose").Types.ObjectId;
            title: string;
            company: string;
            status: import("../jobs/schemas/job.schema").JobStatus;
            createdAt: Date;
            applicationsCount: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    getJobById(id: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        title: string;
        company: string;
        status: import("../jobs/schemas/job.schema").JobStatus;
        createdAt: Date;
        applicationsCount: number;
    }>;
    updateJobStatus(id: string, status: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        title: string;
        company: string;
        status: import("../jobs/schemas/job.schema").JobStatus;
        createdAt: Date;
        applicationsCount: number;
    }>;
    deleteJob(id: string): Promise<{
        message: string;
    }>;
    getPayments(page?: number, limit?: number, search?: string, status?: string): Promise<{
        payments: {
            id: string;
            userId: string;
            userName: string;
            amount: number;
            currency: string;
            status: string;
            createdAt: Date;
            description: string;
            paymentMethod: string;
            transactionId: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getPaymentById(id: string): Promise<{
        id: string;
        userId: string;
        userName: string;
        amount: number;
        currency: string;
        status: string;
        createdAt: Date;
        description: string;
        paymentMethod: string;
        transactionId: string;
    }>;
    refundPayment(id: string): Promise<{
        status: string;
        refundedAt: Date;
        refundAmount: number;
        id: string;
        userId: string;
        userName: string;
        amount: number;
        currency: string;
        createdAt: Date;
        description: string;
        paymentMethod: string;
        transactionId: string;
    }>;
    getSubscriptions(page?: number, limit?: number, search?: string, status?: string): Promise<{
        subscriptions: {
            id: string;
            userId: string;
            userName: string;
            planName: string;
            status: string;
            startDate: Date;
            endDate: Date;
            amount: number;
            currency: string;
            autoRenew: boolean;
            features: string[];
        }[];
        total: number;
        totalPages: number;
    }>;
    getSubscriptionById(id: string): Promise<{
        id: string;
        userId: string;
        userName: string;
        planName: string;
        status: string;
        startDate: Date;
        endDate: Date;
        amount: number;
        currency: string;
        autoRenew: boolean;
        features: string[];
    }>;
    cancelSubscription(id: string): Promise<{
        status: string;
        cancelledAt: Date;
        autoRenew: boolean;
        id: string;
        userId: string;
        userName: string;
        planName: string;
        startDate: Date;
        endDate: Date;
        amount: number;
        currency: string;
        features: string[];
    }>;
    renewSubscription(id: string): Promise<{
        status: string;
        endDate: Date;
        renewedAt: Date;
        autoRenew: boolean;
        id: string;
        userId: string;
        userName: string;
        planName: string;
        startDate: Date;
        amount: number;
        currency: string;
        features: string[];
    }>;
    getAnalytics(startDate?: string, endDate?: string, type?: string): Promise<{
        data: {
            labels: string[];
            data: number[];
        };
        summary: {
            totalUsers: number;
            newUsers: number;
            activeUsers: number;
            retentionRate: string;
            totalJobs?: undefined;
            activeJobs?: undefined;
            filledJobs?: undefined;
            averageTimeToFill?: undefined;
            totalRevenue?: undefined;
            monthlyRecurring?: undefined;
            averageOrderValue?: undefined;
            churnRate?: undefined;
        };
        userRegistrations?: undefined;
        jobPostings?: undefined;
        revenue?: undefined;
        topCountries?: undefined;
        platformMetrics?: undefined;
    } | {
        data: {
            labels: string[];
            data: number[];
        };
        summary: {
            totalJobs: number;
            activeJobs: number;
            filledJobs: number;
            averageTimeToFill: string;
            totalUsers?: undefined;
            newUsers?: undefined;
            activeUsers?: undefined;
            retentionRate?: undefined;
            totalRevenue?: undefined;
            monthlyRecurring?: undefined;
            averageOrderValue?: undefined;
            churnRate?: undefined;
        };
        userRegistrations?: undefined;
        jobPostings?: undefined;
        revenue?: undefined;
        topCountries?: undefined;
        platformMetrics?: undefined;
    } | {
        data: {
            labels: string[];
            data: number[];
        };
        summary: {
            totalRevenue: number;
            monthlyRecurring: number;
            averageOrderValue: number;
            churnRate: string;
            totalUsers?: undefined;
            newUsers?: undefined;
            activeUsers?: undefined;
            retentionRate?: undefined;
            totalJobs?: undefined;
            activeJobs?: undefined;
            filledJobs?: undefined;
            averageTimeToFill?: undefined;
        };
        userRegistrations?: undefined;
        jobPostings?: undefined;
        revenue?: undefined;
        topCountries?: undefined;
        platformMetrics?: undefined;
    } | {
        userRegistrations: {
            labels: string[];
            data: number[];
        };
        jobPostings: {
            labels: string[];
            data: number[];
        };
        revenue: {
            labels: string[];
            data: number[];
        };
        topCountries: {
            country: string;
            users: number;
            percentage: number;
        }[];
        platformMetrics: {
            averageSessionDuration: string;
            bounceRate: string;
            conversionRate: string;
            activeUsers: number;
            totalSessions: number;
        };
        data?: undefined;
        summary?: undefined;
    }>;
    generateReport(reportData: any): Promise<{
        id: string;
        type: any;
        format: any;
        status: string;
        createdAt: Date;
        estimatedCompletion: Date;
        downloadUrl: any;
    }>;
    getReports(page?: number, limit?: number, type?: string): Promise<{
        reports: ({
            id: string;
            name: string;
            type: string;
            format: string;
            status: string;
            createdAt: Date;
            downloadUrl: string;
            size: string;
            progress?: undefined;
            error?: undefined;
        } | {
            id: string;
            name: string;
            type: string;
            format: string;
            status: string;
            createdAt: Date;
            downloadUrl: any;
            size: any;
            progress: number;
            error?: undefined;
        } | {
            id: string;
            name: string;
            type: string;
            format: string;
            status: string;
            createdAt: Date;
            downloadUrl: any;
            size: any;
            error: string;
            progress?: undefined;
        })[];
        total: number;
        totalPages: number;
    }>;
    getSettings(): Promise<{
        platform: {
            siteName: string;
            tagline: string;
            maintenanceMode: boolean;
            allowRegistration: boolean;
            requireEmailVerification: boolean;
            maxJobsPerUser: number;
            maxApplicationsPerJob: number;
        };
        email: {
            smtpServer: string;
            smtpPort: number;
            smtpUser: string;
            smtpSecure: boolean;
            fromName: string;
            fromEmail: string;
        };
        payment: {
            stripePublicKey: string;
            paypalClientId: string;
            currency: string;
            taxRate: number;
            allowRefunds: boolean;
            refundWindow: number;
        };
        security: {
            twoFactorEnabled: boolean;
            passwordMinLength: number;
            sessionTimeout: number;
            maxLoginAttempts: number;
            ipWhitelist: any[];
            rateLimitEnabled: boolean;
        };
        features: {
            enableJobBoosts: boolean;
            enableSkillTests: boolean;
            enableVideoInterviews: boolean;
            enableDirectMessaging: boolean;
            enableProfileAnalytics: boolean;
        };
    }>;
    updateSettings(settings: any): Promise<any>;
    getNotifications(page?: number, limit?: number, read?: boolean): Promise<{
        notifications: {
            id: string;
            title: string;
            message: string;
            type: string;
            priority: string;
            read: boolean;
            createdAt: Date;
            actionUrl: string;
        }[];
        total: number;
        totalPages: number;
        unreadCount: number;
    }>;
    markNotificationAsRead(id: string): Promise<{
        id: string;
        read: boolean;
        readAt: Date;
    }>;
    sendNotification(notificationData: any): Promise<{
        id: string;
        title: any;
        message: any;
        type: any;
        sent: boolean;
        sentAt: Date;
        recipientCount: any;
        emailSent: any;
        status: string;
    }>;
}
