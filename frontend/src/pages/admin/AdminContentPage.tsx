import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  princiPostsService, 
  princiVoiceService,
  Post,
  Video as VideoType
} from '@/services'
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  User,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Users,
  Video as VideoIcon,
  BookOpen,
  Award,
  AlertCircle
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: 'post' | 'video' | 'moment' | 'talk' | 'quest' | 'workshop' | 'event'
  author: {
    id: string
    name: string
    avatar?: string
  }
  status: 'published' | 'draft' | 'pending' | 'flagged'
  views: number
  likes: number
  comments: number
  shares: number
  created_at: string
  updated_at: string
  content?: string
  thumbnail?: string
  duration?: number
}

export const AdminContentPage: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        
        // Load posts and videos in parallel
        const [postsResponse, videosResponse] = await Promise.all([
          princiPostsService.getPosts({ limit: 50 }),
          princiVoiceService.getVideos({ limit: 50 })
        ])

        // Transform posts to ContentItem format
        const postsContent = postsResponse.posts.map((post: Post) => ({
          id: post.id,
          title: post.title,
          type: 'post' as const,
          author: {
            id: post.authorId,
            name: `${post.author?.firstName || ''} ${post.author?.lastName || ''}`.trim() || 'Unknown',
            avatar: post.author?.profileImageUrl
          },
          status: post.status === 'published' ? 'published' : post.status === 'draft' ? 'draft' : 'pending' as any,
          views: post.viewCount,
          likes: post.likeCount,
          comments: post.commentCount,
          shares: 0, // Posts don't have share count in current schema
          created_at: post.createdAt,
          updated_at: post.updatedAt,
          content: post.excerpt || post.content.substring(0, 200) + '...'
        }))

        // Transform videos to ContentItem format
        const videosContent = videosResponse.videos.map((video: VideoType) => ({
          id: video.id,
          title: video.title,
          type: 'video' as const,
          author: {
            id: video.userId,
            name: `${video.user?.firstName || ''} ${video.user?.lastName || ''}`.trim() || 'Unknown',
            avatar: video.user?.profileImageUrl
          },
          status: video.status === 'ready' ? 'published' : video.status === 'processing' ? 'pending' : 'draft' as any,
          views: video.viewCount,
          likes: video.likeCount,
          comments: video.commentCount,
          shares: video.shareCount,
          created_at: video.createdAt,
          updated_at: video.updatedAt,
          thumbnail: video.thumbnailUrl,
          duration: video.duration
        }))

        // Combine all content
        const allContent = [...postsContent, ...videosContent].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        setContent(allContent)
      } catch (error) {
        console.error('Error loading content:', error)
        // You might want to show an error message to the user here
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const contentTypes = [
    { id: 'all', name: 'All Content', icon: BookOpen },
    { id: 'post', name: 'Posts', icon: BookOpen },
    { id: 'video', name: 'Videos', icon: VideoIcon },
    { id: 'moment', name: 'Moments', icon: Calendar },
    { id: 'talk', name: 'Talks', icon: Users },
    { id: 'quest', name: 'Quests', icon: Award },
    { id: 'workshop', name: 'Workshops', icon: BarChart3 },
    { id: 'event', name: 'Events', icon: Calendar }
  ]

  const statusOptions = [
    { id: 'all', name: 'All Status', color: 'gray' },
    { id: 'published', name: 'Published', color: 'green' },
    { id: 'draft', name: 'Draft', color: 'yellow' },
    { id: 'pending', name: 'Pending Review', color: 'blue' },
    { id: 'flagged', name: 'Flagged', color: 'red' }
  ]

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedItems(filteredContent.map(item => item.id))
  }

  const handleDeleteSelected = async () => {
    try {
      for (const itemId of selectedItems) {
        const item = content.find(c => c.id === itemId)
        if (item) {
          if (item.type === 'post') {
            await princiPostsService.deletePost(itemId)
          } else if (item.type === 'video') {
            await princiVoiceService.deleteVideo(itemId)
          }
        }
      }
      
      // Refresh content
      window.location.reload()
    } catch (error) {
      console.error('Error deleting items:', error)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const item = content.find(c => c.id === id)
      if (!item) return

      if (item.type === 'post') {
        await princiPostsService.updatePost(id, { 
          status: newStatus as 'draft' | 'published' | 'archived' 
        })
      } else if (item.type === 'video') {
        await princiVoiceService.updateVideo(id, { 
          isFeatured: newStatus === 'published' 
        })
      }

      // Update local state optimistically
      setContent(prev => prev.map(item => 
        item.id === id ? { ...item, status: newStatus as any } : item
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = contentTypes.find(t => t.id === type)
    return typeConfig?.icon || BookOpen
  }

  const getStatusColor = (status: string) => {
    const statusConfig = statusOptions.find(s => s.id === status)
    return statusConfig?.color || 'gray'
  }

  const ContentCard = ({ item }: { item: ContentItem }) => {
    const TypeIcon = getTypeIcon(item.type)
    const statusColor = getStatusColor(item.status)
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 bg-${statusColor}-100 rounded-full flex items-center justify-center`}>
                <TypeIcon className="w-4 h-4 text-${statusColor}-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {item.author.name}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSelectItem(item.id)}
                className={`p-2 rounded ${selectedItems.includes(item.id) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <Edit className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Preview */}
          {item.type === 'video' && item.thumbnail && (
            <div className="mb-4">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>{item.duration}s duration</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {item.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {item.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {item.comments}
                  </span>
                  <span className="flex items-center">
                    <Share2 className="w-4 h-4 mr-1" />
                    {item.shares}
                  </span>
                </div>
              </div>
            </div>
          )}

          {item.type === 'post' && item.content && (
            <div className="text-gray-600 text-sm line-clamp-3 mb-4">
              {item.content}
            </div>
          )}

          {/* Status Badge */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-700`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                className={`text-sm border border-${statusColor}-300 rounded focus:ring-2 focus:ring-${statusColor}-500 focus:border-${statusColor}-500`}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending Review</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {item.views.toLocaleString()}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {item.likes}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {item.comments}
              </span>
              <span className="flex items-center">
                <Share2 className="w-4 h-4 mr-1" />
                {item.shares}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage and moderate all platform content</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {contentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Select All
            </button>
            
            {selectedItems.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedItems.length})
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {content.filter(item => item.type === 'post').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <VideoIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Videos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {content.filter(item => item.type === 'video').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {content.filter(item => item.type === 'event').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {content.filter(item => item.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No content found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {filteredContent.length} items
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Page {currentPage}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
