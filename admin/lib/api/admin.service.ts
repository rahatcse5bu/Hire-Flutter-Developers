import { ApiClient } from './client'

export interface AdminStats {
  totalUsers: number
  totalJobs: number
  totalRevenue: number
  totalSubscriptions: number
  userGrowth: number
  jobGrowth: number
  revenueGrowth: number
  subscriptionGrowth: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  isActive: boolean
}

export interface AdminJob {
  id: string
  title: string
  company: string
  status: string
  createdAt: string
  applicationsCount: number
}

export interface AdminPayment {
  id: string
  userId: string
  userName: string
  amount: number
  currency: string
  status: string
  createdAt: string
  description: string
}

export interface AdminSubscription {
  id: string
  userId: string
  userName: string
  planName: string
  status: string
  startDate: string
  endDate: string
  amount: number
}

class AdminService {
  private client = new ApiClient()

  // Dashboard Stats
  async getDashboardStats(): Promise<AdminStats> {
    return this.client.get('/api/v1/admin/stats')
  }

  // Users Management
  async getUsers(params?: {
    page?: number
    limit?: number
    search?: string
    role?: string
  }): Promise<{ users: AdminUser[], total: number, totalPages: number }> {
    return this.client.get('/api/v1/admin/users', { params })
  }

  async getUserById(id: string): Promise<AdminUser> {
    return this.client.get(`/api/v1/admin/users/${id}`)
  }

  async updateUser(id: string, data: Partial<AdminUser>): Promise<AdminUser> {
    return this.client.put(`/api/v1/admin/users/${id}`, data)
  }

  async deleteUser(id: string): Promise<void> {
    return this.client.delete(`/api/v1/admin/users/${id}`)
  }

  async toggleUserStatus(id: string): Promise<AdminUser> {
    return this.client.patch(`/api/v1/admin/users/${id}/toggle-status`)
  }

  // Jobs Management
  async getJobs(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }): Promise<{ jobs: AdminJob[], total: number, totalPages: number }> {
    return this.client.get('/api/v1/admin/jobs', { params })
  }

  async getJobById(id: string): Promise<AdminJob> {
    return this.client.get(`/api/v1/admin/jobs/${id}`)
  }

  async updateJobStatus(id: string, status: string): Promise<AdminJob> {
    return this.client.patch(`/api/v1/admin/jobs/${id}/status`, { status })
  }

  async deleteJob(id: string): Promise<void> {
    return this.client.delete(`/api/v1/admin/jobs/${id}`)
  }

  // Payments Management
  async getPayments(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }): Promise<{ payments: AdminPayment[], total: number, totalPages: number }> {
    return this.client.get('/api/v1/admin/payments', { params })
  }

  async getPaymentById(id: string): Promise<AdminPayment> {
    return this.client.get(`/api/v1/admin/payments/${id}`)
  }

  async refundPayment(id: string): Promise<AdminPayment> {
    return this.client.post(`/api/v1/admin/payments/${id}/refund`)
  }

  // Subscriptions Management
  async getSubscriptions(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }): Promise<{ subscriptions: AdminSubscription[], total: number, totalPages: number }> {
    return this.client.get('/api/v1/admin/subscriptions', { params })
  }

  async getSubscriptionById(id: string): Promise<AdminSubscription> {
    return this.client.get(`/api/v1/admin/subscriptions/${id}`)
  }

  async cancelSubscription(id: string): Promise<AdminSubscription> {
    return this.client.post(`/api/v1/admin/subscriptions/${id}/cancel`)
  }

  async renewSubscription(id: string): Promise<AdminSubscription> {
    return this.client.post(`/api/v1/admin/subscriptions/${id}/renew`)
  }

  // Analytics
  async getAnalytics(params?: {
    startDate?: string
    endDate?: string
    type?: 'users' | 'jobs' | 'revenue' | 'subscriptions'
  }): Promise<any> {
    return this.client.get('/api/v1/admin/analytics', { params })
  }

  // Reports
  async generateReport(type: string, params?: any): Promise<any> {
    return this.client.post('/api/v1/admin/reports/generate', { type, params })
  }

  async getReports(params?: {
    page?: number
    limit?: number
    type?: string
  }): Promise<any> {
    return this.client.get('/api/v1/admin/reports', { params })
  }

  // Settings
  async getSettings(): Promise<any> {
    return this.client.get('/api/v1/admin/settings')
  }

  async updateSettings(settings: any): Promise<any> {
    return this.client.put('/api/v1/admin/settings', settings)
  }

  // Notifications
  async getNotifications(params?: {
    page?: number
    limit?: number
    read?: boolean
  }): Promise<any> {
    return this.client.get('/api/v1/admin/notifications', { params })
  }

  async markNotificationAsRead(id: string): Promise<any> {
    return this.client.patch(`/api/v1/admin/notifications/${id}/read`)
  }

  async sendNotification(data: {
    title: string
    message: string
    type: string
    userIds?: string[]
  }): Promise<any> {
    return this.client.post('/api/v1/admin/notifications/send', data)
  }
}

export const adminService = new AdminService()