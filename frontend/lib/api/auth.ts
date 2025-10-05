import { apiClient } from './client'
import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User 
} from './types'

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest) {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    
    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
    }
    
    return response
  }

  // Register user
  static async register(userData: RegisterRequest) {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData)
    
    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
    }
    
    return response
  }

  // Logout user
  static async logout() {
    const response = await apiClient.post('/auth/logout')
    apiClient.clearToken()
    return response
  }

  // Get current user profile
  static async getCurrentUser() {
    return apiClient.get<User>('/auth/profile')
  }

  // Refresh token
  static async refreshToken() {
    const response = await apiClient.post<{ token: string }>('/auth/refresh')
    
    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
    }
    
    return response
  }

  // Request password reset
  static async requestPasswordReset(email: string) {
    return apiClient.post('/auth/forgot-password', { email })
  }

  // Reset password
  static async resetPassword(token: string, password: string) {
    return apiClient.post('/auth/reset-password', { token, password })
  }

  // Verify email
  static async verifyEmail(token: string) {
    return apiClient.post('/auth/verify-email', { token })
  }

  // Resend verification email
  static async resendVerification() {
    return apiClient.post('/auth/resend-verification')
  }
}