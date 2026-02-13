import { api } from './api'
import { Category, Comment } from './princiPostsService'

export interface Video {
  id: string
  userId: string
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  duration?: number
  fileSize?: number
  status: 'processing' | 'ready' | 'failed'
  isFeatured: boolean
  viewCount: number
  likeCount: number
  commentCount: number
  shareCount: number
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    firstName: string
    lastName: string
    profileImageUrl?: string
  }
  categories?: Category[]
  comments?: Comment[]
  relatedVideos?: Video[]
}

export interface GetVideosQuery {
  page?: number
  limit?: number
  category?: string
  author?: string
  featured?: boolean
  search?: string
  duration?: 'short' | 'medium' | 'long'
  sortBy?: 'latest' | 'popular' | 'trending'
}

export interface GetVideosResponse {
  videos: Video[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UploadVideoRequest {
  title: string
  description?: string
  video: File
  thumbnail?: File
  categoryIds: string[]
}

export interface UploadVideoResponse {
  video: Video
  uploadUrl?: string
}

export interface UpdateVideoRequest {
  title?: string
  description?: string
  categoryIds?: string[]
  isFeatured?: boolean
}

export const princiVoiceService = {
  getVideos: async (query: GetVideosQuery = {}): Promise<GetVideosResponse> => {
    const response = await api.get('/princi-voice', { params: query })
    return response.data.data
  },

  getVideoById: async (id: string): Promise<Video> => {
    const response = await api.get(`/princi-voice/${id}`)
    return response.data.data
  },

  uploadVideo: async (data: UploadVideoRequest): Promise<UploadVideoResponse> => {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    formData.append('video', data.video)
    if (data.thumbnail) formData.append('thumbnail', data.thumbnail)
    formData.append('categoryIds', JSON.stringify(data.categoryIds))

    const response = await api.post('/princi-voice/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  updateVideo: async (id: string, data: UpdateVideoRequest): Promise<Video> => {
    const response = await api.put(`/princi-voice/${id}`, data)
    return response.data.data
  },

  deleteVideo: async (id: string): Promise<void> => {
    await api.delete(`/princi-voice/${id}`)
  },

  likeVideo: async (id: string): Promise<{ isLiked: boolean; likeCount: number }> => {
    const response = await api.post(`/princi-voice/${id}/like`)
    return response.data.data
  },

  getComments: async (videoId: string, params?: { 
    page?: number
    limit?: number
    sortBy?: 'latest' | 'oldest' | 'popular'
  }) => {
    const response = await api.get(`/princi-voice/${videoId}/comments`, { params })
    return response.data.data
  },

  createComment: async (videoId: string, data: { content: string }) => {
    const response = await api.post(`/princi-voice/${videoId}/comments`, data)
    return response.data.data
  },

  getFeaturedVideos: async (): Promise<Video[]> => {
    const response = await api.get('/princi-voice', { 
      params: { featured: true, limit: 10 } 
    })
    return response.data.data.videos
  },

  getTrendingVideos: async (): Promise<Video[]> => {
    const response = await api.get('/princi-voice', { 
      params: { sortBy: 'trending', limit: 10 } 
    })
    return response.data.data.videos
  },

  searchVideos: async (query: string): Promise<GetVideosResponse> => {
    const response = await api.get('/princi-voice', { 
      params: { search: query } 
    })
    return response.data.data
  },

  incrementView: async (id: string): Promise<void> => {
    await api.post(`/princi-voice/${id}/view`)
  },

  shareVideo: async (id: string): Promise<{ shareCount: number }> => {
    const response = await api.post(`/princi-voice/${id}/share`)
    return response.data.data
  }
}

export default princiVoiceService
