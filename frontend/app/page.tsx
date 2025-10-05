import Link from 'next/link'
import { Button } from '../components/ui/Button'
import { FeaturedJobs } from '../components/jobs/FeaturedJobs'
import { SearchBar } from '../components/search/SearchBar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next Flutter Developer
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect with top Flutter talent worldwide. The premier platform for Flutter development jobs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/jobs">
              <Button size="lg" variant="secondary">
                Find Jobs
              </Button>
            </Link>
            <Link href="/register?role=recruiter">
              <Button size="lg" variant="outline">
                Post a Job
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">10k+</div>
              <div className="text-gray-600">Flutter Developers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">200+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Flutter Jobs</h2>
          <FeaturedJobs />
          
          <div className="text-center mt-12">
            <Link href="/jobs">
              <Button size="lg">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FlutterHire?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flutter Focused</h3>
              <p className="text-gray-600">Exclusively for Flutter developers and companies hiring Flutter talent.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Connect with Flutter developers and opportunities worldwide.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Matching</h3>
              <p className="text-gray-600">Advanced algorithms to match the right talent with the right opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Flutter developers and companies already using FlutterHire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=developer">
              <Button size="lg" variant="secondary">
                Join as Developer
              </Button>
            </Link>
            <Link href="/register?role=recruiter">
              <Button size="lg" variant="outline">
                Join as Recruiter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}