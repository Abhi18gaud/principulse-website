import { api } from './api'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  iconUrl?: string
  color?: string
  sortOrder: number
  isActive: boolean
  createdAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  color?: string
  usageCount: number
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  userId: string
  parentId?: string
  content: string
  likeCount: number
  isApproved: boolean
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    firstName: string
    lastName: string
    profileImageUrl?: string
  }
}

export interface Post {
  id: string
  authorId: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featuredImageUrl?: string
  status: 'draft' | 'published' | 'archived'
  isFeatured: boolean
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author?: {
    id: string
    firstName: string
    lastName: string
    profileImageUrl?: string
  }
  categories?: Category[]
  tags?: Tag[]
  comments?: Comment[]
  relatedPosts?: Post[]
}

export interface GetPostsQuery {
  page?: number
  limit?: number
  category?: string
  tag?: string
  author?: string
  featured?: boolean
  search?: string
  sortBy?: 'latest' | 'popular' | 'trending'
}

export interface GetPostsResponse {
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CreatePostRequest {
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  categoryIds: string[]
  tagIds: string[]
  status: 'draft' | 'published'
}

export interface UpdatePostRequest {
  title?: string
  content?: string
  excerpt?: string
  featuredImage?: string
  categoryIds?: string[]
  tagIds?: string[]
  status?: 'draft' | 'published' | 'archived'
  isFeatured?: boolean
}

export interface CreateCommentRequest {
  content: string
  parentId?: string
}

export interface GetCommentsQuery {
  page?: number
  limit?: number
  sortBy?: 'latest' | 'oldest' | 'popular'
}

export interface GetCommentsResponse {
  comments: Comment[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const princiPostsService = {
  getPosts: async (query: GetPostsQuery = {}): Promise<GetPostsResponse> => {
    const response = await api.get('/princi-posts', { params: query })
    return response.data.data
  },

  getPostById: async (id: string): Promise<Post> => {
    const response = await api.get(`/princi-posts/${id}`)
    return response.data.data
  },

  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await api.post('/princi-posts', data)
    return response.data.data
  },

  updatePost: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    const response = await api.put(`/princi-posts/${id}`, data)
    return response.data.data
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/princi-posts/${id}`)
  },

  likePost: async (id: string): Promise<{ isLiked: boolean; likeCount: number }> => {
    const response = await api.post(`/princi-posts/${id}/like`)
    return response.data.data
  },

  getComments: async (postId: string, query: GetCommentsQuery = {}): Promise<GetCommentsResponse> => {
    const response = await api.get(`/princi-posts/${postId}/comments`, { params: query })
    return response.data.data
  },

  createComment: async (postId: string, data: CreateCommentRequest): Promise<Comment> => {
    const response = await api.post(`/princi-posts/${postId}/comments`, data)
    return response.data.data
  },

  updateComment: async (id: string, data: { content: string }): Promise<Comment> => {
    const response = await api.put(`/princi-posts/comments/${id}`, data)
    return response.data.data
  },

  deleteComment: async (id: string): Promise<void> => {
    await api.delete(`/princi-posts/comments/${id}`)
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories')
    return response.data.data
  },

  getTags: async (): Promise<Tag[]> => {
    const response = await api.get('/tags')
    return response.data.data
  },

  getFeaturedPosts: async (): Promise<Post[]> => {
    const response = await api.get('/princi-posts', { 
      params: { featured: true, limit: 10 } 
    })
    return response.data.data.posts
  },

  getTrendingPosts: async (): Promise<Post[]> => {
    const response = await api.get('/princi-posts', { 
      params: { sortBy: 'trending', limit: 10 } 
    })
    return response.data.data.posts
  },

  searchPosts: async (query: string): Promise<GetPostsResponse> => {
    const response = await api.get('/princi-posts', { 
      params: { search: query } 
    })
    return response.data.data
  }
}

export default princiPostsService
