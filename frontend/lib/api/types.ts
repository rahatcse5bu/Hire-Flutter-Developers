export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'developer' | 'recruiter'
  profilePicture?: string
  isVerified: boolean
  subscription?: {
    plan: string
    status: string
    expiresAt: string
  }
  profile?: DeveloperProfile | RecruiterProfile
  createdAt: string
  updatedAt: string
}

export interface DeveloperProfile {
  id: string
  userId: string
  title: string
  bio: string
  skills: string[]
  experience: number
  location: string
  hourlyRate: number
  availability: 'available' | 'busy' | 'not_available'
  portfolio: PortfolioItem[]
  education: Education[]
  workExperience: WorkExperience[]
  github?: string
  linkedin?: string
  website?: string
}

export interface RecruiterProfile {
  id: string
  userId: string
  companyName: string
  companySize: string
  industry: string
  website?: string
  description: string
  location: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
}

export interface Job {
  id: string
  title: string
  description: string
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  experience: 'junior' | 'mid' | 'senior' | 'lead'
  type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  location: string
  remote: boolean
  salaryMin?: number
  salaryMax?: number
  currency: string
  companyName: string
  companyLogo?: string
  status: 'active' | 'paused' | 'closed' | 'draft'
  featured: boolean
  urgentHiring: boolean
  applicationDeadline?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  applicationsCount?: number
}

export interface JobApplication {
  id: string
  jobId: string
  developerId: string
  status: 'pending' | 'reviewed' | 'interview' | 'offered' | 'hired' | 'rejected'
  coverLetter: string
  expectedSalary?: number
  availableFrom?: string
  attachments: string[]
  createdAt: string
  updatedAt: string
  job?: Job
  developer?: User
}

export interface Subscription {
  id: string
  userId: string
  plan: 'basic' | 'professional' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  amount: number
  currency: string
  paymentMethod: string
  createdAt: string
}

export interface Payment {
  id: string
  userId: string
  subscriptionId?: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  type: 'subscription' | 'job_posting' | 'featured_listing' | 'premium_test'
  paymentMethod: 'card' | 'paypal' | 'bank_transfer'
  transactionId?: string
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'developer' | 'recruiter'
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface JobFilter {
  search?: string
  skills?: string[]
  experience?: string
  type?: string
  location?: string
  remote?: boolean
  salaryMin?: number
  salaryMax?: number
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}