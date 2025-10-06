'use client'

import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [reportFormat, setReportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf')
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data for reports
  const stats = {
    totalReports: 245,
    completedReports: 232,
    generatingReports: 3,
    failedReports: 10
  }

  const reportTemplates = [
    {
      id: 'user-analytics',
      name: 'User Analytics Report',
      description: 'Comprehensive user registration, activity, and engagement metrics',
      category: 'users',
      lastGenerated: '2024-01-15T10:30:00Z',
      downloadCount: 45
    },
    {
      id: 'job-performance',
      name: 'Job Performance Report',
      description: 'Job posting statistics, application rates, and success metrics',
      category: 'jobs',
      lastGenerated: '2024-01-14T16:20:00Z',
      downloadCount: 32
    },
    {
      id: 'revenue-summary',
      name: 'Revenue Summary',
      description: 'Monthly/yearly revenue breakdown by subscription and transaction fees',
      category: 'revenue',
      lastGenerated: '2024-01-15T09:15:00Z',
      downloadCount: 78
    }
  ]

  const reports = [
    {
      id: '1',
      name: 'Revenue Summary',
      description: 'Monthly revenue breakdown',
      status: 'completed',
      createdAt: '2024-01-15',
      fileSize: '2.4 MB',
      dateRange: 'Dec 2023 - Jan 2024'
    },
    {
      id: '2',
      name: 'User Analytics',
      description: 'User engagement metrics',
      status: 'completed',
      createdAt: '2024-01-14',
      fileSize: '1.8 MB',
      dateRange: 'Jan 2024'
    },
    {
      id: '3',
      name: 'Job Performance',
      description: 'Job posting analytics',
      status: 'generating',
      createdAt: '2024-01-13',
      fileSize: null,
      dateRange: 'Jan 2024'
    }
  ]

  const handleGenerateReport = async () => {
    if (!selectedReport || !dateRange.from || !dateRange.to) {
      alert('Please select a report template and date range')
      return
    }

    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      alert(`Report generated successfully in ${reportFormat.toUpperCase()} format!`)
    }, 3000)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'users': return 'bg-blue-100 text-blue-800'
      case 'jobs': return 'bg-green-100 text-green-800'
      case 'revenue': return 'bg-purple-100 text-purple-800'
      case 'performance': return 'bg-orange-100 text-orange-800'
      case 'system': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const quickStats = [
    { label: 'Total Reports', value: stats.totalReports || '0', change: '+12%' },
    { label: 'Completed', value: stats.completedReports || '0', change: '+18%' },
    { label: 'In Progress', value: stats.generatingReports || '0', change: '-5%' },
    { label: 'Failed', value: stats.failedReports || '0', change: '+8%' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex gap-2">
          <button className="admin-btn-secondary">Schedule Report</button>
          <button className="admin-btn-secondary">View History</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="admin-card">
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2">
          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h2>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedReport === template.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReport(template.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>
                      {template.lastGenerated 
                        ? `Last: ${new Date(template.lastGenerated).toLocaleDateString()}`
                        : 'Never generated'
                      }
                    </span>
                    <span>{template.downloadCount} downloads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Generator */}
        <div className="admin-card h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h2>
          
          {selectedReport ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Report
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">
                    {reportTemplates.find(t => t.id === selectedReport)?.name}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                    className="admin-input"
                    placeholder="From date"
                  />
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                    className="admin-input"
                    placeholder="To date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value as any)}
                  className="admin-input"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV File</option>
                </select>
              </div>

              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`w-full ${
                  isGenerating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'admin-btn-primary'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Report'
                )}
              </button>

              {/* Quick Actions */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    📊 Last 30 Days
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    📈 This Month
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    📅 This Quarter
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    🗓️ This Year
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p>Select a report template to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.dateRange || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      report.status === 'completed' ? 'bg-green-100 text-green-800' :
                      report.status === 'generating' ? 'bg-blue-100 text-blue-800' :
                      report.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.fileSize || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {report.status === 'completed' && (
                        <>
                          <button className="text-primary-600 hover:text-primary-900">Download</button>
                          <button className="text-blue-600 hover:text-blue-900">Share</button>
                        </>
                      )}
                      {report.status === 'generating' && (
                        <button className="text-yellow-600 hover:text-yellow-900">Cancel</button>
                      )}
                      {report.status === 'failed' && (
                        <button className="text-green-600 hover:text-green-900">Retry</button>
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