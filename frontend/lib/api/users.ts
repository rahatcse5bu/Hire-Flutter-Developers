import { apiClient } from './client'
import type { 
  User, 
  DeveloperProfile, 
  RecruiterProfile 
} from './types'

export class UserService {
  // Get user profile
  static async getProfile(userId?: string) {
    const endpoint = userId ? `/users/${userId}` : '/users/profile'
    return apiClient.get<User>(endpoint)
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>) {
    return apiClient.put<User>('/users/profile', userData)
  }

  // Get developer profile
  static async getDeveloperProfile(userId?: string) {
    const endpoint = userId ? `/users/${userId}/developer-profile` : '/users/developer-profile'
    return apiClient.get<DeveloperProfile>(endpoint)
  }

  // Update developer profile
  static async updateDeveloperProfile(profileData: Partial<DeveloperProfile>) {
    return apiClient.put<DeveloperProfile>('/users/developer-profile', profileData)
  }

  // Get recruiter profile
  static async getRecruiterProfile(userId?: string) {
    const endpoint = userId ? `/users/${userId}/recruiter-profile` : '/users/recruiter-profile'
    return apiClient.get<RecruiterProfile>(endpoint)
  }

  // Update recruiter profile
  static async updateRecruiterProfile(profileData: Partial<RecruiterProfile>) {
    return apiClient.put<RecruiterProfile>('/users/recruiter-profile', profileData)
  }

  // Search developers
  static async searchDevelopers(filters: {
    skills?: string[]
    experience?: string
    location?: string
    hourlyRate?: { min?: number; max?: number }
    availability?: string
    page?: number
    limit?: number
  } = {}) {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, item))
        } else if (typeof value === 'object' && key === 'hourlyRate') {
          if (value.min) queryParams.append('hourlyRateMin', String(value.min))
          if (value.max) queryParams.append('hourlyRateMax', String(value.max))
        } else {
          queryParams.append(key, String(value))
        }
      }
    })

    const endpoint = `/users/developers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return apiClient.get<{ data: User[]; total: number }>(endpoint)
  }

  // Upload profile picture
  static async uploadProfilePicture(file: File) {
    const formData = new FormData()
    formData.append('profilePicture', file)

    const response = await fetch(`${apiClient['baseURL']}/users/profile-picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiClient['token']}`
      },
      body: formData
    })

    return response.json()
  }

  // Delete account
  static async deleteAccount() {
    return apiClient.delete('/users/account')
  }

  // Change password
  static async changePassword(currentPassword: string, newPassword: string) {
    return apiClient.post('/users/change-password', {
      currentPassword,
      newPassword
    })
  }

  // Get user statistics
  static async getUserStats() {
    return apiClient.get<{
      totalApplications: number
      interviewsScheduled: number
      offersReceived: number
      hireRate: number
    }>('/users/stats')
  }
}