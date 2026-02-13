import { api } from './api'

export interface AnalyticsEvent {
  eventType: string
  resourceType?: string
  resourceId?: string
  metadata?: Record<string, any>
}

export interface DashboardAnalytics {
  overview: {
    totalUsers: number
    activeUsers: number
    totalPosts: number
    totalVideos: number
    totalEngagement: number
  }
  growth: {
    userGrowth: number
    postGrowth: number
    videoGrowth: number
    engagementGrowth: number
  }
  topContent: {
    posts: Array<{
      id: string
      title: string
      views: number
      likes: number
      comments: number
    }>
    videos: Array<{
      id: string
      title: string
      views: number
      likes: number
      comments: number
    }>
  }
  userActivity: {
    dailyActiveUsers: Array<{
      date: string
      count: number
    }>
    newRegistrations: Array<{
      date: string
      count: number
    }>
  }
}

export interface ContentAnalytics {
  totalViews: number
  totalLikes: number
  totalComments: number
  totalShares: number
  averageEngagement: number
  topPerforming: Array<{
    id: string
    title: string
    type: string
    views: number
    likes: number
    comments: number
    shares: number
  }>
  performanceOverTime: Array<{
    date: string
    views: number
    likes: number
    comments: number
    shares: number
  }>
}

export const analyticsService = {
  trackEvent: async (event: AnalyticsEvent): Promise<void> => {
    await api.post('/analytics/events', event)
  },

  getDashboardAnalytics: async (params?: {
    startDate?: string
    endDate?: string
  }): Promise<DashboardAnalytics> => {
    const response = await api.get('/analytics/dashboard', { params })
    return response.data.data
  },

  getContentAnalytics: async (
    contentType: string,
    params?: {
      startDate?: string
      endDate?: string
      resourceId?: string
    }
  ): Promise<ContentAnalytics> => {
    const response = await api.get(`/analytics/content/${contentType}`, { params })
    return response.data.data
  },

  trackPageView: async (page: string, metadata?: Record<string, any>): Promise<void> => {
    await analyticsService.trackEvent({
      eventType: 'page_view',
      resourceType: 'page',
      metadata: { page, ...metadata }
    })
  },

  trackContentInteraction: async (
    contentType: string,
    contentId: string,
    interactionType: string,
    metadata?: Record<string, any>
  ): Promise<void> => {
    await analyticsService.trackEvent({
      eventType: interactionType,
      resourceType: contentType,
      resourceId: contentId,
      metadata
    })
  },

  trackUserAction: async (
    action: string,
    metadata?: Record<string, any>
  ): Promise<void> => {
    await analyticsService.trackEvent({
      eventType: 'user_action',
      resourceType: 'user',
      metadata: { action, ...metadata }
    })
  },

  trackSearch: async (
    query: string,
    resultsCount: number,
    filters?: Record<string, any>
  ): Promise<void> => {
    await analyticsService.trackEvent({
      eventType: 'search',
      resourceType: 'search',
      metadata: { query, resultsCount, filters }
    })
  },

  trackShare: async (
    contentType: string,
    contentId: string,
    platform: string
  ): Promise<void> => {
    await analyticsService.trackEvent({
      eventType: 'share',
      resourceType: contentType,
      resourceId: contentId,
      metadata: { platform }
    })
  },

  trackDownload: async (
    resourceType: string,
    resourceId: string,
    fileName: string
  ): Promise<void> => {
    await analyticsService.trackEvent({
      eventType: 'download',
      resourceType,
      resourceId,
      metadata: { fileName }
    })
  }
}

export default analyticsService
