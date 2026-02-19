import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Video,
  Calendar,
  Heart,
  TrendingUp,
  Star,
  Play,
  MessageCircle,
  Eye,
  Brain,
  Trophy,
  Gift,
  MapPin,
  Shield,
  Target,
  Sparkles,
  Zap
} from 'lucide-react'

export const ExplorePage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [activeCategory, setActiveCategory] = useState('all')
  const [stats, setStats] = useState({
    totalPosts: 1234,
    totalUsers: 5678,
    totalVideos: 890,
    totalEvents: 234
  })

  const categories = [
    { id: 'all', name: 'All Content', icon: Star, color: 'from-gray-500 to-gray-600' },
    { id: 'posts', name: 'PrinciPosts', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { id: 'voice', name: 'PrinciVoice', icon: Video, color: 'from-purple-500 to-purple-600' },
    { id: 'talks', name: 'PrinciTalks', icon: Play, color: 'from-green-500 to-green-600' },
    { id: 'moments', name: 'PrinciMoments', icon: Calendar, color: 'from-pink-500 to-pink-600' },
    { id: 'flash', name: 'PrinciFlash', icon: TrendingUp, color: 'from-yellow-500 to-yellow-600' },
    { id: 'care', name: 'PrinciCare', icon: Shield, color: 'from-teal-500 to-teal-600' },
    { id: 'edge', name: 'PrinciEdge', icon: Brain, color: 'from-violet-500 to-violet-600' },
    { id: 'circle', name: 'PrinciCircle', icon: Users, color: 'from-rose-500 to-rose-600' },
    { id: 'awards', name: 'PrinciAwards', icon: Award, color: 'from-fuchsia-500 to-fuchsia-600' }
  ]

  const sampleContent = [
    {
      id: '1',
      type: 'posts',
      title: 'Transforming School Leadership Through Digital Innovation',
      excerpt: 'Discover how technology is reshaping educational leadership and creating new opportunities for growth and innovation...',
      author: 'Dr. Sarah Johnson',
      role: 'Principal, Delhi Public School',
      readTime: '5 min read',
      likes: 234,
      comments: 45,
      views: 1520,
      tags: ['Leadership', 'Technology'],
      publishedAt: '2024-01-15'
    },
    {
      id: '2',
      type: 'voice',
      title: 'Building Inclusive School Communities',
      excerpt: 'Practical strategies for creating inclusive environments where every student feels valued and supported...',
      author: 'Michael Chen',
      role: 'Head of School, International Academy',
      readTime: '3 min video',
      likes: 189,
      comments: 32,
      views: 890,
      tags: ['Community', 'Inclusion'],
      publishedAt: '2024-01-12'
    },
    {
      id: '3',
      type: 'talks',
      title: 'The Future of Educational Leadership',
      excerpt: 'An insightful conversation with experienced education leaders about emerging trends and challenges...',
      author: 'Interview with Dr. Rajesh Kumar',
      role: 'Director of Education',
      readTime: '15 min watch',
      likes: 456,
      comments: 78,
      views: 2340,
      tags: ['Future', 'Leadership'],
      publishedAt: '2024-01-10'
    },
    {
      id: '4',
      type: 'moments',
      title: 'Celebrating Teacher Excellence',
      excerpt: 'A heartfelt tribute to the dedicated teachers who make our schools exceptional places of learning...',
      author: 'Priya Sharma',
      role: 'Vice Principal',
      readTime: '2 min watch',
      likes: 123,
      comments: 21,
      views: 567,
      tags: ['Celebration', 'Teachers'],
      publishedAt: '2024-01-08'
    },
    {
      id: '5',
      type: 'flash',
      title: 'New Education Policy Implementation',
      excerpt: 'Key insights on implementing the latest education policy changes and their impact on school administration...',
      author: 'Administrative Team',
      role: 'School Leadership',
      readTime: '4 min read',
      likes: 345,
      comments: 67,
      views: 1890,
      tags: ['Policy', 'Administration'],
      publishedAt: '2024-01-05'
    },
    {
      id: '6',
      type: 'care',
      title: 'Managing Stress for School Leaders',
      excerpt: 'Essential wellness tips and strategies for maintaining mental and emotional balance in leadership roles...',
      author: 'Dr. Anjali Patel',
      role: 'Wellness Expert',
      readTime: '6 min read',
      likes: 278,
      comments: 54,
      views: 1234,
      tags: ['Wellness', 'Leadership'],
      publishedAt: '2024-01-03'
    }
  ]

  const filteredContent = activeCategory === 'all' 
    ? sampleContent 
    : sampleContent.filter(item => item.type === activeCategory)

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      posts: BookOpen,
      voice: Video,
      talks: Play,
      moments: Calendar,
      flash: TrendingUp,
      care: Shield,
      edge: Brain,
      circle: Users,
      awards: Award
    }
    return iconMap[type] || Star
  }

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      posts: 'text-blue-600 bg-blue-100',
      voice: 'text-purple-600 bg-purple-100',
      talks: 'text-green-600 bg-green-100',
      moments: 'text-pink-600 bg-pink-100',
      flash: 'text-yellow-600 bg-yellow-100',
      care: 'text-teal-600 bg-teal-100',
      edge: 'text-violet-600 bg-violet-100',
      circle: 'text-rose-600 bg-rose-100',
      awards: 'text-fuchsia-600 bg-fuchsia-100'
    }
    return colorMap[type] || 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Principulse</span>
            </Link>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Principulse
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover the wealth of knowledge, insights, and connections shared by school leaders across the country
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalUsers.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">School Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalPosts.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Posts Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalVideos.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Videos Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalEvents.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredContent.map((content) => {
              const IconComponent = getTypeIcon(content.type)
              const typeColor = getTypeColor(content.type)
              
              return (
                <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeColor}`}>
                          {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">{content.publishedAt}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {content.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {content.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div>
                          <div className="font-medium text-gray-900">{content.author}</div>
                          <div className="text-xs">{content.role}</div>
                        </div>
                        <span>{content.readTime}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {content.views}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {content.comments}
                          </span>
                        </div>
                        
                        {!isAuthenticated && (
                          <div className="text-xs text-blue-600 font-medium">
                            Sign in to interact
                          </div>
                        )}
                      </div>
                      
                      {content.tags && content.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {content.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {!isAuthenticated && (
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to contribute and connect?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join Principulse to share your insights, connect with fellow school leaders, and access exclusive features.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Join Principulse
                  </Link>
                  <Link
                    to="/login"
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
