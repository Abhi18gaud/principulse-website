import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import {
  Play,
  Heart,
  MessageCircle,
  Search,
  Eye,
  TrendingUp,
  Upload,
  MoreHorizontal,
  Video
} from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  duration: number
  file_size: number
  status: string
  is_featured: boolean
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  author: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  categories: Array<{
    id: string
    name: string
    color: string
  }>
  created_at: string
  updated_at: string
}

export const PrinciVoicePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  // Mock data - in real app, this would come from API
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Digital Leadership in Modern Schools',
      description: 'Exploring innovative approaches to educational leadership in the digital age',
      video_url: 'https://example.com/video1.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400',
      duration: 1200,
      file_size: 125000000,
      status: 'published',
      is_featured: true,
      view_count: 2341,
      like_count: 156,
      comment_count: 23,
      share_count: 45,
      author: {
        id: '1',
        first_name: 'Dr. Rajesh',
        last_name: 'Kumar',
        profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        school_name: 'Delhi Public School'
      },
      categories: [
        { id: '1', name: 'Leadership', color: 'blue' },
        { id: '2', name: 'Technology', color: 'purple' }
      ],
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Student Mental Health Strategies',
      description: 'Practical approaches to supporting student wellbeing in educational settings',
      video_url: 'https://example.com/video2.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400',
      duration: 900,
      file_size: 98000000,
      status: 'published',
      is_featured: false,
      view_count: 1892,
      like_count: 134,
      comment_count: 18,
      share_count: 32,
      author: {
        id: '2',
        first_name: 'Dr. Meera',
        last_name: 'Singh',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108757-26e6e4b8b5c?w=100',
        school_name: 'Modern High School'
      },
      categories: [
        { id: '3', name: 'Wellness', color: 'green' },
        { id: '4', name: 'Student Support', color: 'yellow' }
      ],
      created_at: '2024-01-14T14:20:00Z',
      updated_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      title: 'Curriculum Innovation Workshop',
      description: 'Interactive session on modern curriculum design and implementation',
      video_url: 'https://example.com/video3.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400',
      duration: 1800,
      file_size: 180000000,
      status: 'published',
      is_featured: false,
      view_count: 1654,
      like_count: 98,
      comment_count: 31,
      share_count: 28,
      author: {
        id: '3',
        first_name: 'Principal',
        last_name: 'Agarwal',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        school_name: 'Green Valley School'
      },
      categories: [
        { id: '5', name: 'Curriculum', color: 'red' }
      ],
      created_at: '2024-01-13T09:15:00Z',
      updated_at: '2024-01-13T09:15:00Z'
    }
  ]

  const categories = [
    { id: '1', name: 'Leadership', color: 'blue' },
    { id: '2', name: 'Technology', color: 'purple' },
    { id: '3', name: 'Wellness', color: 'green' },
    { id: '4', name: 'Student Support', color: 'yellow' },
    { id: '5', name: 'Curriculum', color: 'red' },
    { id: '6', name: 'Professional Development', color: 'indigo' }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVideos(mockVideos)
      setFilteredVideos(mockVideos)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = videos

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.author.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.author.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(video =>
        video.categories.some(cat => cat.name === selectedCategory)
      )
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.view_count - a.view_count)
        break
      case 'liked':
        filtered.sort((a, b) => b.like_count - a.like_count)
        break
    }

    setFilteredVideos(filtered)
  }, [videos, searchQuery, selectedCategory, sortBy])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleUpload = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setShowUploadModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading PrinciVoice videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">PrinciVoice 🎙️</h1>
              <p className="text-lg text-gray-600">Share your voice with the educational community</p>
            </div>
            <button
              onClick={handleUpload}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Video
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Videos</p>
                <p className="text-3xl font-bold text-gray-900">{videos.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">
                  {videos.reduce((sum, video) => sum + video.view_count, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">
                  {videos.reduce((sum, video) => sum + video.like_count, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-3xl font-bold text-gray-900">87%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Viewed</option>
              <option value="liked">Most Liked</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <div className="w-5 h-5 grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <div className="w-5 h-5 space-y-1">
                  <div className="w-5 h-1 bg-current rounded"></div>
                  <div className="w-5 h-1 bg-current rounded"></div>
                  <div className="w-5 h-1 bg-current rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={viewMode === 'grid' ? 'bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow' : 'bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow'}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative">
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-blue-600 ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(video.duration)}
                    </div>
                    {video.is_featured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.view_count.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {video.like_count}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {video.comment_count}
                        </span>
                      </div>
                      <span>{formatDate(video.created_at)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-6">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                        <p className="text-sm text-gray-600">{video.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.view_count.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {video.like_count}
                        </span>
                        <span>{formatDuration(video.duration)}</span>
                      </div>
                      <span>{formatDate(video.created_at)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Video</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your video here</p>
                <p className="text-sm text-gray-500">or</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Browse Files
                </button>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
