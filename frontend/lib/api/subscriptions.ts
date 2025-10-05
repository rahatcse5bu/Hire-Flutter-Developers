import { apiClient } from './client'
import type { Subscription, Payment } from './types'

export class SubscriptionService {
  // Get current user's subscription
  static async getCurrentSubscription() {
    return apiClient.get<Subscription>('/subscriptions/current')
  }

  // Get available subscription plans
  static async getPlans() {
    return apiClient.get<{
      id: string
      name: string
      price: number
      currency: string
      interval: 'month' | 'year'
      features: string[]
      popular?: boolean
    }[]>('/subscriptions/plans')
  }

  // Subscribe to a plan
  static async subscribe(planId: string, paymentMethodId: string) {
    return apiClient.post<{
      subscription: Subscription
      clientSecret?: string
    }>('/subscriptions/subscribe', {
      planId,
      paymentMethodId
    })
  }

  // Cancel subscription
  static async cancelSubscription() {
    return apiClient.post('/subscriptions/cancel')
  }

  // Resume subscription
  static async resumeSubscription() {
    return apiClient.post('/subscriptions/resume')
  }

  // Update subscription plan
  static async updateSubscription(planId: string) {
    return apiClient.put<Subscription>('/subscriptions/update', { planId })
  }

  // Get subscription history
  static async getSubscriptionHistory() {
    return apiClient.get<Subscription[]>('/subscriptions/history')
  }
}

export class PaymentService {
  // Get payment methods
  static async getPaymentMethods() {
    return apiClient.get<{
      id: string
      type: string
      card?: {
        last4: string
        brand: string
        expMonth: number
        expYear: number
      }
    }[]>('/payments/methods')
  }

  // Add payment method
  static async addPaymentMethod(paymentMethodId: string) {
    return apiClient.post('/payments/methods', { paymentMethodId })
  }

  // Remove payment method
  static async removePaymentMethod(paymentMethodId: string) {
    return apiClient.delete(`/payments/methods/${paymentMethodId}`)
  }

  // Set default payment method
  static async setDefaultPaymentMethod(paymentMethodId: string) {
    return apiClient.post('/payments/methods/default', { paymentMethodId })
  }

  // Get payment history
  static async getPaymentHistory() {
    return apiClient.get<Payment[]>('/payments/history')
  }

  // Get payment details
  static async getPayment(paymentId: string) {
    return apiClient.get<Payment>(`/payments/${paymentId}`)
  }

  // Create payment intent for job posting
  static async createJobPostingPayment(jobId: string, type: 'basic' | 'featured' | 'urgent') {
    return apiClient.post<{
      clientSecret: string
      amount: number
    }>('/payments/job-posting', { jobId, type })
  }

  // Process one-time payment
  static async processPayment(paymentData: {
    amount: number
    currency: string
    paymentMethodId: string
    type: string
    description?: string
  }) {
    return apiClient.post<Payment>('/payments/process', paymentData)
  }
}