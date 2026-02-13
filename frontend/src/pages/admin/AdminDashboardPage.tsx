import React, { useState, useEffect } from 'react'
import {
  Users,
  MessageSquare,
  Video,
  BookOpen,
  TrendingUp,
  Eye,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  Settings,
  BarChart3
} from 'lucide-react'

export const AdminDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 12453,
    activeUsers: 8921,
    totalPosts: 3456,
    totalVideos: 789,
    totalEngagement: 45231,
    pendingApprovals: 23,
    reportedContent: 7,
    systemHealth: 98
  }

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      action: 'New user registration',
      user: 'Dr. Priya Sharma',
      school: 'Delhi Public School',
      timestamp: '2 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'content',
      action: 'Post reported',
      user: 'Principal Kumar',
      content: 'Leadership Strategies',
      timestamp: '15 minutes ago',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'content',
      action: 'Video approved',
      user: 'Vice Principal Patel',
      content: 'Student Engagement',
      timestamp: '1 hour ago',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'system',
      action: 'Backup completed',
      details: 'Daily database backup',
      timestamp: '3 hours ago',
      icon: Shield,
      color: 'text-purple-600'
    }
  ]

  const topContent = [
    {
      id: 1,
      title: 'Digital Leadership in Modern Schools',
      author: 'Dr. Rajesh Kumar',
      type: 'post',
      views: 2341,
      likes: 156,
      comments: 23,
      engagement: 89
    },
    {
      id: 2,
      title: 'Student Mental Health Strategies',
      author: 'Dr. Meera Singh',
      type: 'video',
      views: 1892,
      likes: 134,
      comments: 18,
      engagement: 76
    },
    {
      id: 3,
      title: 'Curriculum Innovation',
      author: 'Principal Agarwal',
      type: 'post',
      views: 1654,
      likes: 98,
      comments: 31,
      engagement: 72
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-gray-600">Monitor and manage the Principulse platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">{new Date().toLocaleTimeString()}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-3xl font-bold text-gray-900">{(stats.totalPosts + stats.totalVideos).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+15.3%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-3xl font-bold text-gray-900">{stats.systemHealth}%</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <Clock className="w-5 h-5 text-gray-400" />
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
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.user && <span className="font-medium">{activity.user}</span>}
                            {activity.school && <span> • {activity.school}</span>}
                            {activity.content && <span> • {activity.content}</span>}
                            {activity.details && <span> • {activity.details}</span>}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions & Alerts */}
          <div>
            {/* Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Alerts</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Pending Approvals</p>
                    <p className="text-sm text-yellow-700">{stats.pendingApprovals} posts awaiting review</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Reported Content</p>
                    <p className="text-sm text-red-700">{stats.reportedContent} reports need attention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Manage Users</span>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Review Content</span>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">View Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Content Table */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Top Performing Content</h2>
              <p className="text-gray-600 mt-1">Most engaged content this week</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Engagement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topContent.map((content) => (
                    <tr key={content.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                            content.type === 'post' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            {content.type === 'post' ? (
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Video className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{content.title}</div>
                            <div className="text-sm text-gray-500 capitalize">{content.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{content.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Eye className="w-4 h-4 mr-1 text-gray-400" />
                          {content.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center mr-2">
                            <ThumbsUp className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="text-sm text-gray-900 mr-3">{content.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="text-sm text-gray-900">{content.comments}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
