import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Heart as HeartIcon, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar,
  Users, 
  Star, 
  Brain, 
  Activity, 
  Shield, 
  Smile, 
  BookOpen, 
  Video, 
  Award, 
  Target,
  TrendingUp
} from 'lucide-react'

interface WellnessCategory {
  id: string
  name: string
  slug: string
  description: string
  icon_url?: string
}

interface WellnessResource {
  id: string
  wellness_category_id: string
  title: string
  description: string
  content: string
  media_url?: string
  thumbnail_url?: string
  is_premium: boolean
  view_count: number
  created_at: string
  wellness_category: {
    name: string
    slug: string
  }
}

interface WellnessChallenge {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  challenge_type: string
  is_active: boolean
  participant_count: number
  created_at: string
}

export const PrinciCarePage: React.FC = () => {
  const [resources, setResources] = useState<WellnessResource[]>([])
  const [challenges, setChallenges] = useState<WellnessChallenge[]>([])
  const [categories, setCategories] = useState<WellnessCategory[]>([])
  const [filteredResources, setFilteredResources] = useState<WellnessResource[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<WellnessChallenge[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeTab, setActiveTab] = useState('resources')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data - will be replaced with API calls
  const mockCategories: WellnessCategory[] = [
    { id: '1', name: 'Mental Health', slug: 'mental-health', description: 'Mindfulness and mental wellbeing' },
    { id: '2', name: 'Physical Wellness', slug: 'physical', description: 'Exercise and physical health' },
    { id: '3', name: 'Stress Management', slug: 'stress', description: 'Coping with stress and burnout' },
    { id: '4', name: 'Work-Life Balance', slug: 'work-life', description: 'Balancing professional and personal life' },
    { id: '5', name: 'Self-Care', slug: 'self-care', description: 'Personal care and self-compassion' }
  ]

  const mockResources: WellnessResource[] = [
    {
      id: '1',
      wellness_category_id: '1',
      title: 'Mindfulness Meditation for Educators',
      description: 'A comprehensive guide to incorporating mindfulness practices into your daily routine to reduce stress and improve focus.',
      content: 'Detailed mindfulness techniques specifically designed for educators facing high-stress environments.',
      media_url: 'https://sample-videos.com/wellness1.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      is_premium: false,
      view_count: 1247,
      created_at: '2024-01-15T10:00:00Z',
      wellness_category: {
        name: 'Mental Health',
        slug: 'mental-health'
      }
    },
    {
      id: '2',
      wellness_category_id: '2',
      title: 'Desk Exercises for Busy Teachers',
      description: 'Simple, effective exercises you can do at your desk during planning periods or breaks.',
      content: 'Complete workout routine with 15-minute sessions designed for classroom environments.',
      media_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      is_premium: false,
      view_count: 892,
      created_at: '2024-01-14T14:30:00Z',
      wellness_category: {
        name: 'Physical Wellness',
        slug: 'physical'
      }
    },
    {
      id: '3',
      wellness_category_id: '3',
      title: 'Managing Classroom Stress',
      description: 'Evidence-based strategies for handling classroom challenges and maintaining emotional balance.',
      content: 'Comprehensive guide covering stress identification, coping mechanisms, and long-term resilience building.',
      is_premium: true,
      view_count: 567,
      created_at: '2024-01-13T16:45:00Z',
      wellness_category: {
        name: 'Stress Management',
        slug: 'stress'
      }
    },
    {
      id: '4',
      wellness_category_id: '4',
      title: 'Setting Boundaries for Work-Life Balance',
      description: 'Learn how to establish healthy boundaries between your professional and personal life.',
      content: 'Practical tips for teachers to maintain work-life balance while staying committed to their students.',
      is_premium: false,
      view_count: 734,
      created_at: '2024-01-12T12:20:00Z',
      wellness_category: {
        name: 'Work-Life Balance',
        slug: 'work-life'
      }
    }
  ]

  const mockChallenges: WellnessChallenge[] = [
    {
      id: '1',
      title: '30-Day Mindfulness Challenge',
      description: 'Practice daily mindfulness meditation for 10 minutes each morning to build mental resilience.',
      start_date: '2024-02-01',
      end_date: '2024-03-02',
      challenge_type: 'mindfulness',
      is_active: true,
      participant_count: 234,
      created_at: '2024-01-20T00:00:00Z'
    },
    {
      id: '2',
      title: 'Healthy Habits Challenge',
      description: 'Focus on nutrition, exercise, and sleep hygiene for overall wellbeing.',
      start_date: '2024-01-15',
      end_date: '2024-02-15',
      challenge_type: 'fitness',
      is_active: true,
      participant_count: 189,
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      title: 'Gratitude Practice Challenge',
      description: 'Write down three things you\'re grateful for each day to foster positivity.',
      start_date: '2024-01-01',
      end_date: '2024-01-31',
      challenge_type: 'mindfulness',
      is_active: false,
      participant_count: 345,
      created_at: '2023-12-20T00:00:00Z'
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setCategories(mockCategories)
    setResources(mockResources)
    setChallenges(mockChallenges)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = resources

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.wellness_category_id === selectedCategory)
    }

    setFilteredResources(filtered)
  }, [resources, searchQuery, selectedCategory])

  useEffect(() => {
    let filtered = challenges

    if (searchQuery) {
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredChallenges(filtered)
  }, [challenges, searchQuery])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case 'mental-health':
        return <Brain className="w-5 h-5" />
      case 'physical':
        return <Activity className="w-5 h-5" />
      case 'stress':
        return <Shield className="w-5 h-5" />
      case 'work-life':
        return <HeartIcon className="w-5 h-5" />
      case 'self-care':
        return <Smile className="w-5 h-5" />
      default:
        return <HeartIcon className="w-5 h-5" />
    }
  }

  const getChallengeStatus = (challenge: WellnessChallenge) => {
    const now = new Date()
    const start = new Date(challenge.start_date)
    const end = new Date(challenge.end_date)

    if (now < start) return { status: 'upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (now >= start && now <= end && challenge.is_active) return { status: 'active', color: 'text-green-600', bgColor: 'bg-green-100' }
    return { status: 'completed', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <HeartIcon className="w-8 h-8 mr-3 text-rose-600" />
                PrinciCare
              </h1>
              <p className="text-gray-600">Wellness resources and mental health support for educators</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-care/create"
                className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'resources'
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'challenges'
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Challenges
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'resources' && (
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'resources' ? (
              <>
                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedCategory === category.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 bg-white hover:border-rose-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`mb-2 ${selectedCategory === category.id ? 'text-rose-600' : 'text-gray-600'}`}>
                          {getCategoryIcon(category.slug)}
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-rose-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-rose-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Resources</p>
                        <p className="text-2xl font-bold text-gray-900">{filteredResources.length}</p>
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
                          {filteredResources.reduce((sum, resource) => sum + resource.view_count, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Premium Resources</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredResources.filter(resource => resource.is_premium).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <HeartIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Categories</p>
                        <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resources Grid */}
                {filteredResources.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No resources found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                      >
                        {resource.is_premium && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-medium rounded-t-lg">
                            Premium Resource
                          </div>
                        )}

                        <Link to={`/princi-care/${resource.id}`}>
                          <div className="relative">
                            {resource.media_url ? (
                              resource.media_url.includes('video') ? (
                                <>
                                  <img
                                    src={resource.thumbnail_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'}
                                    alt={resource.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                                    <Video className="w-12 h-12 text-white" />
                                  </div>
                                </>
                              ) : (
                                <img
                                  src={resource.media_url}
                                  alt={resource.title}
                                  className="w-full h-48 object-cover rounded-t-lg"
                                />
                              )
                            ) : (
                              <div className="w-full h-48 bg-gradient-to-br from-rose-100 to-pink-100 rounded-t-lg flex items-center justify-center">
                                <div className="text-center">
                                  {getCategoryIcon(resource.wellness_category.slug)}
                                  <p className="text-sm text-gray-600 mt-2">{resource.wellness_category.name}</p>
                                </div>
                              </div>
                            )}

                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-800">
                                {resource.wellness_category.name}
                              </span>
                            </div>
                          </div>

                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {resource.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {resource.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {resource.view_count.toLocaleString()} views
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(resource.created_at)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                  {resource.media_url ? 'Media' : 'Article'}
                                </span>
                              </div>
                              <Link
                                to={`/princi-care/${resource.id}`}
                                className="inline-flex items-center px-4 py-2 bg-rose-600 text-white text-sm rounded-md hover:bg-rose-700 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Link>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Challenges Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-rose-100 rounded-lg">
                        <Target className="w-6 h-6 text-rose-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Challenges</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredChallenges.filter(c => c.is_active && new Date(c.start_date) <= new Date() && new Date(c.end_date) >= new Date()).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Participants</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredChallenges.reduce((sum, challenge) => sum + challenge.participant_count, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Upcoming</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredChallenges.filter(c => new Date(c.start_date) > new Date()).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredChallenges.filter(c => !c.is_active || new Date(c.end_date) < new Date()).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenges List */}
                {filteredChallenges.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No challenges found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredChallenges.map((challenge) => {
                      const { status, color, bgColor } = getChallengeStatus(challenge)
                      return (
                        <div
                          key={challenge.id}
                          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </span>
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
                                    {challenge.challenge_type}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {challenge.title}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                  {challenge.description}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-sm text-gray-500">Start Date</div>
                                <div className="font-medium text-gray-900">
                                  {formatDate(challenge.start_date)}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-500">End Date</div>
                                <div className="font-medium text-gray-900">
                                  {formatDate(challenge.end_date)}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-500">Participants</div>
                                <div className="font-medium text-gray-900 flex items-center justify-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {challenge.participant_count}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                Created {formatDate(challenge.created_at)}
                              </div>

                              {isAuthenticated && status === 'active' && (
                                <Link
                                  to={`/princi-care/challenges/${challenge.id}/join`}
                                  className="inline-flex items-center px-4 py-2 bg-rose-600 text-white text-sm rounded-md hover:bg-rose-700 transition-colors"
                                >
                                  <Users className="w-4 h-4 mr-2" />
                                  Join Challenge
                                </Link>
                              )}

                              {status === 'upcoming' && (
                                <Link
                                  to={`/princi-care/challenges/${challenge.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Link>
                              )}

                              {status === 'completed' && (
                                <Link
                                  to={`/princi-care/challenges/${challenge.id}/results`}
                                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                                >
                                  <Award className="w-4 h-4 mr-2" />
                                  View Results
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
