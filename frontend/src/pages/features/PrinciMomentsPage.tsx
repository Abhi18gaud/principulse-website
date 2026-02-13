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
  MapPin,
  Play,
  Camera,
  Sparkles,
  Gift
} from 'lucide-react'

interface Occasion {
  id: string
  name: string
  slug: string
  description: string
  occasion_type: string
  is_recurring: boolean
  is_active: boolean
}

interface Moment {
  id: string
  user_id: string
  occasion_id: string
  title: string
  message: string
  video_url: string
  thumbnail_url: string
  duration: number
  status: string
  like_count: number
  comment_count: number
  created_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  occasion: {
    name: string
    occasion_type: string
  }
}

export const PrinciMomentsPage: React.FC = () => {
  const [moments, setMoments] = useState<Moment[]>([])
  const [occasions, setOccasions] = useState<Occasion[]>([])
  const [filteredMoments, setFilteredMoments] = useState<Moment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data - will be replaced with API calls
  const mockOccasions: Occasion[] = [
    { id: '1', name: 'Diwali', slug: 'diwali', description: 'Festival of Lights', occasion_type: 'festival', is_recurring: true, is_active: true },
    { id: '2', name: 'Christmas', slug: 'christmas', description: 'Christmas celebrations', occasion_type: 'festival', is_recurring: true, is_active: true },
    { id: '3', name: 'Teacher\'s Day', slug: 'teachers-day', description: 'Celebrating educators', occasion_type: 'special_day', is_recurring: true, is_active: true },
    { id: '4', name: 'Independence Day', slug: 'independence-day', description: 'National celebration', occasion_type: 'national_day', is_recurring: true, is_active: true },
    { id: '5', name: 'New Year', slug: 'new-year', description: 'Welcome the new year', occasion_type: 'festival', is_recurring: true, is_active: true }
  ]

  const mockMoments: Moment[] = [
    {
      id: '1',
      user_id: '1',
      occasion_id: '1',
      title: 'Diwali Celebrations at Lincoln High',
      message: 'What a beautiful Diwali celebration we had at our school! The students prepared amazing decorations and performances.',
      video_url: 'https://sample-videos.com/moment1.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      duration: 180,
      status: 'ready',
      like_count: 45,
      comment_count: 12,
      created_at: '2024-01-15T10:00:00Z',
      user: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      occasion: {
        name: 'Diwali',
        occasion_type: 'festival'
      }
    },
    {
      id: '2',
      user_id: '2',
      occasion_id: '3',
      title: 'Teacher\'s Day Special Assembly',
      message: 'Our students surprised us with an incredible Teacher\'s Day celebration. Heartwarming moments and lots of love!',
      video_url: 'https://sample-videos.com/moment2.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      duration: 240,
      status: 'ready',
      like_count: 67,
      comment_count: 23,
      created_at: '2024-01-14T14:30:00Z',
      user: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      },
      occasion: {
        name: 'Teacher\'s Day',
        occasion_type: 'special_day'
      }
    },
    {
      id: '3',
      user_id: '3',
      occasion_id: '2',
      title: 'Christmas Carol Singing',
      message: 'The annual Christmas carol singing brought joy to everyone. Our students\' voices filled the air with beautiful melodies.',
      video_url: 'https://sample-videos.com/moment3.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
      duration: 320,
      status: 'ready',
      like_count: 89,
      comment_count: 34,
      created_at: '2024-01-13T16:45:00Z',
      user: {
        id: '3',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      },
      occasion: {
        name: 'Christmas',
        occasion_type: 'festival'
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setOccasions(mockOccasions)
    setMoments(mockMoments)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = moments

    if (searchQuery) {
      filtered = filtered.filter(moment =>
        moment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment.user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedOccasion) {
      filtered = filtered.filter(moment => moment.occasion_id === selectedOccasion)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.like_count - a.like_count)
        break
      case 'most-viewed':
        filtered.sort((a, b) => b.comment_count - a.comment_count)
        break
    }

    setFilteredMoments(filtered)
  }, [moments, searchQuery, selectedOccasion, sortBy])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = (momentId: string) => {
    if (!isAuthenticated) return
    console.log('Liking moment:', momentId)
    // TODO: API call to like moment
  }

  const handleShare = (momentId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing moment:', momentId)
    // TODO: API call to share moment
  }

  const getOccasionIcon = (occasionType: string) => {
    switch (occasionType) {
      case 'festival':
        return <Sparkles className="w-4 h-4" />
      case 'special_day':
        return <Gift className="w-4 h-4" />
      case 'national_day':
        return <MapPin className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-purple-600" />
                PrinciMoments
              </h1>
              <p className="text-gray-600">Celebrating festivals and special moments</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-moments/create"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Moment
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
                  placeholder="Search moments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="">All Occasions</option>
                {occasions.map(occasion => (
                  <option key={occasion.id} value={occasion.id}>
                    {occasion.name}
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
                <option value="popular">Most Liked</option>
                <option value="most-viewed">Most Viewed</option>
              </select>
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
            {/* Occasions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {occasions.slice(0, 5).map(occasion => (
                <button
                  key={occasion.id}
                  onClick={() => setSelectedOccasion(selectedOccasion === occasion.id ? '' : occasion.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedOccasion === occasion.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-2 ${selectedOccasion === occasion.id ? 'text-purple-600' : 'text-gray-600'}`}>
                      {getOccasionIcon(occasion.occasion_type)}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">{occasion.name}</h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Moments Grid */}
            {filteredMoments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No moments found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMoments.map((moment) => (
                  <div
                    key={moment.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/princi-moments/${moment.id}`}>
                      <div className="relative">
                        <img
                          src={moment.thumbnail_url}
                          alt={moment.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {getOccasionIcon(moment.occasion.occasion_type)}
                            <span className="ml-1">{moment.occasion.name}</span>
                          </span>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-black bg-opacity-75 text-white">
                            {formatDuration(moment.duration)}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {moment.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {moment.message}
                        </p>

                        <div className="flex items-center mb-4">
                          <img
                            src={moment.user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(moment.user.first_name + ' ' + moment.user.last_name)}&background=random`}
                            alt={moment.user.first_name + ' ' + moment.user.last_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {moment.user.first_name} {moment.user.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{moment.user.school_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {moment.like_count}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {moment.comment_count}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(moment.created_at)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleLike(moment.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Like
                            </button>
                            <button
                              onClick={() => handleShare(moment.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </button>
                          </div>
                          <Link
                            to={`/princi-moments/${moment.id}`}
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Watch
                          </Link>
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
