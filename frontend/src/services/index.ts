// Export all services for easy importing
export { default as api } from './api'
export { default as authService } from './authService'
export { default as userService } from './userService'
export { default as princiPostsService } from './princiPostsService'
export { default as princiVoiceService } from './princiVoiceService'
export { default as uploadService } from './uploadService'
export { default as analyticsService } from './analyticsService'
export { default as adminService } from './adminService'

// Export types
export type { User, UserProfileResponse, UpdateProfileRequest } from './userService'
export type { 
  Post, 
  Category, 
  Tag, 
  Comment, 
  GetPostsQuery, 
  CreatePostRequest, 
  UpdatePostRequest 
} from './princiPostsService'
export type { 
  Video, 
  GetVideosQuery, 
  UploadVideoRequest, 
  UpdateVideoRequest 
} from './princiVoiceService'
export type { 
  UploadImageResponse, 
  UploadVideoResponse, 
  UploadDocumentResponse 
} from './uploadService'
export type { 
  AnalyticsEvent, 
  DashboardAnalytics, 
  ContentAnalytics 
} from './analyticsService'
export type { 
  AdminAnalytics, 
  ContentReport, 
  SystemHealth 
} from './adminService'
