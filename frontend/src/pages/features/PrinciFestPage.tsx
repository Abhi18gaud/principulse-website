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
  Gift, 
  Cake, 
  Trophy, 
  Sparkles, 
  Mail, 
  Send, 
  PartyPopper, 
  Award
} from 'lucide-react'

interface Celebration {
  id: string
  user_id: string
  celebration_type: string
  title: string
  message: string
  recipient_name?: string
  recipient_user_id?: string
  ecard_url?: string
  is_public: boolean
  like_count: number
  comment_count: number
  celebration_date?: string
  created_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  recipient?: {
    first_name: string
    last_name: string
  }
}

export const PrinciFestPage: React.FC = () => {
  const [celebrations, setCelebrations] = useState<Celebration[]>([])
  const [filteredCelebrations, setFilteredCelebrations] = useState<Celebration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const celebrationTypes = [
    { id: '', name: 'All Types', icon: PartyPopper, color: '#6B7280' },
    { id: 'birthday', name: 'Birthday', icon: Cake, color: '#F59E0B' },
    { id: 'anniversary', name: 'Anniversary', icon: Heart, color: '#EF4444' },
    { id: 'achievement', name: 'Achievement', icon: Trophy, color: '#10B981' },
    { id: 'festival', name: 'Festival', icon: Sparkles, color: '#8B5CF6' },
    { id: 'graduation', name: 'Graduation', icon: Award, color: '#3B82F6' },
    { id: 'retirement', name: 'Retirement', icon: Gift, color: '#6366F1' }
  ]

  // Mock data - will be replaced with API calls
  const mockCelebrations: Celebration[] = [
    {
      id: '1',
      user_id: '1',
      celebration_type: 'birthday',
      title: 'Happy Birthday, Principal Johnson!',
      message: 'Wishing you a wonderful birthday filled with joy, laughter, and success. Your leadership inspires us all to be better educators every day. May this year bring you even more achievements and happiness!',
      recipient_name: 'Principal Johnson',
      recipient_user_id: '2',
      ecard_url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
      is_public: true,
      like_count: 45,
      comment_count: 23,
      celebration_date: '2024-01-20',
      created_at: '2024-01-15T10:00:00Z',
      user: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      recipient: {
        first_name: 'Principal',
        last_name: 'Johnson'
      }
    },
    {
      id: '2',
      user_id: '2',
      celebration_type: 'achievement',
      title: 'Congratulations on National Teacher Award!',
      message: 'Heartfelt congratulations on receiving the National Teacher Award! Your dedication to student success and innovative teaching methods have truly made a difference. We\'re so proud of you!',
      recipient_name: 'Ms. Rodriguez',
      recipient_user_id: '3',
      ecard_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
      is_public: true,
      like_count: 67,
      comment_count: 34,
      celebration_date: '2024-01-18',
      created_at: '2024-01-14T14:30:00Z',
      user: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      },
      recipient: {
        first_name: 'Ms.',
        last_name: 'Rodriguez'
      }
    },
    {
      id: '3',
      user_id: '3',
      celebration_type: 'anniversary',
      title: 'Happy Work Anniversary!',
      message: 'Celebrating 25 years of dedicated service to education! Your passion for teaching and commitment to our students has been truly inspiring. Here\'s to many more years of making a difference!',
      recipient_name: 'Dr. Thompson',
      recipient_user_id: '4',
      ecard_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
      is_public: true,
      like_count: 89,
      comment_count: 45,
      celebration_date: '2024-01-16',
      created_at: '2024-01-13T16:45:00Z',
      user: {
        id: '3',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      },
      recipient: {
        first_name: 'Dr.',
        last_name: 'Thompson'
      }
    },
    {
      id: '4',
      user_id: '4',
      celebration_type: 'graduation',
      title: 'Congratulations Graduates!',
      message: 'To our amazing graduates - your hard work, dedication, and perseverance have paid off! We\'re so proud of your achievements. The future is bright with leaders like you!',
      is_public: true,
      like_count: 156,
      comment_count: 78,
      celebration_date: '2024-01-14',
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
    setCelebrations(mockCelebrations)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = celebrations

    if (searchQuery) {
      filtered = filtered.filter(celebration =>
        celebration.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebration.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebration.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebration.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebration.user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(celebration => celebration.celebration_type === selectedType)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.like_count - a.like_count)
        break
      case 'most-viewed':
        filtered.sort((a, b) => (b.like_count + b.comment_count) - (a.like_count + a.comment_count))
        break
    }

    setFilteredCelebrations(filtered)
  }, [celebrations, searchQuery, selectedType, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = (celebrationId: string) => {
    if (!isAuthenticated) return
    console.log('Liking celebration:', celebrationId)
    // TODO: API call to like celebration
  }

  const handleShare = (celebrationId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing celebration:', celebrationId)
    // TODO: API call to share celebration
  }

  const getCelebrationIcon = (type: string) => {
    const celebrationType = celebrationTypes.find(t => t.id === type)
    if (celebrationType) {
      const IconComponent = celebrationType.icon
      return <IconComponent className="w-4 h-4" />
    }
    return <PartyPopper className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <PartyPopper className="w-8 h-8 mr-3 text-yellow-600" />
                PrinciFest
              </h1>
              <p className="text-gray-600">Celebrating achievements, milestones, and special moments</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-fest/create"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Celebration
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
                  placeholder="Search celebrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                {celebrationTypes.map(type => (
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
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Liked</option>
                <option value="most-viewed">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <>
            {/* Celebration Types Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {celebrationTypes.map(type => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(selectedType === type.id ? '' : type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 bg-white hover:border-yellow-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-2 ${selectedType === type.id ? 'text-yellow-600' : 'text-gray-600'}`}>
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
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <PartyPopper className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Celebrations</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredCelebrations.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredCelebrations.reduce((sum, celebration) => sum + celebration.like_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Comments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredCelebrations.reduce((sum, celebration) => sum + celebration.comment_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">E-Cards</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredCelebrations.filter(celebration => celebration.ecard_url).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Celebrations Grid */}
            {filteredCelebrations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No celebrations found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCelebrations.map((celebration) => (
                  <div
                    key={celebration.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/princi-fest/${celebration.id}`}>
                      <div className="relative">
                        {celebration.ecard_url ? (
                          <img
                            src={celebration.ecard_url}
                            alt={celebration.title}
                            className="w-full h-64 object-cover rounded-t-lg"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                            <div className="text-center">
                              {getCelebrationIcon(celebration.celebration_type)}
                              <p className="text-sm text-gray-600 mt-2 capitalize">{celebration.celebration_type}</p>
                            </div>
                          </div>
                        )}

                        <div className="absolute top-2 left-2">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            {getCelebrationIcon(celebration.celebration_type)}
                            <span className="ml-1 capitalize">{celebration.celebration_type}</span>
                          </span>
                        </div>

                        {celebration.recipient_name && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-90 text-gray-800">
                              To: {celebration.recipient_name}
                            </span>
                          </div>
                        )}

                        {celebration.celebration_date && (
                          <div className="absolute bottom-2 left-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-black bg-opacity-75 text-white">
                              {formatDate(celebration.celebration_date)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={celebration.user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(celebration.user.first_name + ' ' + celebration.user.last_name)}&background=random`}
                              alt={celebration.user.first_name + ' ' + celebration.user.last_name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {celebration.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                by {celebration.user.first_name} {celebration.user.last_name}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(celebration.created_at)} • {celebration.user.school_name}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-4">
                          {celebration.message}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {celebration.like_count}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {celebration.comment_count}
                            </span>
                          </div>
                          {celebration.is_public && (
                            <span className="flex items-center text-green-600">
                              <Eye className="w-4 h-4 mr-1" />
                              Public
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleLike(celebration.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Like
                            </button>
                            <button
                              onClick={() => handleShare(celebration.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/princi-fest/${celebration.id}`}
                              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Link>
                            {isAuthenticated && (
                              <Link
                                to={`/princi-fest/${celebration.id}/send`}
                                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Send
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
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
