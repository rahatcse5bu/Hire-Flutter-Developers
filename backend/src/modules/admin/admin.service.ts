import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Job } from '../jobs/schemas/job.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  // Dashboard Statistics
  async getDashboardStats() {
    const [totalUsers, totalJobs, activeUsers, activeJobs] = await Promise.all([
      this.userModel.countDocuments(),
      this.jobModel.countDocuments(),
      this.userModel.countDocuments({ isActive: true }),
      this.jobModel.countDocuments({ status: 'active' }),
    ]);

    // Calculate growth (mock data for now)
    return {
      totalUsers,
      totalJobs,
      totalRevenue: 45678, // Mock data
      totalSubscriptions: 856, // Mock data
      userGrowth: 5.2,
      jobGrowth: 12.5,
      revenueGrowth: 8.1,
      subscriptionGrowth: 15.3,
    };
  }

  // User Management
  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) {
    const { page = 1, limit = 20, search, role } = params;
    const skip = (page - 1) * limit;

    const filter: any = {};
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

  async getUserById(id: string) {
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

  async updateUser(id: string, updateData: any) {
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

  async deleteUser(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async toggleUserStatus(id: string) {
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

  // Job Management
  async getJobs(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) {
    const { page = 1, limit = 20, search, status } = params;
    const skip = (page - 1) * limit;

    const filter: any = {};
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
        applicationsCount: 0, // Mock for now
      })),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getJobById(id: string) {
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
      applicationsCount: 0, // Mock for now
    };
  }

  async updateJobStatus(id: string, status: string) {
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
      applicationsCount: 0, // Mock for now
    };
  }

  async deleteJob(id: string) {
    const result = await this.jobModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Job not found');
    }
    return { message: 'Job deleted successfully' };
  }

  // Mock implementations for other methods
  async getPayments(params: any) {
    return {
      payments: [],
      total: 0,
      totalPages: 0,
    };
  }

  async getPaymentById(id: string) {
    throw new Error('Payment not found');
  }

  async refundPayment(id: string) {
    throw new Error('Payment not found');
  }

  async getSubscriptions(params: any) {
    return {
      subscriptions: [],
      total: 0,
      totalPages: 0,
    };
  }

  async getSubscriptionById(id: string) {
    throw new Error('Subscription not found');
  }

  async cancelSubscription(id: string) {
    throw new Error('Subscription not found');
  }

  async renewSubscription(id: string) {
    throw new Error('Subscription not found');
  }

  async getAnalytics(params: any) {
    return {
      data: [],
      summary: {},
    };
  }

  async generateReport(reportData: any) {
    return {
      id: 'report-1',
      status: 'generated',
      downloadUrl: '/reports/report-1.pdf',
    };
  }

  async getReports(params: any) {
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

  async updateSettings(settings: any) {
    return settings;
  }

  async getNotifications(params: any) {
    return {
      notifications: [],
      total: 0,
      totalPages: 0,
    };
  }

  async markNotificationAsRead(id: string) {
    return {
      id,
      read: true,
    };
  }

  async sendNotification(notificationData: any) {
    return {
      id: 'notification-1',
      sent: true,
    };
  }
}