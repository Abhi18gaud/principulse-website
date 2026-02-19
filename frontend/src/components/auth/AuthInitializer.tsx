import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAuth, setUser } from '@/store/slices/authSlice'

export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth())
    
    // Check if tokens exist
    const token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    
    if (token && refreshToken) {
      // Try to get user data from localStorage first (if stored during login)
      const storedUser = localStorage.getItem('userData')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          dispatch(setUser(userData))
        } catch (error) {
          console.error('Error parsing stored user data:', error)
        }
      }
      
      // Note: We'll skip profile fetch for now to avoid backend errors
      // The user data will be available from the login response
    }
  }, [dispatch])

  return <>{children}</>
}
