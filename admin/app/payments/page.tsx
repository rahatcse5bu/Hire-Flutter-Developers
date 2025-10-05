'use client'

import { useState } from 'react'

interface Payment {
  id: string
  userId: string
  userName: string
  userEmail: string
  type: 'subscription' | 'job_posting' | 'featured_listing' | 'premium_test'
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  paymentMethod: 'card' | 'paypal' | 'bank_transfer'
  createdAt: string
  transactionId?: string
}

interface PaymentStats {
  totalRevenue: number
  monthlyRevenue: number
  totalTransactions: number
  successRate: number
  averageTransactionValue: number
}

export default function PaymentsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed' | 'refunded'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with API calls
  const stats: PaymentStats = {
    totalRevenue: 125430.50,
    monthlyRevenue: 18765.20,
    totalTransactions: 2847,
    successRate: 96.3,
    averageTransactionValue: 44.05
  }

  const payments: Payment[] = [
    {
      id: '1',
      userId: 'usr_1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      type: 'subscription',
      amount: 29.99,
      status: 'completed',
      paymentMethod: 'card',
      createdAt: '2024-01-15T10:30:00Z',
      transactionId: 'txn_abc123'
    },
    {
      id: '2',
      userId: 'usr_2',
      userName: 'TechCorp Inc',
      userEmail: 'hr@techcorp.com',
      type: 'job_posting',
      amount: 199.00,
      status: 'completed',
      paymentMethod: 'card',
      createdAt: '2024-01-15T09:15:00Z',
      transactionId: 'txn_def456'
    },
    {
      id: '3',
      userId: 'usr_3',
      userName: 'Jane Smith',
      userEmail: 'jane@company.com',
      type: 'featured_listing',
      amount: 99.00,
      status: 'pending',
      paymentMethod: 'paypal',
      createdAt: '2024-01-14T16:45:00Z'
    },
    {
      id: '4',
      userId: 'usr_4',
      userName: 'StartupXYZ',
      userEmail: 'payments@startupxyz.com',
      type: 'premium_test',
      amount: 49.99,
      status: 'failed',
      paymentMethod: 'card',
      createdAt: '2024-01-14T14:20:00Z'
    }
  ]

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'subscription': return 'Subscription'
      case 'job_posting': return 'Job Posting'
      case 'featured_listing': return 'Featured Listing'
      case 'premium_test': return 'Premium Test'
      default: return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <div className="flex gap-2">
          <button className="admin-btn-secondary">Export Data</button>
          <button className="admin-btn-primary">Process Refund</button>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ${stats.monthlyRevenue.toLocaleString()}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
          <p className="text-2xl font-bold text-primary-600">
            {stats.totalTransactions.toLocaleString()}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.successRate}%
          </p>
        </div>
        <div className="admin-card">
          <h3 className="text-sm font-medium text-gray-500">Avg Transaction</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${stats.averageTransactionValue}
          </p>
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue (Last 7 Days)</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-500 mb-4">Revenue Chart Placeholder</div>
              <div className="grid grid-cols-7 gap-2 text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="text-center">
                    <div>{day}</div>
                    <div className="text-green-600 font-bold">${(Math.random() * 3000 + 1000).toFixed(0)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {[
              { method: 'Credit/Debit Card', count: 1845, percentage: 64.8 },
              { method: 'PayPal', count: 672, percentage: 23.6 },
              { method: 'Bank Transfer', count: 330, percentage: 11.6 }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <span className="font-medium">{item.method}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.count.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or transaction ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'completed', 'pending', 'failed', 'refunded'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  filter === status 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{payment.id}</div>
                      {payment.transactionId && (
                        <div className="text-sm text-gray-500">{payment.transactionId}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.userName}</div>
                      <div className="text-sm text-gray-500">{payment.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {getTypeLabel(payment.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {payment.paymentMethod.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                      {payment.status === 'completed' && (
                        <button className="text-red-600 hover:text-red-900">Refund</button>
                      )}
                      {payment.status === 'failed' && (
                        <button className="text-green-600 hover:text-green-900">Retry</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}