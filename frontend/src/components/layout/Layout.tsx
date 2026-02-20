import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { Bell, User, ChevronRight, Star, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/pages" className="flex items-center space-x-3">
              <div className="w-12 h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-40 lg:h-40 flex items-center justify-center">
                <img src="/01_Principulse.png" alt="Principulse" className="w-full h-full object-contain" />
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/princi-posts" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciPosts
              </Link>
              <Link to="/princi-voice" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciVoice
              </Link>
              <Link to="/princi-quest" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciQuest
              </Link>
              <Link to="/princi-edge" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciEdge
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                <Link to="/pages" className="hidden md:block text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Home
                </Link>
                <Link to="/dashboard" className="hidden md:block text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Dashboard
                </Link>
                  <Link to="/notifications" className="p-2 text-gray-600 hover:text-gray-900 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <div className="relative">
                    <Link to="/profile" className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/pages" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Profile
              </Link>
              <Link to="/princi-posts" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciPosts
              </Link>
              <Link to="/princi-voice" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciVoice
              </Link>
              <Link to="/princi-quest" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciQuest
              </Link>
              <Link to="/princi-edge" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciEdge
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/notifications" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Notifications
                  </Link>
                  <Link to="/logout" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
      
      <main>
        {children}
      </main>
    </div>
  )
}
