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
  Users,
  Star,
  Music,
  Camera,
  BookOpen,
  Palette,
  Gamepad2,
  Mountain,
  ChefHat,
  Dumbbell,
  Film,
  Play,
  FileText
} from 'lucide-react'

interface PassionCategory {
  id: string
  name: string
  slug: string
  description: string
  icon_url?: string
}

interface Passion {
  id: string
  user_id: string
  passion_category_id: string
  title: string
  description: string
  content_type: string
  media_url?: string
  thumbnail_url?: string
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
  passion_category: {
    name: string
    slug: string
  }
}

export const PrinciPassionsPage: React.FC = () => {
  const [passions, setPassions] = useState<Passion[]>([])
  const [categories, setCategories] = useState<PassionCategory[]>([])
  const [filteredPassions, setFilteredPassions] = useState<Passion[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data - will be replaced with API calls
  const mockCategories: PassionCategory[] = [
    { id: '1', name: 'Music', slug: 'music', description: 'Musical talents and performances' },
    { id: '2', name: 'Art', slug: 'art', description: 'Creative expressions and visual arts' },
    { id: '3', name: 'Sports', slug: 'sports', description: 'Athletic pursuits and fitness' },
    { id: '4', name: 'Cooking', slug: 'cooking', description: 'Culinary arts and recipes' },
    { id: '5', name: 'Photography', slug: 'photography', description: 'Capturing moments through lens' },
    { id: '6', name: 'Writing', slug: 'writing', description: 'Creative writing and storytelling' },
    { id: '7', name: 'Gaming', slug: 'gaming', description: 'Video games and competitive gaming' },
    { id: '8', name: 'Travel', slug: 'travel', description: 'Exploration and adventure' }
  ]

  const mockPassions: Passion[] = [
    {
      id: '1',
      user_id: '1',
      passion_category_id: '1',
      title: 'Classical Guitar Journey',
      description: 'Sharing my 5-year journey of learning classical guitar. From first chords to performing concerts, every moment has been magical.',
      content_type: 'video',
      media_url: 'https://sample-videos.com/passion1.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
      status: 'published',
      like_count: 124,
      comment_count: 28,
      created_at: '2024-01-15T10:00:00Z',
      user: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      passion_category: {
        name: 'Music',
        slug: 'music'
      }
    },
    {
      id: '2',
      user_id: '2',
      passion_category_id: '2',
      title: 'Digital Art Creations',
      description: 'Exploring the world of digital art using various software tools. Here are some of my recent creations inspired by nature.',
      content_type: 'image',
      media_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
      thumbnail_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
      status: 'published',
      like_count: 89,
      comment_count: 15,
      created_at: '2024-01-14T14:30:00Z',
      user: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      },
      passion_category: {
        name: 'Art',
        slug: 'art'
      }
    },
    {
      id: '3',
      user_id: '3',
      passion_category_id: '4',
      title: 'Fusion Cooking Adventures',
      description: 'Experimenting with fusion cuisine - combining traditional recipes with modern twists. My latest creation: Korean-Italian fusion!',
      content_type: 'post',
      status: 'published',
      like_count: 156,
      comment_count: 42,
      created_at: '2024-01-13T16:45:00Z',
      user: {
        id: '3',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      },
      passion_category: {
        name: 'Cooking',
        slug: 'cooking'
      }
    },
    {
      id: '4',
      user_id: '4',
      passion_category_id: '3',
      title: 'Marathon Training Journey',
      description: 'Documenting my preparation for my first full marathon. Tips, challenges, and the incredible community support I\'ve received.',
      content_type: 'post',
      status: 'published',
      like_count: 203,
      comment_count: 67,
      created_at: '2024-01-12T12:20:00Z',
      user: {
        id: '4',
        first_name: 'David',
        last_name: 'Kim',
        profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        school_name: 'East Valley Middle School'
      },
      passion_category: {
        name: 'Sports',
        slug: 'sports'
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setCategories(mockCategories)
    setPassions(mockPassions)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = passions

    if (searchQuery) {
      filtered = filtered.filter(passion =>
        passion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        passion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        passion.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        passion.user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(passion => passion.passion_category_id === selectedCategory)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.like_count - a.like_count)
        break
      case 'trending':
        filtered.sort((a, b) => (b.like_count + b.comment_count) - (a.like_count + a.comment_count))
        break
    }

    setFilteredPassions(filtered)
  }, [passions, searchQuery, selectedCategory, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = (passionId: string) => {
    if (!isAuthenticated) return
    console.log('Liking passion:', passionId)
    // TODO: API call to like passion
  }

  const handleShare = (passionId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing passion:', passionId)
    // TODO: API call to share passion
  }

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case 'music':
        return <Music className="w-5 h-5" />
      case 'art':
        return <Palette className="w-5 h-5" />
      case 'sports':
        return <Dumbbell className="w-5 h-5" />
      case 'cooking':
        return <ChefHat className="w-5 h-5" />
      case 'photography':
        return <Camera className="w-5 h-5" />
      case 'writing':
        return <BookOpen className="w-5 h-5" />
      case 'gaming':
        return <Gamepad2 className="w-5 h-5" />
      case 'travel':
        return <Mountain className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'video':
        return <Film className="w-4 h-4" />
      case 'image':
        return <Camera className="w-4 h-4" />
      case 'post':
        return <BookOpen className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
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
                <Heart className="w-8 h-8 mr-3 text-pink-600" />
                PrinciPassions
              </h1>
              <p className="text-gray-600">Share your passions and discover others</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-passions/create"
                className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Passion
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
                  placeholder="Search passions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
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
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Liked</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-2 ${selectedCategory === category.id ? 'text-pink-600' : 'text-gray-600'}`}>
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="text-xs font-medium text-gray-900">{category.name}</h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Passions</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredPassions.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Passionate Creators</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(filteredPassions.map(p => p.user_id)).size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Interactions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPassions.reduce((sum, passion) => sum + passion.like_count + passion.comment_count, 0).toLocaleString()}
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
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passions Grid */}
            {filteredPassions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No passions found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPassions.map((passion) => (
                  <div
                    key={passion.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/princi-passions/${passion.id}`}>
                      <div className="relative">
                        {passion.content_type === 'video' && passion.thumbnail_url ? (
                          <>
                            <img
                              src={passion.thumbnail_url}
                              alt={passion.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                              <Play className="w-12 h-12 text-white" />
                            </div>
                          </>
                        ) : passion.content_type === 'image' && passion.media_url ? (
                          <img
                            src={passion.media_url}
                            alt={passion.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                            <div className="text-center">
                              {getCategoryIcon(passion.passion_category.slug)}
                              <p className="text-sm text-gray-600 mt-2">{passion.passion_category.name}</p>
                            </div>
                          </div>
                        )}

                        <div className="absolute top-2 left-2">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">
                            {getContentTypeIcon(passion.content_type)}
                            <span className="ml-1 capitalize">{passion.content_type}</span>
                          </span>
                        </div>

                        <div className="absolute top-2 right-2">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-90 text-gray-800">
                            {getCategoryIcon(passion.passion_category.slug)}
                            <span className="ml-1">{passion.passion_category.name}</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {passion.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {passion.description}
                        </p>

                        <div className="flex items-center mb-4">
                          <img
                            src={passion.user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(passion.user.first_name + ' ' + passion.user.last_name)}&background=random`}
                            alt={passion.user.first_name + ' ' + passion.user.last_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {passion.user.first_name} {passion.user.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{passion.user.school_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {passion.like_count}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {passion.comment_count}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(passion.created_at)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleLike(passion.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Like
                            </button>
                            <button
                              onClick={() => handleShare(passion.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </button>
                          </div>
                          <Link
                            to={`/princi-passions/${passion.id}`}
                            className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700 transition-colors"
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
        )}
      </div>
    </div>
  )
}
