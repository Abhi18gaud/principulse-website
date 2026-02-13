import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar, 
  Star, 
  Megaphone, 
  Award, 
  Newspaper, 
  Target, 
  Zap
} from 'lucide-react'

interface FlashItem {
  id: string
  user_id: string
  title: string
  content: string
  content_type: string
  media_url?: string
  thumbnail_url?: string
  flash_type: string
  is_featured: boolean
  like_count: number
  comment_count: number
  share_count: number
  created_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
}

export const PrinciFlashPage: React.FC = () => {
  const [flashItems, setFlashItems] = useState<FlashItem[]>([])
  const [filteredFlashItems, setFilteredFlashItems] = useState<FlashItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const flashTypes = [
    { id: '', name: 'All Types', icon: Newspaper, color: '#6B7280' },
    { id: 'achievement', name: 'Achievement', icon: Award, color: '#10B981' },
    { id: 'initiative', name: 'Initiative', icon: Target, color: '#3B82F6' },
    { id: 'recognition', name: 'Recognition', icon: Star, color: '#F59E0B' },
    { id: 'news', name: 'News', icon: Megaphone, color: '#EF4444' },
    { id: 'announcement', name: 'Announcement', icon: Zap, color: '#8B5CF6' }
  ]

  // Mock data - will be replaced with API calls
  const mockFlashItems: FlashItem[] = [
    {
      id: '1',
      user_id: '1',
      title: 'Science Fair Winners Announced!',
      content: 'Congratulations to our brilliant young scientists who won top honors at the regional science fair! Their innovative projects on renewable energy solutions earned them first place.',
      content_type: 'image',
      media_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      thumbnail_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      flash_type: 'achievement',
      is_featured: true,
      like_count: 234,
      comment_count: 45,
      share_count: 89,
      created_at: '2024-01-15T10:00:00Z',
      user: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      }
    },
    {
      id: '2',
      user_id: '2',
      title: 'New STEM Program Launch',
      content: 'Exciting news! We\'re launching a comprehensive STEM program next month featuring robotics, coding, and advanced mathematics. Early registration is now open for interested students.',
      content_type: 'text',
      flash_type: 'initiative',
      is_featured: false,
      like_count: 156,
      comment_count: 28,
      share_count: 67,
      created_at: '2024-01-14T14:30:00Z',
      user: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      }
    },
    {
      id: '3',
      user_id: '3',
      title: 'Teacher of the Month: Ms. Rodriguez',
      content: 'Ms. Rodriguez has been selected as Teacher of the Month for her outstanding dedication to student success and innovative teaching methods. Her passion for education inspires us all!',
      content_type: 'text',
      flash_type: 'recognition',
      is_featured: true,
      like_count: 189,
      comment_count: 34,
      share_count: 92,
      created_at: '2024-01-13T16:45:00Z',
      user: {
        id: '3',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      }
    },
    {
      id: '4',
      user_id: '4',
      title: 'School Dance Cancelled Due to Weather',
      content: 'Due to the severe weather forecast, tonight\'s school dance has been cancelled. We apologize for any inconvenience and look forward to rescheduling soon.',
      content_type: 'text',
      flash_type: 'announcement',
      is_featured: false,
      like_count: 23,
      comment_count: 12,
      share_count: 5,
      created_at: '2024-01-12T12:20:00Z',
      user: {
        id: '4',
        first_name: 'David',
        last_name: 'Kim',
        profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        school_name: 'East Valley Middle School'
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setFlashItems(mockFlashItems)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = flashItems

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(item => item.flash_type === selectedType)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.like_count - a.like_count)
        break
      case 'trending':
        filtered.sort((a, b) => (b.like_count + b.share_count) - (a.like_count + a.share_count))
        break
      case 'featured':
        filtered = filtered.filter(item => item.is_featured)
        break
    }

    setFilteredFlashItems(filtered)
  }, [flashItems, searchQuery, selectedType, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = (itemId: string) => {
    if (!isAuthenticated) return
    console.log('Liking flash item:', itemId)
    // TODO: API call to like flash item
  }

  const handleShare = (itemId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing flash item:', itemId)
    // TODO: API call to share flash item
  }

  const getFlashTypeIcon = (type: string) => {
    const flashType = flashTypes.find(t => t.id === type)
    if (flashType) {
      const IconComponent = flashType.icon
      return <IconComponent className="w-4 h-4" />
    }
    return <Newspaper className="w-4 h-4" />
  }

  const getFlashTypeColor = (type: string) => {
    const flashType = flashTypes.find(t => t.id === type)
    return flashType ? flashType.color : '#6B7280'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Megaphone className="w-8 h-8 mr-3 text-orange-600" />
                PrinciFlash
              </h1>
              <p className="text-gray-600">School news, achievements, and announcements</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-flash/create"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Flash
              </Link>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search flash items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
              >
                {flashTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Liked</option>
                <option value="trending">Trending</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            {/* Flash Types Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {flashTypes.map(type => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(selectedType === type.id ? '' : type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-2 ${selectedType === type.id ? 'text-orange-600' : 'text-gray-600'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-medium text-gray-900">{type.name}</h3>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Megaphone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Flash Items</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredFlashItems.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredFlashItems.reduce((sum, item) => sum + item.like_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Share2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Shares</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredFlashItems.reduce((sum, item) => sum + item.share_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Featured Items</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredFlashItems.filter(item => item.is_featured).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flash Items List */}
            {filteredFlashItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No flash items found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFlashItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {item.is_featured && (
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-t-lg">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Featured Flash</span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.first_name + ' ' + item.user.last_name)}&background=random`}
                            alt={item.user.first_name + ' ' + item.user.last_name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full"
                                    style={{ backgroundColor: getFlashTypeColor(item.flash_type) + '20', color: getFlashTypeColor(item.flash_type) }}>
                                {getFlashTypeIcon(item.flash_type)}
                                <span className="ml-1 capitalize">{item.flash_type}</span>
                              </span>
                              <span className="text-sm text-gray-500">
                                {item.user.school_name}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.user.first_name} {item.user.last_name}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(item.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link to={`/princi-flash/${item.id}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
                          {item.title}
                        </h2>

                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {item.content}
                        </p>

                        {item.content_type === 'image' && item.media_url && (
                          <div className="mb-4">
                            <img
                              src={item.media_url}
                              alt={item.title}
                              className="w-full max-h-96 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </Link>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => handleLike(item.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">{item.like_count}</span>
                          </button>

                          <Link
                            to={`/princi-flash/${item.id}#comments`}
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">{item.comment_count}</span>
                          </Link>

                          <button
                            onClick={() => handleShare(item.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm">{item.share_count}</span>
                          </button>
                        </div>

                        <Link
                          to={`/princi-flash/${item.id}`}
                          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
