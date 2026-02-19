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
          coverImage: 'https://picsum.photos/400/200?random=1',
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
          coverImage: 'https://picsum.photos/400/200?random=2',
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
            <Link to="/pages" className="flex items-center space-x-3">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              PRINCIPULSE
              <span className="block text-2xl md:text-3xl mt-4 text-blue-200">
                A Distinguished Network for K–12 School Leaders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Connecting Leadership. Advancing Institutions. Elevating Education.
            </p>
            <div className="text-lg md:text-xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed">
              <p className="mb-4">
                Principulse is a curated professional ecosystem created exclusively for school leaders entrusted with institutional vision, governance, and strategic responsibility.
              </p>
              <p className="mb-4">
                It is a focused platform where principals and senior school leaders engage with peers, exchange high-level insights, strengthen leadership capabilities, and contribute meaningfully to advancement of education.
              </p>
              <p>
                Principulse is not a general networking space. It is a structured leadership forum built on professional parity, discretion, and excellence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/explore"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                  >
                    Join Principulse
                  </Link>
                  <Link
                    to="/login"
                    className="text-white px-8 py-3 rounded-lg font-medium hover:text-blue-200 transition-colors flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Purpose
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The role of a school leader extends far beyond administration. It demands strategic clarity, emotional intelligence, institutional foresight, and a commitment to continuous growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Engage in relevant, peer-level dialogue
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Access structured professional development
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Collaborate across regions
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gain credible recognition
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Strengthen personal and institutional impact
              </h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-medium">
              We believe strong institutions are shaped by informed, connected, and empowered leaders.
            </p>
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

      {/* Membership & Eligibility Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Membership & Eligibility
            </h2>
            <p className="text-2xl text-gray-600 font-medium mb-4">
              A Curated Leadership Collective
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Principulse is intentionally designed as a peer-level network. Membership is extended only to individuals serving in recognized leadership roles within K–12 institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Eligible Professionals Include:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Principals</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Heads of School</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Vice Principals</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Headmasters / Headmistresses</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Academic Heads</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Departmental Heads with institutional leadership responsibilities</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-6 italic">
                All applications are subject to professional review to ensure relevance, credibility, and alignment with purpose of network.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-red-900 mb-6">
                Not Eligible at Present:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-red-800">Teachers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-red-800">School Owners</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-red-800">Chairpersons</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-red-800">Governing Board Members</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-red-800">Leaders of Preschools</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-red-800">Principals of Colleges, Universities, and Professional Institutes</span>
                </li>
              </ul>
              <p className="text-sm text-red-700 mt-6 italic">
                Dedicated communities tailored to these roles are under development and will be introduced separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Principulse Leadership Framework */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Principulse Leadership Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Principulse integrates thought leadership, professional development, collaboration, wellness, recognition, and institutional engagement within a unified structure.
            </p>
          </div>

          {/* Thought Leadership & Professional Expression */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Thought Leadership & Professional Expression
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/princi-posts" className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:bg-blue-100 hover:shadow-lg transition-all duration-300 group">
                <BookOpen className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">PrinciPosts</h4>
                <p className="text-gray-600 text-sm mb-3">Publish in-depth articles on leadership strategy, governance, innovation, and school management</p>
                <div className="text-sm font-medium text-blue-600">{stats.totalPosts.toLocaleString()} Posts</div>
              </Link>
              <Link to="/princi-voice" className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:bg-purple-100 hover:shadow-lg transition-all duration-300 group">
                <Video className="w-8 h-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">PrinciVoice</h4>
                <p className="text-gray-600 text-sm mb-3">Share concise video reflections addressing contemporary leadership themes</p>
                <div className="text-sm font-medium text-purple-600">{stats.totalVideos.toLocaleString()} Videos</div>
              </Link>
              <Link to="/princi-talks" className="bg-green-50 rounded-xl p-6 border border-green-100 hover:bg-green-100 hover:shadow-lg transition-all duration-300 group">
                <Play className="w-8 h-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">PrinciTalks</h4>
                <p className="text-gray-600 text-sm mb-3">Engage with interviews featuring distinguished education leaders and changemakers</p>
                <div className="text-sm font-medium text-green-600">234 Talks</div>
              </Link>
              <Link to="/princi-torch" className="bg-orange-50 rounded-xl p-6 border border-orange-100 hover:bg-orange-100 hover:shadow-lg transition-all duration-300 group">
                <Sparkles className="w-8 h-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">PrinciTorch</h4>
                <p className="text-gray-600 text-sm mb-3">Share meaningful reflections and inspirational insights with your school community</p>
                <div className="text-sm font-medium text-orange-600">567 Messages</div>
              </Link>
            </div>
          </div>

          {/* Communication & Community Presence */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Communication & Community Presence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/princi-flash" className="bg-yellow-50 rounded-xl p-6 border border-yellow-100 hover:bg-yellow-100 hover:shadow-lg transition-all duration-300 group">
                <TrendingUp className="w-8 h-8 text-yellow-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">PrinciFlash</h4>
                <p className="text-gray-600 text-sm mb-3">Present significant school updates and invite professional dialogue</p>
                <div className="text-sm font-medium text-yellow-600">678 Updates</div>
              </Link>
              <Link to="/princi-moments" className="bg-pink-50 rounded-xl p-6 border border-pink-100 hover:bg-pink-100 hover:shadow-lg transition-all duration-300 group">
                <Calendar className="w-8 h-8 text-pink-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors">PrinciMoments</h4>
                <p className="text-gray-600 text-sm mb-3">Share dignified greetings, milestone acknowledgments, and special messages</p>
                <div className="text-sm font-medium text-pink-600">456 Moments</div>
              </Link>
              <Link to="/princi-fest" className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 hover:bg-indigo-100 hover:shadow-lg transition-all duration-300 group">
                <Gift className="w-8 h-8 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">PrinciFest</h4>
                <p className="text-gray-600 text-sm mb-3">Recognize birthdays, anniversaries, and important occasions within network</p>
                <div className="text-sm font-medium text-indigo-600">234 Celebrations</div>
              </Link>
              <Link to="/principassions" className="bg-red-50 rounded-xl p-6 border border-red-100 hover:bg-red-100 hover:shadow-lg transition-all duration-300 group">
                <Heart className="w-8 h-8 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">PrinciPassions</h4>
                <p className="text-gray-600 text-sm mb-3">Highlight personal interests and creative pursuits beyond professional responsibilities</p>
                <div className="text-sm font-medium text-red-600">345 Passions</div>
              </Link>
            </div>
          </div>

          {/* Professional Development & Leadership Advancement */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Professional Development & Leadership Advancement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/princi-edge" className="bg-teal-50 rounded-xl p-6 border border-teal-100 hover:bg-teal-100 hover:shadow-lg transition-all duration-300 group">
                <Brain className="w-8 h-8 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">PrinciEdge</h4>
                <p className="text-gray-600 text-sm mb-3">Participate in expert-led webinars, seminars, and leadership conclaves</p>
                <div className="text-sm font-medium text-teal-600">78 Events</div>
              </Link>
              <Link to="/princi-catalyst" className="bg-amber-50 rounded-xl p-6 border border-amber-100 hover:bg-amber-100 hover:shadow-lg transition-all duration-300 group">
                <Trophy className="w-8 h-8 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">PrinciCatalyst</h4>
                <p className="text-gray-600 text-sm mb-3">Engage in implementation-focused workshops designed to translate strategy into action</p>
                <div className="text-sm font-medium text-amber-600">34 Workshops</div>
              </Link>
              <Link to="/princi-school" className="bg-sky-50 rounded-xl p-6 border border-sky-100 hover:bg-sky-100 hover:shadow-lg transition-all duration-300 group">
                <BookOpen className="w-8 h-8 text-sky-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-700 transition-colors">PrinciSchool</h4>
                <p className="text-gray-600 text-sm mb-3">Access structured certification programs and advanced leadership courses</p>
                <div className="text-sm font-medium text-sky-600">45 Courses</div>
              </Link>
              <Link to="/princi-pathway" className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:bg-slate-100 hover:shadow-lg transition-all duration-300 group">
                <Users className="w-8 h-8 text-slate-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-slate-700 transition-colors">PrinciPathway</h4>
                <p className="text-gray-600 text-sm mb-3">Connect with experienced mentors for guidance and long-term professional growth</p>
                <div className="text-sm font-medium text-slate-600">89 Mentors</div>
              </Link>
            </div>
          </div>

          {/* Collaboration & Strategic Dialogue */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Collaboration & Strategic Dialogue
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/princi-circle" className="bg-rose-50 rounded-xl p-6 border border-rose-100 hover:bg-rose-100 hover:shadow-lg transition-all duration-300 group">
                <Users className="w-8 h-8 text-rose-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-700 transition-colors">PrinciCircle</h4>
                <p className="text-gray-600 text-sm mb-3">Collaborate with fellow leaders to exchange ideas and address shared challenges</p>
                <div className="text-sm font-medium text-rose-600">123 Forums</div>
              </Link>
              <Link to="/princi-quest" className="bg-cyan-50 rounded-xl p-6 border border-cyan-100 hover:bg-cyan-100 hover:shadow-lg transition-all duration-300 group">
                <Target className="w-8 h-8 text-cyan-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">PrinciQuest</h4>
                <p className="text-gray-600 text-sm mb-3">Participate in curated knowledge initiatives, contests, and engagement activities</p>
                <div className="text-sm font-medium text-cyan-600">45 Quests</div>
              </Link>
              <Link to="/princi-hubs" className="bg-zinc-50 rounded-xl p-6 border border-zinc-100 hover:bg-zinc-100 hover:shadow-lg transition-all duration-300 group">
                <MapPin className="w-8 h-8 text-zinc-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-zinc-700 transition-colors">PrinciHubs</h4>
                <p className="text-gray-600 text-sm mb-3">Join district and regional chapters to strengthen professional networks and local collaboration</p>
                <div className="text-sm font-medium text-zinc-600">23 Hubs</div>
              </Link>
            </div>
          </div>

          {/* Wellness, Social Responsibility & Member Privileges */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Wellness, Social Responsibility & Member Privileges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/princi-care" className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 hover:bg-emerald-100 hover:shadow-lg transition-all duration-300 group">
                <Shield className="w-8 h-8 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">PrinciCare</h4>
                <p className="text-gray-600 text-sm mb-3">Access curated guidance for physical, mental, and financial well-being</p>
                <div className="text-sm font-medium text-emerald-600">89 Resources</div>
              </Link>
              <Link to="/princi-serve" className="bg-lime-50 rounded-xl p-6 border border-lime-100 hover:bg-lime-100 hover:shadow-lg transition-all duration-300 group">
                <MapPin className="w-8 h-8 text-lime-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-lime-700 transition-colors">PrinciServe</h4>
                <p className="text-gray-600 text-sm mb-3">Lead and participate in impactful social initiatives and community outreach</p>
                <div className="text-sm font-medium text-lime-600">56 Initiatives</div>
              </Link>
              <Link to="/princi-perks" className="bg-violet-50 rounded-xl p-6 border border-violet-100 hover:bg-violet-100 hover:shadow-lg transition-all duration-300 group">
                <Gift className="w-8 h-8 text-violet-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors">PrinciPerks</h4>
                <p className="text-gray-600 text-sm mb-3">Enjoy exclusive member benefits and strategic partnership advantages</p>
                <div className="text-sm font-medium text-violet-600">234 Offers</div>
              </Link>
              <Link to="/princi-awards" className="bg-fuchsia-50 rounded-xl p-6 border border-fuchsia-100 hover:bg-fuchsia-100 hover:shadow-lg transition-all duration-300 group">
                <Award className="w-8 h-8 text-fuchsia-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-fuchsia-700 transition-colors">PrinciAwards</h4>
                <p className="text-gray-600 text-sm mb-3">Celebrate outstanding leadership through structured recognition and honors</p>
                <div className="text-sm font-medium text-fuchsia-600">12 Awards</div>
              </Link>
            </div>
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
                    src={`https://picsum.photos/80/80?random=${post.id}`}
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

      {/* Professional Referrals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Professional Referrals
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Strengthening the Network Through Trusted Recommendations
            </p>
            <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
              The credibility of Principulse is strengthened through peer endorsement. Members and applicants may recommend eligible school leaders who demonstrate professional integrity and institutional responsibility.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Referral Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Referral Details Required:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Full Name</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Designation</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Institution Name</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">City / State</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Official Phone Number</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Official Email Address</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Important Notes:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">Referrers are required to provide their own professional details for validation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">Prior consent must be obtained from the referred leader before sharing contact information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">All submitted details are treated with confidentiality and used strictly for membership review</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">Referral submission does not guarantee membership; admission remains subject to professional evaluation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Principulse Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Principulse
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                A Peer-Level Leadership Network
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Structured Professional Development
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Strategic Regional and National Collaboration
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Credible Recognition & Visibility
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Integrated Leadership Growth
              </h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-medium italic">
              Principulse is built on the principle that leadership thrives in purposeful, well-governed professional communities.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the Network
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Elevate Your Leadership. Strengthen Your Institution. Contribute to Educational Excellence.
          </p>
          <p className="text-lg mb-12 text-blue-100 max-w-4xl mx-auto">
            If you currently serve in a K–12 school leadership role and are committed to continuous professional advancement, we invite you to apply for membership.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              Apply for Membership
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/referral"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Submit a Professional Referral
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Request Further Information
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
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
