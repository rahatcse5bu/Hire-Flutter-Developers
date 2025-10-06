'use client'

import AdminLayout from '../components/AdminLayout'

export default function AdminDashboard() {
  // Mock data for dashboard stats
  const stats = {
    totalUsers: 12547,
    userGrowth: 12.5,
    totalJobs: 3468,
    jobGrowth: 8.3,
    totalRevenue: 87543,
    revenueGrowth: 15.7,
    totalSubscriptions: 2156,
    subscriptionGrowth: 9.2
  }

  const recentUsers = {
    users: [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        role: 'developer',
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        role: 'recruiter',
        isActive: true,
        createdAt: '2024-01-14T15:30:00Z'
      },
      {
        id: '3',
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        role: 'developer',
        isActive: true,
        createdAt: '2024-01-13T09:20:00Z'
      },
      {
        id: '4',
        name: 'David Brown',
        email: 'david.brown@email.com',
        role: 'recruiter',
        isActive: false,
        createdAt: '2024-01-12T14:45:00Z'
      },
      {
        id: '5',
        name: 'Lisa Garcia',
        email: 'lisa.garcia@email.com',
        role: 'developer',
        isActive: true,
        createdAt: '2024-01-11T11:10:00Z'
      }
    ]
  }

  const recentJobs = {
    jobs: [
      {
        id: '1',
        title: 'Senior Flutter Developer',
        company: 'TechCorp Inc',
        status: 'active',
        createdAt: '2024-01-15T08:00:00Z'
      },
      {
        id: '2',
        title: 'Flutter Mobile App Developer',
        company: 'StartupXYZ',
        status: 'active',
        createdAt: '2024-01-14T12:30:00Z'
      },
      {
        id: '3',
        title: 'Lead Flutter Engineer',
        company: 'MegaCorp',
        status: 'closed',
        createdAt: '2024-01-13T16:45:00Z'
      },
      {
        id: '4',
        title: 'Flutter Developer - Remote',
        company: 'RemoteWork Co',
        status: 'active',
        createdAt: '2024-01-12T10:15:00Z'
      },
      {
        id: '5',
        title: 'Junior Flutter Developer',
        company: 'GrowthTech',
        status: 'paused',
        createdAt: '2024-01-11T13:20:00Z'
      }
    ]
  }

  const statsLoading = false

  return (
    <AdminLayout>
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
          {statsLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-primary-600">
                {stats?.totalUsers?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {stats?.userGrowth > 0 ? '+' : ''}{stats?.userGrowth || 0}% from last month
              </p>
            </>
          )}
        </div>
        
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
          {statsLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-primary-600">
                {stats?.totalJobs?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {stats?.jobGrowth > 0 ? '+' : ''}{stats?.jobGrowth || 0}% from last month
              </p>
            </>
          )}
        </div>
        
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
          {statsLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-green-600">
                ${stats?.totalRevenue?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {stats?.revenueGrowth > 0 ? '+' : ''}{stats?.revenueGrowth || 0}% from last month
              </p>
            </>
          )}
        </div>
        
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscriptions</h3>
          {statsLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-primary-600">
                {stats?.totalSubscriptions?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {stats?.subscriptionGrowth > 0 ? '+' : ''}{stats?.subscriptionGrowth || 0}% from last month
              </p>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers?.users?.length > 0 ? (
              recentUsers.users.map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No recent users</div>
            )}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Jobs</h3>
          <div className="space-y-3">
            {recentJobs?.jobs?.length > 0 ? (
              recentJobs.jobs.map(job => (
                <div key={job.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    💼
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">Posted by {job.company}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    job.status === 'active' 
                      ? 'bg-blue-100 text-blue-800'
                      : job.status === 'closed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No recent jobs</div>
            )}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Growth</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart will be rendered here</p>
        </div>
      </div>
    </div>
    </AdminLayout>
  )
}