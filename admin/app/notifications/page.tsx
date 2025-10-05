'use client'

import { useState } from 'react'

interface Notification {
  id: string
  type: 'system' | 'user' | 'payment' | 'job' | 'security'
  title: string
  message: string
  recipient: 'all' | 'developers' | 'recruiters' | 'admins' | 'specific'
  recipients?: string[]
  status: 'draft' | 'sent' | 'scheduled' | 'failed'
  createdAt: string
  scheduledAt?: string
  sentAt?: string
  openRate?: number
  clickRate?: number
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'compose' | 'templates'>('notifications')
  const [filter, setFilter] = useState<'all' | 'sent' | 'scheduled' | 'draft' | 'failed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with API calls
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'system',
      title: 'Maintenance Scheduled',
      message: 'System maintenance scheduled for tonight from 2 AM to 4 AM EST.',
      recipient: 'all',
      status: 'sent',
      createdAt: '2024-01-15T10:30:00Z',
      sentAt: '2024-01-15T11:00:00Z',
      openRate: 85.2,
      clickRate: 12.3
    },
    {
      id: '2',
      type: 'user',
      title: 'Welcome to FlutterHire!',
      message: 'Thank you for joining our platform. Complete your profile to get started.',
      recipient: 'developers',
      status: 'sent',
      createdAt: '2024-01-14T09:15:00Z',
      sentAt: '2024-01-14T09:30:00Z',
      openRate: 92.7,
      clickRate: 34.8
    },
    {
      id: '3',
      type: 'job',
      title: 'New Flutter Jobs Available',
      message: 'Check out 15 new Flutter developer positions posted this week.',
      recipient: 'developers',
      status: 'scheduled',
      createdAt: '2024-01-15T16:00:00Z',
      scheduledAt: '2024-01-16T09:00:00Z'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Processing Update',
      message: 'We have updated our payment processing system for better security.',
      recipient: 'recruiters',
      status: 'draft',
      createdAt: '2024-01-15T14:20:00Z'
    }
  ]

  const [newNotification, setNewNotification] = useState({
    type: 'system' as const,
    title: '',
    message: '',
    recipient: 'all' as const,
    scheduleDate: '',
    scheduleTime: ''
  })

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.status === filter
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'bg-purple-100 text-purple-800'
      case 'user': return 'bg-blue-100 text-blue-800'
      case 'payment': return 'bg-green-100 text-green-800'
      case 'job': return 'bg-orange-100 text-orange-800'
      case 'security': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSendNotification = () => {
    // Implement send notification logic
    alert('Notification sent successfully!')
    setNewNotification({
      type: 'system',
      title: '',
      message: '',
      recipient: 'all',
      scheduleDate: '',
      scheduleTime: ''
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
        <button 
          onClick={() => setActiveTab('compose')}
          className="admin-btn-primary"
        >
          Compose Notification
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'notifications', label: 'All Notifications', icon: '📬' },
              { id: 'compose', label: 'Compose', icon: '✍️' },
              { id: 'templates', label: 'Templates', icon: '📄' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {/* Notifications List */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Sent</h3>
                  <p className="text-2xl font-bold text-green-600">1,247</p>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-gray-500">Scheduled</h3>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-gray-500">Avg Open Rate</h3>
                  <p className="text-2xl font-bold text-purple-600">78.5%</p>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-gray-500">Avg Click Rate</h3>
                  <p className="text-2xl font-bold text-orange-600">23.7%</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {(['all', 'sent', 'scheduled', 'draft', 'failed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
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

              {/* Notifications Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notification
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipients
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredNotifications.map((notification) => (
                      <tr key={notification.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{notification.message}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {notification.recipient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {notification.openRate && notification.clickRate ? (
                            <div>
                              <div>Open: {notification.openRate}%</div>
                              <div>Click: {notification.clickRate}%</div>
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button className="text-primary-600 hover:text-primary-900">View</button>
                            {notification.status === 'draft' && (
                              <>
                                <button className="text-green-600 hover:text-green-900">Send</button>
                                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              </>
                            )}
                            {notification.status === 'scheduled' && (
                              <button className="text-red-600 hover:text-red-900">Cancel</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Compose Notification */}
          {activeTab === 'compose' && (
            <div className="max-w-4xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Compose New Notification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type
                  </label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({...newNotification, type: e.target.value as any})}
                    className="admin-input"
                  >
                    <option value="system">System</option>
                    <option value="user">User</option>
                    <option value="payment">Payment</option>
                    <option value="job">Job</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    value={newNotification.recipient}
                    onChange={(e) => setNewNotification({...newNotification, recipient: e.target.value as any})}
                    className="admin-input"
                  >
                    <option value="all">All Users</option>
                    <option value="developers">Developers Only</option>
                    <option value="recruiters">Recruiters Only</option>
                    <option value="admins">Admins Only</option>
                    <option value="specific">Specific Users</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  className="admin-input"
                  placeholder="Enter notification title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  rows={6}
                  className="admin-input"
                  placeholder="Enter your notification message..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={newNotification.scheduleDate}
                    onChange={(e) => setNewNotification({...newNotification, scheduleDate: e.target.value})}
                    className="admin-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Time (Optional)
                  </label>
                  <input
                    type="time"
                    value={newNotification.scheduleTime}
                    onChange={(e) => setNewNotification({...newNotification, scheduleTime: e.target.value})}
                    className="admin-input"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleSendNotification}
                  className="admin-btn-primary"
                >
                  {newNotification.scheduleDate ? 'Schedule Notification' : 'Send Now'}
                </button>
                <button className="admin-btn-secondary">
                  Save as Draft
                </button>
                <button className="admin-btn-secondary">
                  Preview
                </button>
              </div>
            </div>
          )}

          {/* Templates */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
                <button className="admin-btn-primary">Create Template</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Welcome Message', type: 'user', usage: 245 },
                  { name: 'Job Alert', type: 'job', usage: 1203 },
                  { name: 'Payment Reminder', type: 'payment', usage: 89 },
                  { name: 'System Maintenance', type: 'system', usage: 12 },
                  { name: 'Security Alert', type: 'security', usage: 5 },
                  { name: 'Profile Completion', type: 'user', usage: 156 }
                ].map((template, index) => (
                  <div key={index} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      Used {template.usage} times
                    </div>
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900 text-sm">Use</button>
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}