'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '../../components/ui/Button'
import Link from 'next/link'
import { UserService } from '../../lib/api/users'
import { JobService } from '../../lib/api/jobs'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'
import type { User, Job } from '../../lib/api/types'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  
  // Fetch user profile
  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useQuery(
    ['user-profile', user?.id],
    () => user?.id ? UserService.getProfile(user.id) : null,
    {
      enabled: !!user?.id,
    }
  )

  // Fetch user's job applications
  const { data: applications, isLoading: applicationsLoading } = useQuery(
    ['user-applications', user?.id],
    () => user?.id ? UserService.getApplications(user.id) : [],
    {
      enabled: !!user?.id && activeTab === 'applications',
    }
  )

  // Fetch user's saved jobs
  const { data: savedJobs, isLoading: savedJobsLoading } = useQuery(
    ['user-saved-jobs', user?.id],
    () => user?.id ? UserService.getSavedJobs(user.id) : [],
    {
      enabled: !!user?.id && activeTab === 'saved',
    }
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <Link href="/auth/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'applications', label: 'Applications', icon: '📄' },
    { id: 'saved', label: 'Saved Jobs', icon: '❤️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.data?.firstName || user.name} {profile?.data?.lastName}
              </h1>
              <p className="text-gray-600">{profile?.data?.email || user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-12 md:col-span-3">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9">
            {activeTab === 'profile' && (
              <ProfileTab profile={profile?.data} loading={profileLoading} onUpdate={refetchProfile} />
            )}
            {activeTab === 'applications' && (
              <ApplicationsTab applications={applications?.data} loading={applicationsLoading} />
            )}
            {activeTab === 'saved' && (
              <SavedJobsTab savedJobs={savedJobs?.data} loading={savedJobsLoading} />
            )}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab({ profile, loading, onUpdate }: { profile: User | undefined, loading: boolean, onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    skills: [] as string[],
    experience: '',
  })

  const handleSave = async () => {
    try {
      await UserService.updateProfile(formData)
      toast.success('Profile updated successfully!')
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="p-6">
        {!isEditing ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">About</h3>
              <p className="mt-1 text-gray-900">{profile?.bio || 'No bio added yet.'}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile?.skills?.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {skill}
                  </span>
                )) || (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-gray-900">{profile?.location || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                <p className="mt-1 text-gray-900">{profile?.experience || 'Not specified'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ApplicationsTab({ applications, loading }: { applications: any[] | undefined, loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {applications?.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">No applications yet.</p>
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          applications?.map((application) => (
            <div key={application.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{application.job?.title}</h3>
                  <p className="text-gray-600">{application.job?.company}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Applied on {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                  application.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                  application.status === 'hired' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {application.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SavedJobsTab({ savedJobs, loading }: { savedJobs: Job[] | undefined, loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Saved Jobs</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {savedJobs?.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">No saved jobs yet.</p>
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          savedJobs?.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link href={`/jobs/${job.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-primary-600">{job.title}</h3>
                  </Link>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.requiredSkills?.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href={`/jobs/${job.id}`}>
                  <Button size="sm">View Job</Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive email updates about job matches</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Profile Visibility</h3>
              <p className="text-sm text-gray-500">Allow recruiters to find your profile</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}