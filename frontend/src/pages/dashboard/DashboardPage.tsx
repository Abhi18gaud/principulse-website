import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { userService, princiPostsService, princiVoiceService } from '@/services'
import {
  TrendingUp,
  Award,
  CheckCircle,
  Users,
  MessageSquare,
  Video,
  Calendar,
  BookOpen,
  Heart,
  Star,
  Bell,
  Plus,
  Eye,
  ThumbsUp,
  Share2,
  Target,
  Shield
} from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [userStats, setUserStats] = useState<any>(null)
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [recentVideos, setRecentVideos] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        
        // Load user profile and stats
        const userProfile = await userService.getProfile()
        setUserStats(userProfile.stats)

        // Load recent posts and videos
        const [postsResponse, videosResponse] = await Promise.all([
          princiPostsService.getPosts({ limit: 5, sortBy: 'latest' }),
          princiVoiceService.getVideos({ limit: 5, sortBy: 'latest' })
        ])
        
        setRecentPosts(postsResponse.posts)
        setRecentVideos(videosResponse.videos)

        // Load notifications
        const notificationsResponse = await userService.getNotifications({ limit: 5 })
        setNotifications(notificationsResponse.notifications || [])

      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Mock data - in real app, this would come from API
  const stats = {
    posts: 12,
    followers: 245,
    engagement: 89,
    achievements: 5
  }

  const recentActivities = [
    {
      id: 1,
      type: 'post',
      title: 'Shared a new PrinciPost',
      description: 'Leadership in the Digital Age',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'video',
      title: 'Uploaded PrinciVoice video',
      description: 'Student Engagement Strategies',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      icon: Video,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Earned Top Contributor badge',
      description: 'For outstanding community engagement',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'event',
      title: 'Attended PrinciEdge webinar',
      description: 'Digital Transformation in Education',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      icon: Calendar,
      color: 'text-purple-600'
    }
  ]

  const quickActions = [
    {
      title: 'Create Post',
      description: 'Share your insights',
      icon: Plus,
      path: '/princi-posts/create',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600'
    },
    {
      title: 'Upload Video',
      description: 'Record PrinciVoice',
      icon: Video,
      path: '/princi-voice/create',
      color: 'bg-green-50 hover:bg-green-100 text-green-600'
    },
    {
      title: 'Share Moment',
      description: 'Celebrate occasions',
      icon: Calendar,
      path: '/princi-moments/create',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-600'
    },
    {
      title: 'Start Discussion',
      description: 'Join PrinciCircle',
      icon: MessageSquare,
      path: '/princi-circle',
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-600'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: Target,
      path: '/princi-quest',
      color: 'bg-red-50 hover:bg-red-100 text-red-600'
    },
    {
      title: 'Browse Resources',
      description: 'Access PrinciTorch',
      icon: BookOpen,
      path: '/princi-torch',
      color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Join Workshop',
      description: 'Skill building',
      icon: Award,
      path: '/princi-catalyst',
      color: 'bg-amber-50 hover:bg-amber-100 text-amber-600'
    },
    {
      title: 'Attend Event',
      description: 'Webinars & seminars',
      icon: Users,
      path: '/princi-edge',
      color: 'bg-violet-50 hover:bg-violet-100 text-violet-600'
    },
    {
      title: 'Share Passion',
      description: 'Personal hobbies',
      icon: Heart,
      path: '/principassions',
      color: 'bg-rose-50 hover:bg-rose-100 text-rose-600'
    },
    {
      title: 'Flash News',
      description: 'School updates',
      icon: TrendingUp,
      path: '/princi-flash',
      color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Wellness',
      description: 'Self-care resources',
      icon: Shield,
      path: '/princi-care',
      color: 'bg-teal-50 hover:bg-teal-100 text-teal-600'
    },
    {
      title: 'Celebrations',
      description: 'Special moments',
      icon: Star,
      path: '/princi-fest',
      color: 'bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-600'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      Welcome back, {user?.firstName || 'Principal'}! 👋
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {user?.schoolName ? `Leading excellence at ${user?.schoolName}` : 'Your gateway to educational leadership'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-blue-100">Member since</p>
                  <p className="text-xl font-bold">{formatTimestamp(new Date().toISOString())}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-blue-100">Current Role</p>
                  <p className="text-xl font-bold">{user?.position || 'Principal'}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                <span className="text-sm font-medium">Profile Complete</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-yellow-300 mr-2" />
                <span className="text-sm font-medium">{stats.achievements} Achievements</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-sm font-medium">Top Contributor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.posts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Followers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.followers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement</p>
                <p className="text-3xl font-bold text-gray-900">{stats.engagement}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+5%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-3xl font-bold text-gray-900">{stats.achievements}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600 font-medium">Latest: Top Contributor</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <IconComponent className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-2">{formatTimestamp(activity.timestamp)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">127</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="p-6 border-t border-gray-100">
                <Link to="/activity" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all activity →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <button
                      key={index}
                      onClick={() => navigate(action.path)}
                      className={`w-full p-4 rounded-lg transition-all duration-200 ${action.color} border border-transparent hover:shadow-md`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{action.title}</p>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">PrinciEdge Webinar</p>
                    <p className="text-sm text-gray-600">Digital Leadership in 2024</p>
                    <p className="text-xs text-gray-500 mt-1">Tomorrow at 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">PrinciHub Meetup</p>
                    <p className="text-sm text-gray-600">Delhi Chapter Networking</p>
                    <p className="text-xs text-gray-500 mt-1">Friday at 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/events" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all events →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
