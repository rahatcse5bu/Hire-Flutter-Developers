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
        payments: any[];
        total: number;
        totalPages: number;
    }>;
    getPaymentById(id: string): Promise<void>;
    refundPayment(id: string): Promise<void>;
    getSubscriptions(page?: number, limit?: number, search?: string, status?: string): Promise<{
        subscriptions: any[];
        total: number;
        totalPages: number;
    }>;
    getSubscriptionById(id: string): Promise<void>;
    cancelSubscription(id: string): Promise<void>;
    renewSubscription(id: string): Promise<void>;
    getAnalytics(startDate?: string, endDate?: string, type?: string): Promise<{
        data: any[];
        summary: {};
    }>;
    generateReport(reportData: any): Promise<{
        id: string;
        status: string;
        downloadUrl: string;
    }>;
    getReports(page?: number, limit?: number, type?: string): Promise<{
        reports: any[];
        total: number;
        totalPages: number;
    }>;
    getSettings(): Promise<{
        siteName: string;
        maintenanceMode: boolean;
        allowRegistration: boolean;
    }>;
    updateSettings(settings: any): Promise<any>;
    getNotifications(page?: number, limit?: number, read?: boolean): Promise<{
        notifications: any[];
        total: number;
        totalPages: number;
    }>;
    markNotificationAsRead(id: string): Promise<{
        id: string;
        read: boolean;
    }>;
    sendNotification(notificationData: any): Promise<{
        id: string;
        sent: boolean;
    }>;
}
