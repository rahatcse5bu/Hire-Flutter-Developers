'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim())
    }
    if (location.trim()) {
      params.append('location', location.trim())
    }
    
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="sr-only">
            Job title, skills, or company
          </label>
          <input
            id="search"
            type="text"
            placeholder="Job title, skills, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="Location (city, state, country)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <Button type="submit" size="lg" className="w-full md:w-auto">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Jobs
        </Button>
      </div>
      
      {/* Quick filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 mr-2">Popular:</span>
        {['Remote', 'Senior', 'Full-time', 'Startup', 'Enterprise'].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setSearchTerm(filter)
            }}
            className="px-3 py-1 text-sm text-primary-600 bg-primary-50 rounded-full hover:bg-primary-100 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>
    </form>
  )
}