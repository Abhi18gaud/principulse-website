import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Heart, 
  Share2, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar, 
  Flame
} from 'lucide-react'

interface TorchMessage {
  id: string
  title: string
  content: string
  author: {
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
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  created_at: string
  updated_at: string
}

export const PrinciTorchPage: React.FC = () => {
  const [messages, setMessages] = useState<TorchMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<TorchMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data
  const mockMessages: TorchMessage[] = [
    {
      id: '1',
      title: 'Light the Path: Leadership in Uncertain Times',
      content: 'In these challenging times, true leadership emerges not from certainty, but from the courage to navigate uncertainty. As principals, we must be the steady flame that guides our schools through darkness, illuminating paths where others see only obstacles.',
      author: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      category: {
        id: '1',
        name: 'Leadership',
        color: '#3B82F6'
      },
      tags: [
        { id: '1', name: 'Leadership', color: '#3B82F6' },
        { id: '2', name: 'Inspiration', color: '#10B981' }
      ],
      is_featured: true,
      view_count: 2340,
      like_count: 456,
      comment_count: 89,
      share_count: 123,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'The Spark of Innovation in Education',
      content: 'Innovation is not about reinventing the wheel; it\'s about finding new ways to make it roll better. Every teacher in your school holds a spark of creativity - our job as leaders is to fan those sparks into flames.',
      author: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      },
      category: {
        id: '2',
        name: 'Innovation',
        color: '#10B981'
      },
      tags: [
        { id: '3', name: 'Innovation', color: '#10B981' },
        { id: '4', name: 'Teaching', color: '#6366F1' }
      ],
      is_featured: false,
      view_count: 1856,
      like_count: 234,
      comment_count: 45,
      share_count: 67,
      created_at: '2024-01-14T14:30:00Z',
      updated_at: '2024-01-14T14:30:00Z'
    }
  ]

  const categories = [
    { id: '', name: 'All Categories', color: '#6B7280' },
    { id: '1', name: 'Leadership', color: '#3B82F6' },
    { id: '2', name: 'Innovation', color: '#10B981' },
    { id: '3', name: 'Student Success', color: '#8B5CF6' },
    { id: '4', name: 'Motivation', color: '#F59E0B' },
    { id: '5', name: 'Community', color: '#6366F1' }
  ]

  useEffect(() => {
    setMessages(mockMessages)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = messages

    if (searchQuery) {
      filtered = filtered.filter(message =>
        message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(message => message.category.id === selectedCategory)
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
        filtered = filtered.filter(message => message.is_featured)
        break
    }

    setFilteredMessages(filtered)
  }, [messages, searchQuery, selectedCategory, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = (messageId: string) => {
    if (!isAuthenticated) return
    console.log('Liking message:', messageId)
  }

  const handleShare = (messageId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing message:', messageId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Flame className="w-8 h-8 mr-3 text-orange-600" />
                PrinciTorch
              </h1>
              <p className="text-gray-600">Igniting minds with motivational messages</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-torch/create"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Torch Message
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
                  placeholder="Search torch messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
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
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Viewed</option>
                <option value="liked">Most Liked</option>
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
            {/* Messages Grid */}
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No torch messages found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/princi-torch/${message.id}`}>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-3">
                            <Flame className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <span
                              className="px-2 py-1 text-xs font-medium rounded-full"
                              style={{ backgroundColor: message.category.color + '20', color: message.category.color }}
                            >
                              {message.category.name}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                          {message.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {message.content}
                        </p>

                        <div className="flex items-center mb-4">
                          <img
                            src={message.author.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.author.first_name + ' ' + message.author.last_name)}&background=random`}
                            alt={message.author.first_name + ' ' + message.author.last_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {message.author.first_name} {message.author.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{message.author.school_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {message.view_count}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(message.created_at)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleLike(message.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              {message.like_count}
                            </button>
                            <button
                              onClick={() => handleShare(message.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              {message.share_count}
                            </button>
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
