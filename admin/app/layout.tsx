import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlutterHire Admin - Platform Management',
  description: 'Admin dashboard for FlutterHire platform management and analytics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-admin-900 text-white">
              <div className="p-6">
                <h1 className="text-xl font-bold">FlutterHire Admin</h1>
              </div>
              <nav className="mt-8">
                <div className="px-4 space-y-2">
                  <a href="/admin" className="sidebar-link sidebar-link-active">
                    📊 Dashboard
                  </a>
                  <a href="/admin/users" className="sidebar-link sidebar-link-inactive">
                    👥 Users
                  </a>
                  <a href="/admin/jobs" className="sidebar-link sidebar-link-inactive">
                    💼 Jobs
                  </a>
                  <a href="/admin/payments" className="sidebar-link sidebar-link-inactive">
                    💳 Payments
                  </a>
                  <a href="/admin/analytics" className="sidebar-link sidebar-link-inactive">
                    📈 Analytics
                  </a>
                </div>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
              <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Platform Management</h2>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-gray-700">
                      🔔
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      ⚙️
                    </button>
                  </div>
                </div>
              </header>
              
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}