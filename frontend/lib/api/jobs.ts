import { apiClient } from './client'
import type { 
  Job, 
  JobFilter, 
  PaginatedResponse, 
  JobApplication 
} from './types'

export class JobService {
  // Get all jobs with filters
  static async getJobs(filters: JobFilter = {}) {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, item))
        } else {
          queryParams.append(key, String(value))
        }
      }
    })

    const endpoint = `/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return apiClient.get<PaginatedResponse<Job>>(endpoint)
  }

  // Get single job by ID
  static async getJob(id: string) {
    return apiClient.get<Job>(`/jobs/${id}`)
  }

  // Create new job (recruiter only)
  static async createJob(jobData: Partial<Job>) {
    return apiClient.post<Job>('/jobs', jobData)
  }

  // Update job (recruiter only)
  static async updateJob(id: string, jobData: Partial<Job>) {
    return apiClient.put<Job>(`/jobs/${id}`, jobData)
  }

  // Delete job (recruiter only)
  static async deleteJob(id: string) {
    return apiClient.delete(`/jobs/${id}`)
  }

  // Get jobs created by current user (recruiter)
  static async getMyJobs() {
    return apiClient.get<PaginatedResponse<Job>>('/jobs/my-jobs')
  }

  // Apply to job (developer only)
  static async applyToJob(jobId: string, applicationData: {
    coverLetter: string
    expectedSalary?: number
    availableFrom?: string
    attachments?: string[]
  }) {
    return apiClient.post<JobApplication>(`/jobs/${jobId}/apply`, applicationData)
  }

  // Get job applications for a specific job (recruiter only)
  static async getJobApplications(jobId: string) {
    return apiClient.get<PaginatedResponse<JobApplication>>(`/jobs/${jobId}/applications`)
  }

  // Get user's job applications (developer only)
  static async getMyApplications() {
    return apiClient.get<PaginatedResponse<JobApplication>>('/jobs/my-applications')
  }

  // Update application status (recruiter only)
  static async updateApplicationStatus(applicationId: string, status: string) {
    return apiClient.patch<JobApplication>(`/applications/${applicationId}`, { status })
  }

  // Get featured jobs
  static async getFeaturedJobs() {
    return apiClient.get<Job[]>('/jobs/featured')
  }

  // Get urgent hiring jobs
  static async getUrgentJobs() {
    return apiClient.get<Job[]>('/jobs/urgent')
  }

  // Search jobs
  static async searchJobs(filters: JobFilter = {}) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value))
      }
    })
    const queryString = params.toString()
    const endpoint = queryString ? `/jobs/search?${queryString}` : '/jobs/search'
    return apiClient.get<PaginatedResponse<Job>>(endpoint)
  }

  // Get job statistics
  static async getJobStats() {
    return apiClient.get<{
      totalJobs: number
      activeJobs: number
      totalApplications: number
      avgApplicationsPerJob: number
    }>('/jobs/stats')
  }
}

