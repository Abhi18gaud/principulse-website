import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          })

          const { accessToken } = response.data.data
          localStorage.setItem('accessToken', accessToken)

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    const data = response.data.data || response.data
    
    // Store tokens
    if (data.tokens) {
      localStorage.setItem('accessToken', data.tokens.accessToken)
      localStorage.setItem('refreshToken', data.tokens.refreshToken)
    }
    
    return response
  },

  register: async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
    schoolName?: string
    position?: string
  }) => {
    const response = await api.post('/auth/register', userData)
    const data = response.data.data || response.data
    
    // Store tokens
    if (data.tokens) {
      localStorage.setItem('accessToken', data.tokens.accessToken)
      localStorage.setItem('refreshToken', data.tokens.refreshToken)
    }
    
    return response
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await api.post('/auth/refresh', { refreshToken })
    const { accessToken } = response.data.data
    
    localStorage.setItem('accessToken', accessToken)
    return response
  },

  getProfile: async () => {
    return await api.get('/auth/me')
  },

  changePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    return await api.post('/auth/change-password', passwords)
  },

  forgotPassword: async (email: string) => {
    return await api.post('/auth/forgot-password', { email })
  },

  resetPassword: async (data: { token: string; newPassword: string }) => {
    return await api.post('/auth/reset-password', data)
  },

  verifyEmail: async (token: string) => {
    return await api.get(`/auth/verify-email?token=${token}`)
  },
}

export default api
