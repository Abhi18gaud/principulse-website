import { api } from './api'
import { User, UserStats } from './userService'
import { Post } from './princiPostsService'
import { Video } from './princiVoiceService'

export interface AdminAnalytics {
  overview: {
    totalUsers: number
    activeUsers: number
    totalPosts: number
    totalVideos: number
    totalRevenue: number
    pendingApprovals: number
  }
  userStats: {
    newUsersToday: number
    newUsersThisWeek: number
    newUsersThisMonth: number
    userRetentionRate: number
  }
  contentStats: {
    postsToday: number
    postsThisWeek: number
    postsThisMonth: number
    videosToday: number
    videosThisWeek: number
    videosThisMonth: number
  }
  engagementStats: {
    totalLikes: number
    totalComments: number
    totalShares: number
    averageEngagementRate: number
  }
  revenueStats: {
    revenueToday: number
    revenueThisWeek: number
    revenueThisMonth: number
    revenueThisYear: number
  }
}

export interface ContentReport {
  id: string
  contentType: 'post' | 'video' | 'comment'
  contentId: string
  reporterId: string
  reason: string
  description?: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  createdAt: string
  updatedAt: string
  reporter?: User
  content?: Post | Video | any
}

export interface SystemHealth {
  database: {
    status: 'healthy' | 'degraded' | 'down'
    responseTime: number
    connections: number
  }
  storage: {
    status: 'healthy' | 'degraded' | 'down'
    usedSpace: number
    totalSpace: number
    usagePercentage: number
  }
  api: {
    status: 'healthy' | 'degraded' | 'down'
    responseTime: number
    uptime: number
    errorRate: number
  }
  lastUpdated: string
}

export const adminService = {
  // User Management
  getAllUsers: async (params?: {
    page?: number
    limit?: number
    search?: string
    status?: 'active' | 'inactive' | 'suspended'
    role?: string
    sortBy?: 'createdAt' | 'lastLoginAt' | 'name'
    sortOrder?: 'asc' | 'desc'
  }) => {
    const response = await api.get('/admin/users', { params })
    return response.data.data
  },

  updateUserStatus: async (userId: string, status: 'active' | 'inactive' | 'suspended'): Promise<User> => {
    const response = await api.put(`/admin/users/${userId}/status`, { status })
    return response.data.data
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`)
  },

  getUserDetails: async (userId: string): Promise<{ user: User; stats: UserStats; activity: any[] }> => {
    const response = await api.get(`/admin/users/${userId}`)
    return response.data.data
  },

  // Analytics
  getAnalytics: async (params?: {
    startDate?: string
    endDate?: string
    period?: 'day' | 'week' | 'month' | 'year'
  }): Promise<AdminAnalytics> => {
    const response = await api.get('/admin/analytics', { params })
    return response.data.data
  },

  getSystemHealth: async (): Promise<SystemHealth> => {
    const response = await api.get('/admin/system/health')
    return response.data.data
  },

  // Content Management
  getPendingContent: async (params?: {
    type?: 'posts' | 'videos' | 'all'
    page?: number
    limit?: number
  }) => {
    const response = await api.get('/admin/content/pending', { params })
    return response.data.data
  },

  approveContent: async (contentType: 'posts' | 'videos', contentId: string): Promise<void> => {
    await api.post(`/admin/content/${contentType}/${contentId}/approve`)
  },

  rejectContent: async (
    contentType: 'posts' | 'videos', 
    contentId: string, 
    reason: string
  ): Promise<void> => {
    await api.post(`/admin/content/${contentType}/${contentId}/reject`, { reason })
  },

  featureContent: async (contentType: 'posts' | 'videos', contentId: string): Promise<void> => {
    await api.post(`/admin/content/${contentType}/${contentId}/feature`)
  },

  unfeatureContent: async (contentType: 'posts' | 'videos', contentId: string): Promise<void> => {
    await api.post(`/admin/content/${contentType}/${contentId}/unfeature`)
  },

  deleteContent: async (contentType: 'posts' | 'videos', contentId: string): Promise<void> => {
    await api.delete(`/admin/content/${contentType}/${contentId}`)
  },

  // Reports Management
  getContentReports: async (params?: {
    status?: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
    contentType?: 'post' | 'video' | 'comment'
    page?: number
    limit?: number
  }): Promise<{ reports: ContentReport[]; pagination: any }> => {
    const response = await api.get('/admin/content/reports', { params })
    return response.data.data
  },

  updateReportStatus: async (
    reportId: string,
    status: 'reviewed' | 'resolved' | 'dismissed',
    note?: string
  ): Promise<ContentReport> => {
    const response = await api.put(`/admin/reports/${reportId}`, { status, note })
    return response.data.data
  },

  // Settings Management
  getSystemSettings: async (): Promise<Record<string, any>> => {
    const response = await api.get('/admin/settings')
    return response.data.data
  },

  updateSystemSettings: async (settings: Record<string, any>): Promise<Record<string, any>> => {
    const response = await api.put('/admin/settings', settings)
    return response.data.data
  },

  // Export Data
  exportUsers: async (format: 'csv' | 'xlsx' | 'json'): Promise<Blob> => {
    const response = await api.get('/admin/export/users', {
      params: { format },
      responseType: 'blob'
    })
    return response.data
  },

  exportAnalytics: async (
    params: {
      startDate: string
      endDate: string
      format: 'csv' | 'xlsx' | 'json'
    }
  ): Promise<Blob> => {
    const response = await api.get('/admin/export/analytics', {
      params,
      responseType: 'blob'
    })
    return response.data
  },

  // Notifications
  sendNotification: async (data: {
    title: string
    message: string
    targetAudience?: 'all' | 'active' | 'premium'
    userIds?: string[]
    scheduledAt?: string
  }): Promise<void> => {
    await api.post('/admin/notifications/send', data)
  },

  getNotificationLogs: async (params?: {
    page?: number
    limit?: number
    status?: 'sent' | 'scheduled' | 'failed'
  }) => {
    const response = await api.get('/admin/notifications/logs', { params })
    return response.data.data
  }
}

export default adminService
