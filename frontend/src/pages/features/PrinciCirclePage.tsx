import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Heart, 
  MessageCircle, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar, 
  Users, 
  Clock,
  Star,
  MessageSquare,
  UserPlus,
  Crown,
  Shield,
  Lock,
  Globe,
  BookOpen,
  Target
} from 'lucide-react'

interface Forum {
  id: string
  name: string
  description: string
  category: string
  is_private: boolean
  member_count: number
  post_count: number
  created_at: string
  last_activity?: string
}

interface Thread {
  id: string
  forum_id: string
  user_id: string
  title: string
  content: string
  is_pinned: boolean
  is_locked: boolean
  view_count: number
  reply_count: number
  last_reply_at?: string
  created_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  forum: {
    name: string
    is_private: boolean
  }
}

export const PrinciCirclePage: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([])
  const [threads, setThreads] = useState<Thread[]>([])
  const [filteredForums, setFilteredForums] = useState<Forum[]>([])
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeTab, setActiveTab] = useState('forums')
  const [sortBy, setSortBy] = useState('recent')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const forumCategories = [
    { id: '', name: 'All Categories', icon: MessageSquare, color: '#6B7280' },
    { id: 'leadership', name: 'Leadership', icon: Crown, color: '#3B82F6' },
    { id: 'teaching', name: 'Teaching', icon: BookOpen, color: '#10B981' },
    { id: 'technology', name: 'Technology', icon: Target, color: '#F59E0B' },
    { id: 'wellness', name: 'Wellness', icon: Heart, color: '#8B5CF6' },
    { id: 'policy', name: 'Policy', icon: Shield, color: '#EF4444' },
    { id: 'general', name: 'General', icon: MessageSquare, color: '#6366F1' }
  ]

  // Mock data - will be replaced with API calls
  const mockForums: Forum[] = [
    {
      id: '1',
      name: 'Educational Leadership Forum',
      description: 'Discussion forum for school administrators and educational leaders. Share experiences, ask questions, and learn from peers.',
      category: 'leadership',
      is_private: false,
      member_count: 1247,
      post_count: 3456,
      created_at: '2023-01-15T00:00:00Z',
      last_activity: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      name: 'Classroom Innovation Hub',
      description: 'A space for teachers to share innovative teaching methods, lesson plans, and classroom strategies.',
      category: 'teaching',
      is_private: false,
      member_count: 2156,
      post_count: 5678,
      created_at: '2023-02-10T00:00:00Z',
      last_activity: '2024-01-20T16:45:00Z'
    },
    {
      id: '3',
      name: 'EdTech Integration Group',
      description: 'Private forum for discussing technology integration in education. Members only - invitation required.',
      category: 'technology',
      is_private: true,
      member_count: 456,
      post_count: 1234,
      created_at: '2023-03-05T00:00:00Z',
      last_activity: '2024-01-19T11:20:00Z'
    },
    {
      id: '4',
      name: 'Educator Wellness Community',
      description: 'Support community for teacher wellbeing, stress management, and work-life balance discussions.',
      category: 'wellness',
      is_private: false,
      member_count: 1893,
      post_count: 4231,
      created_at: '2023-04-12T00:00:00Z',
      last_activity: '2024-01-20T09:15:00Z'
    }
  ]

  const mockThreads: Thread[] = [
    {
      id: '1',
      forum_id: '1',
      user_id: '1',
      title: 'Implementing Restorative Justice in Schools',
      content: 'Has anyone implemented restorative justice practices in their school? I\'d love to hear about your experiences and challenges.',
      is_pinned: true,
      is_locked: false,
      view_count: 234,
      reply_count: 45,
      last_reply_at: '2024-01-20T14:30:00Z',
      created_at: '2024-01-18T10:00:00Z',
      user: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      forum: {
        name: 'Educational Leadership Forum',
        is_private: false
      }
    },
    {
      id: '2',
      forum_id: '2',
      user_id: '2',
      title: 'Gamification in Math Classes',
      content: 'I\'ve been experimenting with gamification in my middle school math classes. The results have been amazing! Student engagement is up 40%.',
      is_pinned: false,
      is_locked: false,
      view_count: 189,
      reply_count: 23,
      last_reply_at: '2024-01-20T12:15:00Z',
      created_at: '2024-01-19T14:20:00Z',
      user: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      },
      forum: {
        name: 'Classroom Innovation Hub',
        is_private: false
      }
    },
    {
      id: '3',
      forum_id: '4',
      user_id: '3',
      title: 'Burnout Prevention Strategies',
      content: 'As we head into the new semester, I wanted to share some burnout prevention strategies that have worked for me.',
      is_pinned: false,
      is_locked: false,
      view_count: 345,
      reply_count: 67,
      last_reply_at: '2024-01-20T16:45:00Z',
      created_at: '2024-01-17T08:30:00Z',
      user: {
        id: '3',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      },
      forum: {
        name: 'Educator Wellness Community',
        is_private: false
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setForums(mockForums)
    setThreads(mockThreads)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = forums

    if (searchQuery) {
      filtered = filtered.filter(forum =>
        forum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        forum.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(forum => forum.category === selectedCategory)
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.last_activity || b.created_at).getTime() - new Date(a.last_activity || a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.member_count - a.member_count)
        break
      case 'active':
        filtered.sort((a, b) => b.post_count - a.post_count)
        break
    }

    setFilteredForums(filtered)
  }, [forums, searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    let filtered = threads

    if (searchQuery) {
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.last_reply_at || b.created_at).getTime() - new Date(a.last_reply_at || a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.reply_count - a.reply_count)
        break
      case 'active':
        filtered.sort((a, b) => b.view_count - a.view_count)
        break
    }

    setFilteredThreads(filtered)
  }, [threads, searchQuery, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCategoryIcon = (category: string) => {
    const forumCategory = forumCategories.find(c => c.id === category)
    if (forumCategory) {
      const IconComponent = forumCategory.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <MessageSquare className="w-5 h-5" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <MessageSquare className="w-8 h-8 mr-3 text-emerald-600" />
                PrinciCircle
              </h1>
              <p className="text-gray-600">Discussion forums and community conversations</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-circle/create"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Forum
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('forums')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'forums'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Forums
            </button>
            <button
              onClick={() => setActiveTab('threads')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'threads'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Recent Threads
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'forums' && (
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                >
                  {forumCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'forums' ? (
              <>
                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                  {forumCategories.map(category => {
                    const IconComponent = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedCategory === category.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`mb-2 ${selectedCategory === category.id ? 'text-emerald-600' : 'text-gray-600'}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className="text-xs font-medium text-gray-900">{category.name}</h3>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Forums</p>
                        <p className="text-2xl font-bold text-gray-900">{filteredForums.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Members</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredForums.reduce((sum, forum) => sum + forum.member_count, 0).toLocaleString()}
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
                        <p className="text-sm font-medium text-gray-600">Total Posts</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredForums.reduce((sum, forum) => sum + forum.post_count, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Lock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Private Forums</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredForums.filter(forum => forum.is_private).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forums Grid */}
                {filteredForums.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No forums found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredForums.map((forum) => (
                      <div
                        key={forum.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                      >
                        <Link to={`/princi-circle/${forum.id}`}>
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                {forum.is_private ? (
                                  <Lock className="w-5 h-5 text-gray-600" />
                                ) : (
                                  <Globe className="w-5 h-5 text-green-600" />
                                )}
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
                                  {getCategoryIcon(forum.category)}
                                  <span className="ml-1">{forum.category}</span>
                                </span>
                              </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {forum.name}
                            </h3>

                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {forum.description}
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{forum.member_count.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">Members</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{forum.post_count.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">Posts</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">
                                  {forum.last_activity ? formatDate(forum.last_activity) : 'Never'}
                                </div>
                                <div className="text-xs text-gray-500">Last Activity</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                Created {formatDate(forum.created_at)}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Link
                                  to={`/princi-circle/${forum.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Forum
                                </Link>

                                {isAuthenticated && !forum.is_private && (
                                  <Link
                                    to={`/princi-circle/${forum.id}/join`}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Join
                                  </Link>
                                )}

                                {forum.is_private && (
                                  <span className="inline-flex items-center px-4 py-2 bg-gray-400 text-white text-sm rounded-md cursor-not-allowed">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Private
                                  </span>
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
            ) : (
              <>
                {/* Recent Threads */}
                {filteredThreads.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No threads found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredThreads.map((thread) => (
                      <div
                        key={thread.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={thread.user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(thread.user.first_name + ' ' + thread.user.last_name)}&background=random`}
                                alt={thread.user.first_name + ' ' + thread.user.last_name}
                                className="w-12 h-12 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  {thread.is_pinned && (
                                    <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                      <Star className="w-3 h-3 mr-1" />
                                      Pinned
                                    </span>
                                  )}
                                  {thread.is_locked && (
                                    <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                      <Lock className="w-3 h-3 mr-1" />
                                      Locked
                                    </span>
                                  )}
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                    {thread.forum.name}
                                  </span>
                                </div>

                                <Link to={`/princi-circle/threads/${thread.id}`}>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                                    {thread.title}
                                  </h3>
                                </Link>

                                <p className="text-gray-600 mb-3 line-clamp-2">
                                  {thread.content}
                                </p>

                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {thread.view_count} views
                                  </span>
                                  <span className="flex items-center">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    {thread.reply_count} replies
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(thread.created_at)}
                                  </span>
                                  {thread.last_reply_at && (
                                    <span className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      Last reply {formatDate(thread.last_reply_at)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">
                                by {thread.user.first_name} {thread.user.last_name} • {thread.user.school_name}
                              </span>
                            </div>

                            <Link
                              to={`/princi-circle/threads/${thread.id}`}
                              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Thread
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
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
