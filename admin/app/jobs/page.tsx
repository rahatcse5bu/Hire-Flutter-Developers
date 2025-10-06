'use client'

import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract'
  salaryRange: string
  status: 'active' | 'paused' | 'closed'
  applications: number
  createdAt: string
  description?: string
  requirements?: string[]
  benefits?: string[]
  posted: string
  expires: string
  views: number
  featured: boolean
}

export default function JobsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'closed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for jobs
  const stats = {
    total: 1234,
    active: 856,
    paused: 234,
    closed: 144,
    featured: 45
  }

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Flutter Developer',
      company: 'TechCorp Inc',
      location: 'San Francisco, CA',
      type: 'full-time',
      salaryRange: '$120k - $150k',
      status: 'active',
      applications: 25,
      createdAt: '2024-01-15',
      posted: '2024-01-15',
      expires: '2024-02-15',
      views: 145,
      featured: true
    },
    {
      id: '2',
      title: 'Flutter Mobile Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'contract',
      salaryRange: '$80/hour',
      status: 'active',
      applications: 12,
      createdAt: '2024-01-10',
      posted: '2024-01-10',
      expires: '2024-02-10',
      views: 89,
      featured: false
    },
    {
      id: '3',
      title: 'Flutter App Developer',
      company: 'DevStudio',
      location: 'New York, NY',
      type: 'full-time',
      salaryRange: '$90k - $110k',
      status: 'paused',
      applications: 8,
      createdAt: '2024-01-08',
      posted: '2024-01-08',
      expires: '2024-02-08',
      views: 67,
      featured: false
    }
  ]

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
        <button className="admin-btn-primary">Add Job</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
          <p className="text-2xl font-bold text-green-600">{stats.active || 0}</p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Paused Jobs</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.paused || 0}</p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Closed Jobs</h3>
          <p className="text-2xl font-bold text-red-600">{stats.closed || 0}</p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Featured Jobs</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.featured || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'paused', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  filter === status 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className={`hover:bg-gray-50 ${job.featured ? 'bg-purple-50 border-l-4 border-purple-400' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        {job.featured && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Featured</span>}
                      </div>
                      <div className="text-sm text-gray-500">{job.location}</div>
                      <div className="text-xs text-gray-400">Posted: {job.posted}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.salaryRange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{job.applications} applications</div>
                      <div className="text-xs text-gray-500">{job.views} views</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className={`${new Date(job.expires) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                      {job.expires}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      {job.featured ? (
                        <button className="text-purple-600 hover:text-purple-900">Unfeature</button>
                      ) : (
                        <button className="text-purple-600 hover:text-purple-900">Feature</button>
                      )}
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </AdminLayout>
  )
}