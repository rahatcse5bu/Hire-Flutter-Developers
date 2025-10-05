'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { SearchBar } from '../../components/search/SearchBar'
import { Button } from '../../components/ui/Button'
import Link from 'next/link'
import { JobService } from '../../lib/api/jobs'
import type { Job } from '../../lib/api/types'

interface JobFilters {
  page: number
  limit: number
  search: string
  location: string
  type: string
  experienceLevel: string
  remoteType: string
}

export default function JobsPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    location: '',
    type: '',
    experienceLevel: '',
    remoteType: ''
  })

  const { data, isLoading, error } = useQuery(
    ['jobs', filters],
    () => JobService.searchJobs(filters),
    {
      keepPreviousData: true,
    }
  )

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Flutter Developer Jobs</h1>
          <p className="mt-2 text-gray-600">Find your dream Flutter development opportunity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar />
          
          {/* Filter Options */}
          <div className="mt-6 flex flex-wrap gap-4">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Job Types</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>

            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>

            <select
              value={filters.remoteType}
              onChange={(e) => handleFilterChange('remoteType', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Work Types</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on_site">On-Site</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Refine Results</h3>
              
              {/* Additional filters can go here */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Popular Skills
                  </label>
                  <div className="space-y-2">
                    {['Flutter', 'Dart', 'Firebase', 'REST API', 'GraphQL', 'State Management'].map(skill => (
                      <label key={skill} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-600">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Failed to load jobs</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : data?.data?.data?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No jobs found matching your criteria</p>
                <Button onClick={() => setFilters({ page: 1, limit: 20, search: '', location: '', type: '', experienceLevel: '', remoteType: '' })}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing {((filters.page - 1) * filters.limit) + 1} - {Math.min(filters.page * filters.limit, data?.total || 0)} of {data?.total || 0} jobs
                  </p>
                </div>

                {/* Job cards */}
                <div className="space-y-4 mb-8">
                  {data?.jobs?.map((job) => (
                    <div key={job._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link href={`/jobs/${job._id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-1">
                              {job.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              📍 {job.location}
                            </span>
                            <span className="flex items-center">
                              💼 {job.type.replace('_', ' ')}
                            </span>
                            <span className="flex items-center">
                              ⭐ {job.experienceLevel} level
                            </span>
                            <span className="flex items-center">
                              💰 {job.currency} {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.requiredSkills?.slice(0, 4).map(skill => (
                              <span key={skill} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {job.requiredSkills?.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{job.requiredSkills.length - 4} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{job.applicationCount} applications</span>
                            <span>{job.viewCount} views</span>
                            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="ml-4">
                          <Link href={`/jobs/${job._id}`}>
                            <Button size="sm">Apply Now</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {data?.totalPages && data.totalPages > 1 && (
                  <div className="flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page <= 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                        const page = i + Math.max(1, filters.page - 2)
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-lg border ${
                              page === filters.page
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                      
                      <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page >= (data?.totalPages || 1)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}