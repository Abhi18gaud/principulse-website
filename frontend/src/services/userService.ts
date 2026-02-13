import { api } from './api'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  profileImageUrl?: string
  bio?: string
  schoolName?: string
  schoolAddress?: string
  position?: string
  experienceYears?: number
  educationQualification?: string
  specialization?: string
  dateOfBirth?: string
  joinDate: string
  isActive: boolean
  isVerified: boolean
  emailVerifiedAt?: string
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserStats {
  postsCount: number
  videosCount: number
  followersCount: number
  followingCount: number
}

export interface UserProfileResponse {
  user: User
  subscription?: any
  stats: UserStats
}

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  phone?: string
  bio?: string
  schoolName?: string
  schoolAddress?: string
  position?: string
  experienceYears?: number
  educationQualification?: string
  specialization?: string
  dateOfBirth?: string
}

export interface SearchUsersQuery {
  q?: string
  position?: string
  school?: string
  page?: number
  limit?: number
}

export interface SearchUsersResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const userService = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get('/users/profile')
    return response.data.data
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await api.put('/users/profile', data)
    return response.data.data
  },

  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/users/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  searchUsers: async (query: SearchUsersQuery): Promise<SearchUsersResponse> => {
    const response = await api.get('/users/search', { params: query })
    return response.data.data
  },

  getUserById: async (id: string): Promise<{ user: User; stats: UserStats }> => {
    const response = await api.get(`/users/${id}`)
    return response.data.data
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete('/users/account')
  },

  updatePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    await api.post('/users/update-password', data)
  },

  updateEmail: async (data: { email: string; password: string }): Promise<void> => {
    await api.post('/users/update-email', data)
  },

  getNotifications: async (params?: { 
    page?: number
    limit?: number
    isRead?: boolean
    type?: string
    sortBy?: 'latest' | 'oldest'
  }) => {
    const response = await api.get('/notifications', { params })
    return response.data.data
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    await api.put(`/notifications/${id}/read`)
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    await api.put('/notifications/read-all')
  },

  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`)
  },

  getUnreadNotificationsCount: async (): Promise<{ count: number }> => {
    const response = await api.get('/notifications/count')
    return response.data.data
  }
}

export default userService
