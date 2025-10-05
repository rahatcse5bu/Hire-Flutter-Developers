'use client'

import { useState } from 'react'

interface Subscription {
  id: string
  userId: string
  userName: string
  userEmail: string
  plan: 'basic' | 'professional' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  startDate: string
  endDate: string
  amount: number
  billingCycle: 'monthly' | 'yearly'
  autoRenew: boolean
}

interface PlanStats {
  name: string
  count: number
  revenue: number
  growth: number
}

export default function SubscriptionsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'cancelled' | 'expired' | 'paused'>('all')
  const [planFilter, setPlanFilter] = useState<'all' | 'basic' | 'professional' | 'enterprise'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with API calls
  const planStats: PlanStats[] = [
    { name: 'Basic', count: 450, revenue: 13450, growth: 8.2 },
    { name: 'Professional', count: 320, revenue: 28800, growth: 15.6 },
    { name: 'Enterprise', count: 86, revenue: 51600, growth: 23.1 }
  ]

  const subscriptions: Subscription[] = [
    {
      id: '1',
      userId: 'usr_1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      plan: 'professional',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      amount: 89.99,
      billingCycle: 'yearly',
      autoRenew: true
    },
    {
      id: '2',
      userId: 'usr_2',
      userName: 'Jane Smith',
      userEmail: 'jane@company.com',
      plan: 'basic',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      amount: 29.99,
      billingCycle: 'monthly',
      autoRenew: true
    },
    {
      id: '3',
      userId: 'usr_3',
      userName: 'TechCorp Inc',
      userEmail: 'admin@techcorp.com',
      plan: 'enterprise',
      status: 'active',
      startDate: '2023-12-01',
      endDate: '2024-12-01',
      amount: 599.99,
      billingCycle: 'yearly',
      autoRenew: false
    },
    {
      id: '4',
      userId: 'usr_4',
      userName: 'Dev Studio',
      userEmail: 'contact@devstudio.com',
      plan: 'professional',
      status: 'cancelled',
      startDate: '2023-11-01',
      endDate: '2024-01-20',
      amount: 89.99,
      billingCycle: 'yearly',
      autoRenew: false
    }
  ]

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesStatus = filter === 'all' || sub.status === filter
    const matchesPlan = planFilter === 'all' || sub.plan === planFilter
    const matchesSearch = sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPlan && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'professional': return 'bg-purple-100 text-purple-800'
      case 'enterprise': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalSubscriptions = subscriptions.length
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length
  const totalMRR = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.billingCycle === 'monthly' ? s.amount : s.amount / 12), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <div className="flex gap-2">
          <button className="admin-btn-secondary">Export Data</button>
          <button className="admin-btn-primary">Create Subscription</button>
        </div>
      </div>

      {/* Subscription Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Total Subscriptions</h3>
          <p className="text-2xl font-bold text-primary-600">{totalSubscriptions}</p>
          <p className="text-sm text-gray-500 mt-1">+12.5% from last month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Active Subscriptions</h3>
          <p className="text-2xl font-bold text-green-600">{activeSubscriptions}</p>
          <p className="text-sm text-gray-500 mt-1">{((activeSubscriptions/totalSubscriptions)*100).toFixed(1)}% active rate</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Monthly Recurring Revenue</h3>
          <p className="text-2xl font-bold text-green-600">${totalMRR.toFixed(0)}</p>
          <p className="text-sm text-gray-500 mt-1">+18.3% from last month</p>
        </div>
        
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Churn Rate</h3>
          <p className="text-2xl font-bold text-red-600">2.4%</p>
          <p className="text-sm text-gray-500 mt-1">-0.8% from last month</p>
        </div>
      </div>

      {/* Plan Statistics */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planStats.map((plan) => (
            <div key={plan.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{plan.name} Plan</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getPlanColor(plan.name.toLowerCase())}`}>
                  {plan.name}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subscribers:</span>
                  <span className="font-medium">{plan.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Revenue:</span>
                  <span className="font-medium">${plan.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Growth:</span>
                  <span className="font-medium text-green-600">+{plan.growth}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              {(['all', 'active', 'cancelled', 'expired', 'paused'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm capitalize ${
                    filter === status 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {(['all', 'basic', 'professional', 'enterprise'] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => setPlanFilter(plan)}
                  className={`px-3 py-2 rounded-lg text-sm capitalize ${
                    planFilter === plan 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auto Renew
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
                      <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(subscription.plan)}`}>
                      {subscription.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {subscription.billingCycle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${subscription.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(subscription.startDate).toLocaleDateString()}</div>
                    <div>to {new Date(subscription.endDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      subscription.autoRenew 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscription.autoRenew ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                      {subscription.status === 'active' && (
                        <>
                          <button className="text-yellow-600 hover:text-yellow-900">Pause</button>
                          <button className="text-red-600 hover:text-red-900">Cancel</button>
                        </>
                      )}
                      {subscription.status === 'paused' && (
                        <button className="text-green-600 hover:text-green-900">Resume</button>
                      )}
                      {subscription.status === 'expired' && (
                        <button className="text-blue-600 hover:text-blue-900">Renew</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Trends</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-500 mb-4">Subscription Growth Chart</div>
              <div className="text-sm">
                <div className="text-green-600 font-bold">+15.3%</div>
                <div>Monthly Growth</div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Churn Analysis</h3>
          <div className="space-y-3">
            {[
              { reason: 'Price too high', percentage: 35 },
              { reason: 'Missing features', percentage: 28 },
              { reason: 'Found better alternative', percentage: 22 },
              { reason: 'No longer needed', percentage: 15 }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.reason}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}