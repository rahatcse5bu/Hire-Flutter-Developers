const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

class AdminService {
  private baseURL = `${API_BASE_URL}/api/v1/admin`

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        // Add auth header when available
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      ...options
    }

    try {
      const response = await fetch(url, defaultOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async getDashboardStats() {
    return this.makeRequest('/stats')
  }

  async getUsers() {
    return this.makeRequest('/users')
  }

  async getJobs() {
    return this.makeRequest('/jobs')
  }

  async getPayments() {
    return this.makeRequest('/payments')
  }

  async getSubscriptions() {
    return this.makeRequest('/subscriptions')
  }

  async getAnalytics() {
    return this.makeRequest('/analytics')
  }

  async getReports() {
    return this.makeRequest('/reports')
  }

  async getNotifications() {
    return this.makeRequest('/notifications')
  }

  async getSettings() {
    return this.makeRequest('/settings')
  }

  async updateSettings(settings: any) {
    return this.makeRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    })
  }

  async getUserById(id: string) {
    return this.makeRequest(`/users/${id}`)
  }

  async updateUser(id: string, userData: any) {
    return this.makeRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  async deleteUser(id: string) {
    return this.makeRequest(`/users/${id}`, {
      method: 'DELETE'
    })
  }

  async toggleUserStatus(id: string) {
    return this.makeRequest(`/users/${id}/toggle-status`, {
      method: 'PATCH'
    })
  }

  async getJobById(id: string) {
    return this.makeRequest(`/jobs/${id}`)
  }

  async updateJobStatus(id: string, status: string) {
    return this.makeRequest(`/jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })
  }

  async deleteJob(id: string) {
    return this.makeRequest(`/jobs/${id}`, {
      method: 'DELETE'
    })
  }

  async getPaymentById(id: string) {
    return this.makeRequest(`/payments/${id}`)
  }

  async refundPayment(id: string) {
    return this.makeRequest(`/payments/${id}/refund`, {
      method: 'POST'
    })
  }

  async getSubscriptionById(id: string) {
    return this.makeRequest(`/subscriptions/${id}`)
  }

  async cancelSubscription(id: string) {
    return this.makeRequest(`/subscriptions/${id}/cancel`, {
      method: 'POST'
    })
  }

  async renewSubscription(id: string) {
    return this.makeRequest(`/subscriptions/${id}/renew`, {
      method: 'POST'
    })
  }

  async generateReport(reportType: string, options: any) {
    return this.makeRequest('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ reportType, ...options })
    })
  }

  async markNotificationAsRead(id: string) {
    return this.makeRequest(`/notifications/${id}/read`, {
      method: 'PATCH'
    })
  }

  async sendNotification(notification: any) {
    return this.makeRequest('/notifications/send', {
      method: 'POST',
      body: JSON.stringify(notification)
    })
  }
}

export const adminService = new AdminService()
export default adminService