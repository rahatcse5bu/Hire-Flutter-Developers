'use client'

import { useState } from 'react'

interface SystemSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  supportEmail: string
  maintenanceMode: boolean
  allowRegistration: boolean
  emailVerificationRequired: boolean
  moderateJobPosts: boolean
  maxJobPostsPerUser: number
  jobPostExpiryDays: number
}

interface PaymentSettings {
  stripePublishableKey: string
  stripeSecretKey: string
  paypalEnabled: boolean
  paypalClientId: string
  transactionFeePercentage: number
  minimumWithdrawal: number
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  newUserNotifications: boolean
  newJobNotifications: boolean
  paymentNotifications: boolean
  systemAlerts: boolean
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'notifications' | 'security'>('general')
  
  // Mock settings data - replace with API calls
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'Flutter Hiring Platform',
    siteDescription: 'Connect Flutter developers with global opportunities',
    contactEmail: 'contact@flutterhiring.com',
    supportEmail: 'support@flutterhiring.com',
    maintenanceMode: false,
    allowRegistration: true,
    emailVerificationRequired: true,
    moderateJobPosts: true,
    maxJobPostsPerUser: 10,
    jobPostExpiryDays: 30
  })

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    stripePublishableKey: 'pk_test_...',
    stripeSecretKey: '••••••••••••••••',
    paypalEnabled: true,
    paypalClientId: 'AX...',
    transactionFeePercentage: 5.0,
    minimumWithdrawal: 50.0
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newUserNotifications: true,
    newJobNotifications: true,
    paymentNotifications: true,
    systemAlerts: true
  })

  const handleSaveSettings = () => {
    // Implement save functionality
    alert('Settings saved successfully!')
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <div className="flex gap-2">
          <button className="admin-btn-secondary">Reset to Defaults</button>
          <button className="admin-btn-primary" onClick={handleSaveSettings}>
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="admin-card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
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
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={systemSettings.contactEmail}
                      onChange={(e) => setSystemSettings({...systemSettings, contactEmail: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={systemSettings.siteDescription}
                      onChange={(e) => setSystemSettings({...systemSettings, siteDescription: e.target.value})}
                      rows={3}
                      className="admin-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={systemSettings.supportEmail}
                      onChange={(e) => setSystemSettings({...systemSettings, supportEmail: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Controls</h3>
                <div className="space-y-4">
                  {[
                    { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Put the platform in maintenance mode' },
                    { key: 'allowRegistration', label: 'Allow New Registrations', description: 'Allow new users to register' },
                    { key: 'emailVerificationRequired', label: 'Email Verification Required', description: 'Require email verification for new accounts' },
                    { key: 'moderateJobPosts', label: 'Moderate Job Posts', description: 'Require admin approval for new job posts' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{setting.label}</div>
                        <div className="text-sm text-gray-500">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings[setting.key as keyof SystemSettings] as boolean}
                          onChange={(e) => setSystemSettings({...systemSettings, [setting.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Limits & Restrictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Job Posts per User
                    </label>
                    <input
                      type="number"
                      value={systemSettings.maxJobPostsPerUser}
                      onChange={(e) => setSystemSettings({...systemSettings, maxJobPostsPerUser: parseInt(e.target.value)})}
                      className="admin-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Post Expiry (Days)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.jobPostExpiryDays}
                      onChange={(e) => setSystemSettings({...systemSettings, jobPostExpiryDays: parseInt(e.target.value)})}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Stripe Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stripe Publishable Key
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.stripePublishableKey}
                      onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stripe Secret Key
                    </label>
                    <input
                      type="password"
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">PayPal Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Enable PayPal</div>
                      <div className="text-sm text-gray-500">Allow PayPal payments</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentSettings.paypalEnabled}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paypalEnabled: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  {paymentSettings.paypalEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Client ID
                      </label>
                      <input
                        type="text"
                        value={paymentSettings.paypalClientId}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                        className="admin-input"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Fee (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={paymentSettings.transactionFeePercentage}
                      onChange={(e) => setPaymentSettings({...paymentSettings, transactionFeePercentage: parseFloat(e.target.value)})}
                      className="admin-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Withdrawal ($)
                    </label>
                    <input
                      type="number"
                      value={paymentSettings.minimumWithdrawal}
                      onChange={(e) => setPaymentSettings({...paymentSettings, minimumWithdrawal: parseFloat(e.target.value)})}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Send notifications via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', description: 'Send notifications via SMS' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Send browser push notifications' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{setting.label}</div>
                        <div className="text-sm text-gray-500">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[setting.key as keyof NotificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({...notificationSettings, [setting.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Event Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'newUserNotifications', label: 'New User Registration', description: 'Notify when new users register' },
                    { key: 'newJobNotifications', label: 'New Job Posts', description: 'Notify when new jobs are posted' },
                    { key: 'paymentNotifications', label: 'Payment Events', description: 'Notify about payment transactions' },
                    { key: 'systemAlerts', label: 'System Alerts', description: 'Critical system notifications' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{setting.label}</div>
                        <div className="text-sm text-gray-500">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[setting.key as keyof NotificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({...notificationSettings, [setting.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
                <div className="space-y-4">
                  <div className="admin-card">
                    <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Enhance security by requiring 2FA for admin accounts
                    </p>
                    <button className="admin-btn-primary">Enable 2FA</button>
                  </div>
                  
                  <div className="admin-card">
                    <h4 className="font-medium text-gray-900 mb-2">Session Timeout</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Automatically log out inactive users
                    </p>
                    <select className="admin-input max-w-xs">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                      <option value="480">8 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">API Security</h3>
                <div className="space-y-4">
                  <div className="admin-card">
                    <h4 className="font-medium text-gray-900 mb-2">Rate Limiting</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Current: 100 requests per minute per IP
                    </p>
                    <button className="admin-btn-secondary">Configure Limits</button>
                  </div>
                  
                  <div className="admin-card">
                    <h4 className="font-medium text-gray-900 mb-2">API Keys</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage API access keys
                    </p>
                    <div className="flex gap-2">
                      <button className="admin-btn-secondary">View Keys</button>
                      <button className="admin-btn-primary">Generate New Key</button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Protection</h3>
                <div className="space-y-4">
                  <div className="admin-card">
                    <h4 className="font-medium text-gray-900 mb-2">Database Backup</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Last backup: 2 hours ago
                    </p>
                    <button className="admin-btn-primary">Create Backup Now</button>
                  </div>
                  
                  <div className="admin-card">
                    <h4 className="font-medium text-gray-900 mb-2">Audit Logs</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Track all admin actions and system events
                    </p>
                    <button className="admin-btn-secondary">View Audit Logs</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}