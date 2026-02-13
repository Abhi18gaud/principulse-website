import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export const Layout: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                Principulse
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link 
                to="/pages" 
                className={`text-gray-600 hover:text-gray-900 ${isActive('/pages') ? 'text-blue-600 font-medium' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`text-gray-600 hover:text-gray-900 ${isActive('/dashboard') ? 'text-blue-600 font-medium' : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className={`text-gray-600 hover:text-gray-900 ${isActive('/profile') ? 'text-blue-600 font-medium' : ''}`}
              >
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
