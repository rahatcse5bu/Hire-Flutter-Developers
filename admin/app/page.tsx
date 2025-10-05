export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">12,543</p>
          <p className="text-sm text-gray-500 mt-1">+5.2% from last month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-primary-600">1,234</p>
          <p className="text-sm text-gray-500 mt-1">+12.5% from last month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$45,678</p>
          <p className="text-sm text-gray-500 mt-1">+8.1% from last month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscriptions</h3>
          <p className="text-3xl font-bold text-primary-600">856</p>
          <p className="text-sm text-gray-500 mt-1">+15.3% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">User {i}</p>
                  <p className="text-xs text-gray-500">Joined 2 hours ago</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Developer
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Jobs</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  💼
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Flutter Developer Job {i}</p>
                  <p className="text-xs text-gray-500">Posted by Company {i}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Active
                </span>
              </div>
            ))}
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
  )
}