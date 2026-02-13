import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { adminService, analyticsService } from '@/services'
import {
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

interface AnalyticsCard {
  title: string
  value: string | number
  change: number
  icon: React.ElementType
  color: string
}

interface ChartData {
  name: string
  value: number
  change?: number
}

export const AdminAnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('overview')
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        
        // Calculate date range based on selected period
        const endDate = new Date()
        const startDate = new Date()
        
        switch (selectedPeriod) {
          case '24h':
            startDate.setDate(startDate.getDate() - 1)
            break
          case '7d':
            startDate.setDate(startDate.getDate() - 7)
            break
          case '30d':
            startDate.setDate(startDate.getDate() - 30)
            break
          case '90d':
            startDate.setDate(startDate.getDate() - 90)
            break
          default:
            startDate.setDate(startDate.getDate() - 7)
        }

        const analyticsData = await adminService.getAnalytics({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          period: selectedPeriod === '24h' ? 'day' : selectedPeriod === '7d' ? 'week' : 'month'
        })

        setAnalytics(analyticsData)
      } catch (error) {
        console.error('Error loading analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [selectedPeriod])

  const trackAnalyticsView = async () => {
    await analyticsService.trackEvent({
      eventType: 'page_view',
      resourceType: 'admin_analytics',
      metadata: { period: selectedPeriod, metric: selectedMetric }
    })
  }

  useEffect(() => {
    trackAnalyticsView()
  }, [selectedPeriod, selectedMetric])

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const exportAnalytics = async () => {
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)

      const blob = await adminService.exportAnalytics({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        format: 'csv'
      })

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${selectedPeriod}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      await analyticsService.trackEvent({
        eventType: 'export',
        resourceType: 'analytics',
        metadata: { period: selectedPeriod, format: 'csv' }
      })
    } catch (error) {
      console.error('Error exporting analytics:', error)
    }
  }

  const analyticsCards: AnalyticsCard[] = analytics ? [
    {
      title: 'Total Users',
      value: formatNumber(analytics.overview.totalUsers),
      change: analytics.growth.userGrowth,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: formatNumber(analytics.overview.activeUsers),
      change: analytics.growth.userGrowth,
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Total Posts',
      value: formatNumber(analytics.overview.totalPosts),
      change: analytics.growth.postGrowth,
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Total Videos',
      value: formatNumber(analytics.overview.totalVideos),
      change: analytics.growth.videoGrowth,
      icon: Eye,
      color: 'orange'
    },
    {
      title: 'Total Engagement',
      value: formatNumber(analytics.overview.totalEngagement),
      change: analytics.growth.engagementGrowth,
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Revenue',
      value: `$${formatNumber(analytics.overview.totalRevenue)}`,
      change: analytics.revenueStats.revenueThisMonth / analytics.revenueStats.revenueLastMonth * 100 - 100,
      icon: DollarSign,
      color: 'green'
    }
  ] : []

  const userActivityData = analytics?.userActivity?.dailyActiveUsers?.map((item: any) => ({
    name: new Date(item.date).toLocaleDateString(),
    value: item.count
  })) || []

  const contentPerformanceData = analytics?.topContent?.posts?.map((post: any) => ({
    name: post.title.substring(0, 30) + '...',
    views: post.views,
    likes: post.likes,
    comments: post.comments
  })) || []

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor platform performance and user engagement</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>

            {/* Export Button */}
            <button
              onClick={exportAnalytics}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {analyticsCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${card.color}-100 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <div className={`flex items-center ${getChangeColor(card.change)}`}>
                    {getChangeIcon(card.change)}
                    <span className="text-sm font-medium ml-1">
                      {Math.abs(card.change)}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Activity Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Activity</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Daily active users over selected period
                </p>
              </div>
            </div>
            
            {/* Sample data points */}
            <div className="mt-4 space-y-2">
              {userActivityData.slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium">{item.value} users</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Content</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Content performance chart</p>
                <p className="text-sm text-gray-400 mt-2">
                  Most engaging content
                </p>
              </div>
            </div>
            
            {/* Top performing content */}
            <div className="mt-4 space-y-3">
              {contentPerformanceData.slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(item.views)}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {formatNumber(item.likes)}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {formatNumber(item.comments)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New Today</span>
                <span className="font-medium">{analytics?.userStats?.newUsersToday || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New This Week</span>
                <span className="font-medium">{analytics?.userStats?.newUsersThisWeek || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New This Month</span>
                <span className="font-medium">{analytics?.userStats?.newUsersThisMonth || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Retention Rate</span>
                <span className="font-medium">{analytics?.userStats?.userRetentionRate || 0}%</span>
              </div>
            </div>
          </div>

          {/* Content Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Posts Today</span>
                <span className="font-medium">{analytics?.contentStats?.postsToday || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Videos Today</span>
                <span className="font-medium">{analytics?.contentStats?.videosToday || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Engagement</span>
                <span className="font-medium">{formatNumber(analytics?.engagementStats?.totalEngagement || 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Engagement Rate</span>
                <span className="font-medium">{analytics?.engagementStats?.averageEngagementRate || 0}%</span>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Today</span>
                <span className="font-medium">${analytics?.revenueStats?.revenueToday || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="font-medium">${analytics?.revenueStats?.revenueThisWeek || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This Month</span>
                <span className="font-medium">${analytics?.revenueStats?.revenueThisMonth || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This Year</span>
                <span className="font-medium">${analytics?.revenueStats?.revenueThisYear || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalyticsPage