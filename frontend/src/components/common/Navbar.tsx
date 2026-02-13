import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { Bell, Search, Menu, X, User, LogOut, Home, BookOpen, Video, Calendar, Heart, Award, Users, GraduationCap, MapPin, Briefcase, Gift, Sparkles } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    // Dispatch logout action
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login'
  }

  const mainNavItems = [
    { path: '/pages', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/princi-posts', label: 'PrinciPosts', icon: BookOpen },
    { path: '/princi-voice', label: 'PrinciVoice', icon: Video },
    { path: '/princi-moments', label: 'PrinciMoments', icon: Calendar },
    { path: '/princi-talks', label: 'PrinciTalks', icon: Video },
    { path: '/principassions', label: 'Principassions', icon: Heart },
    { path: '/princi-flash', label: 'PrinciFlash', icon: Sparkles },
    { path: '/princi-care', label: 'PrinciCare', icon: Heart },
    { path: '/princi-fest', label: 'PrinciFest', icon: Calendar },
    { path: '/princi-torch', label: 'PrinciTorch', icon: Sparkles },
    { path: '/princi-quest', label: 'PrinciQuest', icon: Award },
    { path: '/princi-edge', label: 'PrinciEdge', icon: GraduationCap },
    { path: '/princi-catalyst', label: 'PrinciCatalyst', icon: Briefcase },
    { path: '/princi-circle', label: 'PrinciCircle', icon: Users },
    { path: '/princi-serve', label: 'PrinciServe', icon: Heart },
    { path: '/princi-perks', label: 'PrinciPerks', icon: Gift },
    { path: '/princi-awards', label: 'PrinciAwards', icon: Award },
    { path: '/princi-school', label: 'PrinciSchool', icon: GraduationCap },
    { path: '/princi-pathway', label: 'PrinciPathway', icon: Users },
    { path: '/princi-hubs', label: 'PrinciHubs', icon: MapPin },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Principulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavItems.slice(0, 8).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {user.firstName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts, videos, people..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Settings icon component
const Settings: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.572c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 3.352.822 1.724 1.724 0 002.573-1.065z" />
  </svg>
)
