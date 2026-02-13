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
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Target,
  Trophy,
  Gift,
  MapPin,
  Brain,
  Eye
} from 'lucide-react'

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalVideos: 0,
    totalEvents: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setFeaturedPosts([
        {
          id: '1',
          title: 'Transforming School Leadership Through Digital Innovation',
          excerpt: 'Discover how technology is reshaping educational leadership and creating new opportunities...',
          author: 'Dr. Sarah Johnson',
          readTime: '5 min read',
          likes: 234,
          comments: 45,
          coverImage: '/api/placeholder/400/200',
          tags: ['Leadership', 'Technology'],
          publishedAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Building Inclusive School Communities',
          excerpt: 'Practical strategies for creating inclusive environments where every student feels valued...',
          author: 'Michael Chen',
          readTime: '7 min read',
          likes: 189,
          comments: 32,
          coverImage: '/api/placeholder/400/200',
          tags: ['Community', 'Inclusion'],
          publishedAt: '2024-01-12'
        }
      ])
      
      setStats({
        totalPosts: 1234,
        totalUsers: 5678,
        totalVideos: 890,
        totalEvents: 234
      })
      
      setLoading(false)
    }, 1000)
  }, [])

  const features = [
    {
      id: 'princi-posts',
      title: 'PrinciPosts',
      description: 'Share insights and experiences with fellow school leaders',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      stats: '1,234 Posts',
      link: '/princi-posts'
    },
    {
      id: 'princi-voice',
      title: 'PrinciVoice',
      description: 'Short video messages and insights from educational leaders',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      stats: '890 Videos',
      link: '/princi-voice'
    },
    {
      id: 'princi-moments',
      title: 'PrinciMoments',
      description: 'Celebrate festivals and special occasions with video messages',
      icon: Calendar,
      color: 'from-pink-500 to-pink-600',
      stats: '456 Moments',
      link: '/princi-moments'
    },
    {
      id: 'princi-talks',
      title: 'PrinciTalks',
      description: 'Interviews with experienced school leaders',
      icon: Play,
      color: 'from-green-500 to-green-600',
      stats: '234 Talks',
      link: '/princi-talks'
    },
    {
      id: 'principassions',
      title: 'Principassions',
      description: 'Share personal hobbies and creative pursuits',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      stats: '345 Passions',
      link: '/principassions'
    },
    {
      id: 'princi-flash',
      title: 'PrinciFlash',
      description: 'Share news and stories from your school community',
      icon: TrendingUp,
      color: 'from-yellow-500 to-yellow-600',
      stats: '678 Updates',
      link: '/princi-flash'
    },
    {
      id: 'princi-care',
      title: 'PrinciCare',
      description: 'Wellness resources for school leaders',
      icon: Shield,
      color: 'from-teal-500 to-teal-600',
      stats: '89 Resources',
      link: '/princi-care'
    },
    {
      id: 'princi-fest',
      title: 'PrinciFest',
      description: 'Celebrate birthdays and special milestones',
      icon: Gift,
      color: 'from-indigo-500 to-indigo-600',
      stats: '234 Celebrations',
      link: '/princi-fest'
    },
    {
      id: 'princi-torch',
      title: 'PrinciTorch',
      description: 'Motivational messages for assemblies and meetings',
      icon: Sparkles,
      color: 'from-orange-500 to-orange-600',
      stats: '567 Messages',
      link: '/princi-torch'
    },
    {
      id: 'princi-quest',
      title: 'PrinciQuest',
      description: 'Quizzes, contests, and learning challenges',
      icon: Target,
      color: 'from-cyan-500 to-cyan-600',
      stats: '45 Quests',
      link: '/princi-quest'
    },
    {
      id: 'princi-edge',
      title: 'PrinciEdge',
      description: 'Webinars, seminars, and leadership conclaves',
      icon: Brain,
      color: 'from-violet-500 to-violet-600',
      stats: '78 Events',
      link: '/princi-edge'
    },
    {
      id: 'princi-catalyst',
      title: 'PrinciCatalyst',
      description: 'Hands-on workshops for skill building',
      icon: Trophy,
      color: 'from-amber-500 to-amber-600',
      stats: '34 Workshops',
      link: '/princi-catalyst'
    },
    {
      id: 'princi-circle',
      title: 'PrinciCircle',
      description: 'Peer discussions and virtual open houses',
      icon: Users,
      color: 'from-rose-500 to-rose-600',
      stats: '123 Forums',
      link: '/princi-circle'
    },
    {
      id: 'princi-serve',
      title: 'PrinciServe',
      description: 'Social initiatives and community outreach',
      icon: MapPin,
      color: 'from-emerald-500 to-emerald-600',
      stats: '56 Initiatives',
      link: '/princi-serve'
    },
    {
      id: 'princi-perks',
      title: 'PrinciPerks',
      description: 'Exclusive deals and discounts for members',
      icon: Gift,
      color: 'from-lime-500 to-lime-600',
      stats: '234 Offers',
      link: '/princi-perks'
    },
    {
      id: 'princi-awards',
      title: 'PrinciAwards',
      description: 'Recognition and awards for excellence',
      icon: Award,
      color: 'from-fuchsia-500 to-fuchsia-600',
      stats: '12 Awards',
      link: '/princi-awards'
    },
    {
      id: 'princi-school',
      title: 'PrinciSchool',
      description: 'Professional development and training programs',
      icon: BookOpen,
      color: 'from-sky-500 to-sky-600',
      stats: '45 Courses',
      link: '/princi-school'
    },
    {
      id: 'princi-pathway',
      title: 'PrinciPathway',
      description: 'Mentorship connections for emerging leaders',
      icon: Users,
      color: 'from-slate-500 to-slate-600',
      stats: '89 Mentors',
      link: '/princi-pathway'
    },
    {
      id: 'princi-hubs',
      title: 'PrinciHubs',
      description: 'Local chapters and regional meetups',
      icon: MapPin,
      color: 'from-zinc-500 to-zinc-600',
      stats: '23 Hubs',
      link: '/princi-hubs'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Principulse</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/princi-posts" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciPosts
              </Link>
              <Link to="/princi-voice" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciVoice
              </Link>
              <Link to="/princi-quest" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciQuest
              </Link>
              <Link to="/princi-edge" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PrinciEdge
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="relative">
                    <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
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
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering School Leaders
              <span className="block text-2xl md:text-3xl mt-2 text-blue-200">
                to Transform Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join India's premier community for principals and educational leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    to="/princi-posts/create"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                  >
                    Create Content
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                  >
                    Join Principulse
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Growing Together
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of school leaders already making a difference
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stats.totalUsers.toLocaleString()}
              </div>
              <div className="text-gray-600">School Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stats.totalPosts.toLocaleString()}
              </div>
              <div className="text-gray-600">Posts Shared</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalVideos.toLocaleString()}
              </div>
              <div className="text-gray-600">Videos Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {stats.totalEvents.toLocaleString()}
              </div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore All Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to grow as a school leader, all in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Link
                  key={feature.id}
                  to={feature.link}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-transparent"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">
                      {feature.stats}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Content
            </h2>
            <Link
              to="/princi-posts"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src="/api/placeholder/80/80"
                    alt={post.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Leadership Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of school leaders who are already making a difference
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors inline-flex items-center"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Principulse</h3>
              <p className="text-gray-400">
                Empowering school leaders to transform education through collaboration, innovation, and continuous learning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="/princi-posts" className="text-gray-400 hover:text-white transition-colors">PrinciPosts</Link></li>
                <li><Link to="/princi-voice" className="text-gray-400 hover:text-white transition-colors">PrinciVoice</Link></li>
                <li><Link to="/princi-quest" className="text-gray-400 hover:text-white transition-colors">PrinciQuest</Link></li>
                <li><Link to="/princi-edge" className="text-gray-400 hover:text-white transition-colors">PrinciEdge</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><Link to="/princi-circle" className="text-gray-400 hover:text-white transition-colors">PrinciCircle</Link></li>
                <li><Link to="/princi-hubs" className="text-gray-400 hover:text-white transition-colors">PrinciHubs</Link></li>
                <li><Link to="/princi-serve" className="text-gray-400 hover:text-white transition-colors">PrinciServe</Link></li>
                <li><Link to="/princi-awards" className="text-gray-400 hover:text-white transition-colors">PrinciAwards</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Principulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
