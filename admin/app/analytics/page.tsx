'use client'

import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  // Mock data for analytics
  const overview = {
    totalRevenue: 125430,
    revenueGrowth: 12.5,
    totalUsers: 12543,
    userGrowth: 8.2,
    totalJobs: 1234,
    jobGrowth: 15.3,
    totalSubscriptions: 856,
    subscriptionGrowth: 18.7,
    totalApplications: 4567,
    applicationGrowth: 23.1
  }

  const charts = {
    revenueChart: [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 }
    ]
  }

  const topPerformers = {
    companies: [
      { name: 'TechCorp Inc', jobs: 45, applications: 1230 },
      { name: 'StartupXYZ', jobs: 32, applications: 890 },
      { name: 'DevCompany', jobs: 28, applications: 756 },
      { name: 'InnovateLabs', jobs: 24, applications: 645 },
      { name: 'CodeCraft', jobs: 19, applications: 523 }
    ],
    skills: [
      { name: 'Flutter', demand: 95, jobs: 234 },
      { name: 'Dart', demand: 88, jobs: 198 },
      { name: 'Firebase', demand: 76, jobs: 156 },
      { name: 'REST APIs', demand: 71, jobs: 142 },
      { name: 'State Management', demand: 68, jobs: 134 }
    ]
  }

  const subscriptionDistribution = {
    plans: [
      { name: 'Basic', count: 450, percentage: 52.6 },
      { name: 'Professional', count: 320, percentage: 37.4 },
      { name: 'Enterprise', count: 86, percentage: 10.0 }
    ]
  }

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ]

  const userGrowthData = [
    { month: 'Jan', developers: 2100, recruiters: 890 },
    { month: 'Feb', developers: 2400, recruiters: 1020 },
    { month: 'Mar', developers: 2200, recruiters: 980 },
    { month: 'Apr', developers: 2800, recruiters: 1150 },
    { month: 'May', developers: 2600, recruiters: 1080 },
    { month: 'Jun', developers: 3100, recruiters: 1250 }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeRange === range 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            ${overview.totalRevenue?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +{overview.revenueGrowth || 0}% this month
          </p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">
            {overview.totalUsers?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">+{overview.userGrowth || 0}% this month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-blue-600">
            {overview.totalJobs?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">+{overview.jobGrowth || 0}% this month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Subscriptions</h3>
          <p className="text-3xl font-bold text-purple-600">
            {overview.totalSubscriptions?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">+{overview.subscriptionGrowth || 0}% this month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Applications</h3>
          <p className="text-3xl font-bold text-orange-600">
            {overview.totalApplications?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">+{overview.applicationGrowth || 0}% this month</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-4">Revenue Chart</div>
            <div className="flex justify-center gap-4 text-sm">
              {charts.revenueChart?.map(item => (
                <div key={item.month} className="text-center">
                  <div className="font-medium">{item.month}</div>
                  <div className="text-green-600">${item.revenue?.toLocaleString()}</div>
                </div>
              )) || <div className="text-gray-400">No revenue data available</div>}
            </div>
          </div>
        </div>
      </div>

      {/* User Growth and Subscription Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-500 mb-4">User Growth Chart</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-blue-600 font-medium">Developers</div>
                  <div>3,100 (+15.4%)</div>
                </div>
                <div>
                  <div className="text-green-600 font-medium">Recruiters</div>
                  <div>1,250 (+15.7%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Distribution</h3>
          <div className="space-y-4">
            {subscriptionDistribution.plans?.map((plan, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${
                    plan.name === 'Basic' ? 'bg-green-500' :
                    plan.name === 'Professional' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}></div>
                  <span className="font-medium">{plan.name} Plan</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{plan.count}</div>
                  <div className="text-sm text-gray-500">{plan.percentage}%</div>
                </div>
              </div>
            )) || <div className="text-gray-400">No subscription data available</div>}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Hiring Companies</h3>
          <div className="space-y-3">
            {topPerformers.companies?.map((company, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-500">{company.jobs} jobs posted</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">{company.applications}</div>
                  <div className="text-sm text-gray-500">applications</div>
                </div>
              </div>
            )) || <div className="text-gray-400">No company data available</div>}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Skills</h3>
          <div className="space-y-3">
            {topPerformers.skills?.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{skill.name}</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">{skill.jobs}</div>
                  <div className="text-sm text-gray-500">jobs</div>
                </div>
              </div>
            )) || <div className="text-gray-400">No skills data available</div>}
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  )
}