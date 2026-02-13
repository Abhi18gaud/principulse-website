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
  Users, 
  Star,
  MapPin,
  Target,
  Award,
  TrendingUp,
  Hand
} from 'lucide-react'

interface ServiceProject {
  id: string
  title: string
  description: string
  category: string
  cause: string
  location: string
  target_amount: number
  raised_amount: number
  volunteer_count: number
  impact_description: string
  organizer: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  images: Array<{
    id: string
    url: string
    caption?: string
  }>
  tags: Array<{
    id: string
    name: string
    color: string
  }>
  is_featured: boolean
  is_active: boolean
  start_date: string
  end_date?: string
  created_at: string
  updated_at: string
}

export const PrinciServePage: React.FC = () => {
  const [projects, setProjects] = useState<ServiceProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ServiceProject[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data
  const mockProjects: ServiceProject[] = [
    {
      id: '1',
      title: 'Books for Rural Schools Initiative',
      description: 'Help us provide educational resources to underprivileged rural schools. Every book donated helps transform a child\'s educational journey and opens doors to new opportunities.',
      category: 'Education',
      cause: 'Literacy',
      location: 'Rural Communities',
      target_amount: 50000,
      raised_amount: 32500,
      volunteer_count: 45,
      impact_description: 'Providing 2,000+ books to 15 rural schools, impacting over 1,200 students.',
      organizer: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1481627834876-b7833e2f4b06?w=800',
          caption: 'Students receiving new books'
        }
      ],
      tags: [
        { id: '1', name: 'Education', color: '#3B82F6' },
        { id: '2', name: 'Literacy', color: '#10B981' },
        { id: '3', name: 'Rural Development', color: '#8B5CF6' }
      ],
      is_featured: true,
      is_active: true,
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-03-31T23:59:59Z',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Clean Water for Schools Project',
      description: 'Bringing clean, safe drinking water to schools in underserved communities. Every donation helps install water purification systems and promote health education.',
      category: 'Health',
      cause: 'Water Access',
      location: 'Underserved Communities',
      target_amount: 75000,
      raised_amount: 41000,
      volunteer_count: 67,
      impact_description: 'Installing water purification systems in 8 schools, providing clean water to over 3,000 students.',
      organizer: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary'
      },
      images: [
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1548199973-52cea9377422?w=800',
          caption: 'New water purification system installation'
        }
      ],
      tags: [
        { id: '4', name: 'Health', color: '#EF4444' },
        { id: '5', name: 'Water', color: '#06B6D4' },
        { id: '6', name: 'Infrastructure', color: '#6366F1' }
      ],
      is_featured: false,
      is_active: true,
      start_date: '2024-01-10T00:00:00Z',
      end_date: '2024-04-30T23:59:59Z',
      created_at: '2024-01-14T14:30:00Z',
      updated_at: '2024-01-14T14:30:00Z'
    },
    {
      id: '3',
      title: 'Digital Learning Equipment Drive',
      description: 'Equipping classrooms with modern digital learning tools to prepare students for the future. Your support helps bridge the digital divide in education.',
      category: 'Technology',
      cause: 'Digital Divide',
      location: 'Urban Schools',
      target_amount: 100000,
      raised_amount: 89000,
      volunteer_count: 89,
      impact_description: 'Providing tablets and smart boards to 20 classrooms, benefiting over 600 students with modern learning tools.',
      organizer: {
        id: '3',
        first_name: 'Emily',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      },
      images: [
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1581291518857-6e9180ad8a1a?w=800',
          caption: 'Students using new digital learning equipment'
        }
      ],
      tags: [
        { id: '7', name: 'Technology', color: '#8B5CF6' },
        { id: '8', name: 'Education', color: '#3B82F6' },
        { id: '9', name: 'Innovation', color: '#10B981' }
      ],
      is_featured: true,
      is_active: true,
      start_date: '2024-01-05T00:00:00Z',
      end_date: '2024-05-31T23:59:59Z',
      created_at: '2024-01-13T16:45:00Z',
      updated_at: '2024-01-13T16:45:00Z'
    }
  ]

  const categories = [
    { id: '', name: 'All Categories', color: '#6B7280' },
    { id: '1', name: 'Education', color: '#3B82F6' },
    { id: '2', name: 'Health', color: '#EF4444' },
    { id: '3', name: 'Technology', color: '#8B5CF6' },
    { id: '4', name: 'Environment', color: '#10B981' },
    { id: '5', name: 'Community', color: '#6366F1' }
  ]

  useEffect(() => {
    setProjects(mockProjects)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = projects

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.cause.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.volunteer_count - a.volunteer_count)
        break
      case 'funded':
        filtered.sort((a, b) => (b.raised_amount / b.target_amount) - (a.raised_amount / a.target_amount))
        break
      case 'featured':
        filtered = filtered.filter(project => project.is_featured)
        break
    }

    setFilteredProjects(filtered)
  }, [projects, searchQuery, selectedCategory, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100)
  }

  const handleLike = (projectId: string) => {
    if (!isAuthenticated) return
    console.log('Liking project:', projectId)
  }

  const handleShare = (projectId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing project:', projectId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Hand className="w-8 h-8 mr-3 text-green-600" />
                PrinciServe
              </h1>
              <p className="text-gray-600">Making a difference through community service</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-serve/create"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Project
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
                  placeholder="Search service projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
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
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Volunteers</option>
                <option value="funded">Most Funded</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredProjects.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Volunteers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredProjects.reduce((sum, project) => sum + project.volunteer_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Raised</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(filteredProjects.reduce((sum, project) => sum + project.raised_amount, 0))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Lives Impacted</p>
                    <p className="text-2xl font-bold text-gray-900">12,450+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No service projects found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {project.is_featured && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <Link to={`/princi-serve/${project.id}`}>
                      <div className="relative">
                        <img
                          src={project.images[0]?.url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba6b?w=800'}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                          <Eye className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 mr-2">
                            {project.category}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            {project.location}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-bold text-green-600">
                              {getProgressPercentage(project.raised_amount, project.target_amount).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(project.raised_amount, project.target_amount)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm text-gray-600">
                              Raised: {formatCurrency(project.raised_amount)}
                            </span>
                            <span className="text-sm text-gray-600">
                              Goal: {formatCurrency(project.target_amount)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center mb-4">
                          <img
                            src={project.organizer.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.organizer.first_name + ' ' + project.organizer.last_name)}&background=random`}
                            alt={project.organizer.first_name + ' ' + project.organizer.last_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {project.organizer.first_name} {project.organizer.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{project.organizer.school_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {project.volunteer_count} volunteers
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(project.start_date)}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Impact:</p>
                          <p className="text-xs text-gray-600">{project.impact_description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleLike(project.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Support
                            </button>
                            <button
                              onClick={() => handleShare(project.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </button>
                          </div>
                          <Link
                            to={`/princi-serve/${project.id}/volunteer`}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Volunteer
                          </Link>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 text-xs font-medium rounded-full"
                              style={{ backgroundColor: tag.color + '20', color: tag.color }}
                            >
                              #{tag.name}
                            </span>
                          ))}
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
