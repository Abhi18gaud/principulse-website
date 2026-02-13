import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar, 
  Play,
  Clock,
  Star,
  Video,
  Users
} from 'lucide-react'

interface Talk {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  duration: number
  guest_name: string
  guest_title: string
  guest_organization: string
  host: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  category: {
    id: string
    name: string
    color: string
  }
  tags: Array<{
    id: string
    name: string
    color: string
  }>
  is_featured: boolean
  is_live: boolean
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  scheduled_at?: string
  created_at: string
  updated_at: string
}

export const PrinciTalksPage: React.FC = () => {
  const [talks, setTalks] = useState<Talk[]>([])
  const [filteredTalks, setFilteredTalks] = useState<Talk[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data
  const mockTalks: Talk[] = [
    {
      id: '1',
      title: 'Leading Through Crisis: Lessons from the Frontlines',
      description: 'An inspiring conversation with Dr. Sarah Mitchell about navigating educational leadership during unprecedented challenges, sharing practical strategies and personal insights.',
      video_url: 'https://sample-videos.com/talk1.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1596595044390-99a6cbb83a5?w=800',
      duration: 1800,
      guest_name: 'Dr. Sarah Mitchell',
      guest_title: 'Superintendent',
      guest_organization: 'Westfield School District',
      host: {
        id: '1',
        first_name: 'John',
        last_name: 'Anderson',
        profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5e8989c006?w=150',
        school_name: 'Principulse HQ'
      },
      category: {
        id: '1',
        name: 'Leadership',
        color: '#3B82F6'
      },
      tags: [
        { id: '1', name: 'Leadership', color: '#3B82F6' },
        { id: '2', name: 'Crisis Management', color: '#EF4444' }
      ],
      is_featured: true,
      is_live: false,
      view_count: 5420,
      like_count: 892,
      comment_count: 156,
      share_count: 234,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'The Future of Education: AI and Beyond',
      description: 'Tech expert Michael Chen discusses the transformative impact of artificial intelligence in education and how schools can prepare for the future.',
      video_url: 'https://sample-videos.com/talk2.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f20?w=800',
      duration: 2400,
      guest_name: 'Michael Chen',
      guest_title: 'EdTech Director',
      guest_organization: 'InnovateEDU',
      host: {
        id: '2',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Principulse HQ'
      },
      category: {
        id: '2',
        name: 'Technology',
        color: '#10B981'
      },
      tags: [
        { id: '3', name: 'Technology', color: '#10B981' },
        { id: '4', name: 'Innovation', color: '#6366F1' }
      ],
      is_featured: false,
      is_live: false,
      view_count: 3200,
      like_count: 567,
      comment_count: 89,
      share_count: 123,
      created_at: '2024-01-14T14:30:00Z',
      updated_at: '2024-01-14T14:30:00Z'
    },
    {
      id: '3',
      title: 'Student Mental Health: A Principal\'s Guide',
      description: 'Clinical psychologist Dr. Lisa Thompson shares evidence-based strategies for supporting student mental health in today\'s educational landscape.',
      video_url: 'https://sample-videos.com/talk3.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-152358044983-8c286b6b33b4?w=800',
      duration: 1500,
      guest_name: 'Dr. Lisa Thompson',
      guest_title: 'Clinical Psychologist',
      guest_organization: 'Child Wellness Institute',
      host: {
        id: '3',
        first_name: 'David',
        last_name: 'Kumar',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Principulse HQ'
      },
      category: {
        id: '3',
        name: 'Wellness',
        color: '#8B5CF6'
      },
      tags: [
        { id: '5', name: 'Mental Health', color: '#8B5CF6' },
        { id: '6', name: 'Student Support', color: '#F59E0B' }
      ],
      is_featured: true,
      is_live: true,
      view_count: 8900,
      like_count: 1234,
      comment_count: 267,
      share_count: 456,
      scheduled_at: '2024-01-16T18:00:00Z',
      created_at: '2024-01-13T16:45:00Z',
      updated_at: '2024-01-13T16:45:00Z'
    }
  ]

  const categories = [
    { id: '', name: 'All Categories', color: '#6B7280' },
    { id: '1', name: 'Leadership', color: '#3B82F6' },
    { id: '2', name: 'Technology', color: '#10B981' },
    { id: '3', name: 'Wellness', color: '#8B5CF6' },
    { id: '4', name: 'Innovation', color: '#6366F1' },
    { id: '5', name: 'Professional Development', color: '#F59E0B' }
  ]

  useEffect(() => {
    setTalks(mockTalks)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = talks

    if (searchQuery) {
      filtered = filtered.filter(talk =>
        talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talk.guest_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(talk => talk.category.id === selectedCategory)
    }

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
      case 'featured':
        filtered = filtered.filter(talk => talk.is_featured)
        break
      case 'live':
        filtered = filtered.filter(talk => talk.is_live)
        break
    }

    setFilteredTalks(filtered)
  }, [talks, searchQuery, selectedCategory, sortBy])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLike = (talkId: string) => {
    if (!isAuthenticated) return
    console.log('Liking talk:', talkId)
  }

  const handleShare = (talkId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing talk:', talkId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <MessageCircle className="w-8 h-8 mr-3 text-purple-600" />
                PrinciTalks
              </h1>
              <p className="text-gray-600">Inspiring interviews with educational leaders</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-talks/create"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Talk
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
                  placeholder="Search talks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Viewed</option>
                <option value="liked">Most Liked</option>
                <option value="featured">Featured</option>
                <option value="live">Live Now</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Talks</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredTalks.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredTalks.reduce((sum, talk) => sum + talk.view_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredTalks.reduce((sum, talk) => sum + talk.like_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Live Now</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredTalks.filter(talk => talk.is_live).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Talks Grid/List */}
            {filteredTalks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No talks found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredTalks.map((talk) => (
                  <div
                    key={talk.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {viewMode === 'grid' ? (
                      /* Grid View */
                      <div>
                        {talk.is_featured && (
                          <div className="absolute top-2 right-2 z-10">
                            <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          </div>
                        )}
                        
                        {talk.is_live && (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="flex items-center bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                              LIVE
                            </span>
                          </div>
                        )}
                        
                        <Link to={`/princi-talks/${talk.id}`}>
                          <div className="relative">
                            <img
                              src={talk.thumbnail_url}
                              alt={talk.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                              <Play className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                              {formatDuration(talk.duration)}
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center mb-3">
                              <span
                                className="px-2 py-1 text-xs font-medium rounded-full mr-2"
                                style={{ backgroundColor: talk.category.color + '20', color: talk.category.color }}
                              >
                                {talk.category.name}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {talk.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {talk.description}
                            </p>

                            <div className="flex items-center mb-3">
                              <img
                                src={talk.guest_name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(talk.guest_name)}&background=random` : talk.host.profile_image_url}
                                alt={talk.guest_name || talk.host.first_name + ' ' + talk.host.last_name}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {talk.guest_name || `${talk.host.first_name} ${talk.host.last_name}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {talk.guest_title || 'Host'} • {talk.guest_organization || talk.host.school_name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {talk.view_count}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {talk.scheduled_at ? formatDateTime(talk.scheduled_at) : formatDate(talk.created_at)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleLike(talk.id)}
                                  className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  {talk.like_count}
                                </button>
                                <button
                                  onClick={() => handleShare(talk.id)}
                                  className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                  <Share2 className="w-4 h-4 mr-1" />
                                  {talk.share_count}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      /* List View */
                      <div className="p-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={talk.thumbnail_url}
                            alt={talk.title}
                            className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span
                                className="px-2 py-1 text-xs font-medium rounded-full mr-2"
                                style={{ backgroundColor: talk.category.color + '20', color: talk.category.color }}
                              >
                                {talk.category.name}
                              </span>
                              {talk.is_featured && (
                                <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </span>
                              )}
                              {talk.is_live && (
                                <span className="flex items-center bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                                  LIVE
                                </span>
                              )}
                            </div>

                            <Link to={`/princi-talks/${talk.id}`}>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-purple-600">
                                {talk.title}
                              </h3>
                            </Link>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {talk.description}
                            </p>

                            <div className="flex items-center mb-3">
                              <img
                                src={talk.guest_name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(talk.guest_name)}&background=random` : talk.host.profile_image_url}
                                alt={talk.guest_name || talk.host.first_name + ' ' + talk.host.last_name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {talk.guest_name || `${talk.host.first_name} ${talk.host.last_name}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {talk.guest_title || 'Host'} • {talk.guest_organization || talk.host.school_name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {talk.view_count}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {formatDuration(talk.duration)}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {talk.scheduled_at ? formatDateTime(talk.scheduled_at) : formatDate(talk.created_at)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleLike(talk.id)}
                                  className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  {talk.like_count}
                                </button>
                                <button
                                  onClick={() => handleShare(talk.id)}
                                  className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                  <Share2 className="w-4 h-4 mr-1" />
                                  {talk.share_count}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
