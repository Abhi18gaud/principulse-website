import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallback
}) => {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth)
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access
  if (requiredRoles.length > 0 && user) {
    const userRoles = user.roles.map((userRole) => userRole.role.name)
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role))

    if (!hasRequiredRole) {
      return fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
