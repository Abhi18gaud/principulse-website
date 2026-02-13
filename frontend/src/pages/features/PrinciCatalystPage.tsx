import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Users, 
  Clock,
  BookOpen,
  Target,
  Award,
  CheckCircle,
  Video,
  FileText,
  UserCheck,
  DollarSign,
  Briefcase
} from 'lucide-react'

interface Workshop {
  id: string
  title: string
  description: string
  instructor_name: string
  instructor_bio: string
  instructor_image_url?: string
  workshop_type: string
  duration_hours: number
  start_date: string
  end_date: string
  schedule?: any
  is_paid: boolean
  price: number
  max_participants: number
  current_participants: number
  status: string
  thumbnail_url?: string
  materials_url?: string[]
  created_at: string
}

export const PrinciCatalystPage: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('upcoming')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const workshopTypes = [
    { id: '', name: 'All Types', icon: Target, color: '#6B7280' },
    { id: 'leadership', name: 'Leadership', icon: Award, color: '#3B82F6' },
    { id: 'management', name: 'Management', icon: Briefcase, color: '#10B981' },
    { id: 'teaching', name: 'Teaching', icon: BookOpen, color: '#F59E0B' },
    { id: 'technology', name: 'Technology', icon: Video, color: '#8B5CF6' },
    { id: 'curriculum', name: 'Curriculum', icon: FileText, color: '#EF4444' }
  ]

  // Mock data - will be replaced with API calls
  const mockWorkshops: Workshop[] = [
    {
      id: '1',
      title: 'Advanced Leadership Skills Workshop',
      description: 'Develop essential leadership skills for educational administrators. Learn strategic planning, team building, conflict resolution, and change management in educational settings.',
      instructor_name: 'Dr. Sarah Mitchell',
      instructor_bio: 'Former superintendent with 25+ years in educational leadership.',
      instructor_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
      workshop_type: 'leadership',
      duration_hours: 16,
      start_date: '2024-03-15',
      end_date: '2024-03-16',
      schedule: { 'Day 1': '9AM-5PM', 'Day 2': '9AM-5PM' },
      is_paid: true,
      price: 299,
      max_participants: 30,
      current_participants: 18,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      materials_url: ['https://drive.google.com/workshop1'],
      created_at: '2024-01-20T00:00:00Z'
    },
    {
      id: '2',
      title: 'Digital Classroom Management',
      description: 'Master modern classroom management techniques using digital tools. Learn to integrate technology effectively while maintaining student engagement and discipline.',
      instructor_name: 'Prof. Michael Chen',
      instructor_bio: 'EdTech specialist and former classroom teacher.',
      instructor_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      workshop_type: 'technology',
      duration_hours: 8,
      start_date: '2024-02-20',
      end_date: '2024-02-20',
      schedule: { 'Full Day': '9AM-5PM' },
      is_paid: true,
      price: 149,
      max_participants: 50,
      current_participants: 23,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f20?w=800',
      materials_url: ['https://drive.google.com/workshop2'],
      created_at: '2024-01-18T00:00:00Z'
    },
    {
      id: '3',
      title: 'Curriculum Design & Development',
      description: 'Learn systematic approaches to curriculum design. Develop skills in creating aligned, engaging, and effective curricula that meet educational standards.',
      instructor_name: 'Dr. Lisa Rodriguez',
      instructor_bio: 'Curriculum specialist and educational researcher.',
      instructor_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      workshop_type: 'curriculum',
      duration_hours: 12,
      start_date: '2024-02-10',
      end_date: '2024-02-11',
      schedule: { 'Day 1': '9AM-3PM', 'Day 2': '9AM-3PM' },
      is_paid: true,
      price: 199,
      max_participants: 25,
      current_participants: 12,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1581291518857-6e9180ad8a1a?w=800',
      materials_url: ['https://drive.google.com/workshop3'],
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '4',
      title: 'Stress Management for Educators',
      description: 'Comprehensive workshop on managing stress and preventing burnout in educational professions. Learn practical techniques for self-care and work-life balance.',
      instructor_name: 'Dr. Jennifer Walsh',
      instructor_bio: 'Clinical psychologist specializing in educator wellness.',
      instructor_image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
      workshop_type: 'management',
      duration_hours: 6,
      start_date: '2024-01-25',
      end_date: '2024-01-25',
      schedule: { 'Half Day': '9AM-3PM' },
      is_paid: false,
      price: 0,
      max_participants: 40,
      current_participants: 35,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1573497019940-1c28988d916?w=800',
      materials_url: ['https://drive.google.com/workshop4'],
      created_at: '2024-01-10T00:00:00Z'
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setWorkshops(mockWorkshops)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = workshops

    if (searchQuery) {
      filtered = filtered.filter(workshop =>
        workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.instructor_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(workshop => workshop.workshop_type === selectedType)
    }

    switch (sortBy) {
      case 'upcoming':
        filtered.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        filtered = filtered.filter(workshop => new Date(workshop.start_date) > new Date())
        break
      case 'popular':
        filtered.sort((a, b) => b.current_participants - a.current_participants)
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'duration':
        filtered.sort((a, b) => a.duration_hours - b.duration_hours)
        break
    }

    setFilteredWorkshops(filtered)
  }, [workshops, searchQuery, selectedType, sortBy])

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

  const getWorkshopStatus = (workshop: Workshop) => {
    const now = new Date()
    const start = new Date(workshop.start_date)
    const end = new Date(workshop.end_date)

    if (now < start) return { status: 'upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (now >= start && now <= end) return { status: 'in-progress', color: 'text-green-600', bgColor: 'bg-green-100' }
    return { status: 'completed', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  }

  const getWorkshopIcon = (type: string) => {
    const workshopType = workshopTypes.find(t => t.id === type)
    if (workshopType) {
      const IconComponent = workshopType.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <Target className="w-5 h-5" />
  }

  const getAvailabilityStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 100) return { status: 'full', color: 'text-red-600', bgColor: 'bg-red-100' }
    if (percentage >= 80) return { status: 'almost-full', color: 'text-orange-600', bgColor: 'bg-orange-100' }
    return { status: 'available', color: 'text-green-600', bgColor: 'bg-green-100' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Target className="w-8 h-8 mr-3 text-teal-600" />
                PrinciCatalyst
              </h1>
              <p className="text-gray-600">Workshops and professional development programs</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-catalyst/create"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Workshop
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
                  placeholder="Search workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
              >
                {workshopTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <>
            {/* Workshop Types Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {workshopTypes.map(type => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(selectedType === type.id ? '' : type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-2 ${selectedType === type.id ? 'text-teal-600' : 'text-gray-600'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-medium text-gray-900">{type.name}</h3>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Target className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Workshops</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredWorkshops.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Participants</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredWorkshops.reduce((sum, workshop) => sum + workshop.current_participants, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredWorkshops.reduce((sum, workshop) => sum + workshop.duration_hours, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(filteredWorkshops.filter(workshop => workshop.is_paid).reduce((sum, workshop) => sum + (workshop.price * workshop.current_participants), 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshops Grid */}
            {filteredWorkshops.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No workshops found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkshops.map((workshop) => {
                  const { status, color, bgColor } = getWorkshopStatus(workshop)
                  const availability = getAvailabilityStatus(workshop.current_participants, workshop.max_participants)
                  return (
                    <div
                      key={workshop.id}
                      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/princi-catalyst/${workshop.id}`}>
                        <div className="relative">
                          {workshop.thumbnail_url ? (
                            <img
                              src={workshop.thumbnail_url}
                              alt={workshop.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-t-lg flex items-center justify-center">
                              <div className="text-center">
                                {getWorkshopIcon(workshop.workshop_type)}
                                <p className="text-sm text-gray-600 mt-2 capitalize">{workshop.workshop_type}</p>
                              </div>
                            </div>
                          )}

                          <div className="absolute top-2 left-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>

                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${availability.bgColor} ${availability.color}`}>
                              {availability.status === 'full' ? 'Full' : availability.status === 'almost-full' ? 'Almost Full' : 'Available'}
                            </span>
                          </div>

                          <div className="absolute bottom-2 right-2">
                            <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-90 text-gray-800">
                              {getWorkshopIcon(workshop.workshop_type)}
                              <span className="ml-1 capitalize">{workshop.workshop_type}</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {workshop.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {workshop.description}
                          </p>

                          <div className="flex items-center mb-4">
                            {workshop.instructor_image_url && (
                              <img
                                src={workshop.instructor_image_url}
                                alt={workshop.instructor_name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{workshop.instructor_name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{workshop.instructor_bio}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-500">Duration</div>
                              <div className="font-medium text-gray-900 text-sm">
                                {workshop.duration_hours} hours
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Dates</div>
                              <div className="font-medium text-gray-900 text-sm">
                                {formatDate(workshop.start_date)}
                                {workshop.start_date !== workshop.end_date && ` - ${formatDate(workshop.end_date)}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {workshop.current_participants}/{workshop.max_participants} enrolled
                            </span>
                            {workshop.is_paid ? (
                              <span className="flex items-center font-medium text-green-600">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {formatCurrency(workshop.price)}
                              </span>
                            ) : (
                              <span className="text-green-600 font-medium">Free</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/princi-catalyst/${workshop.id}`}
                                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </div>

                            {isAuthenticated && status === 'upcoming' && workshop.current_participants < workshop.max_participants && (
                              <Link
                                to={`/princi-catalyst/${workshop.id}/enroll`}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Enroll
                              </Link>
                            )}

                            {workshop.current_participants >= workshop.max_participants && (
                              <span className="inline-flex items-center px-4 py-2 bg-gray-400 text-white text-sm rounded-md cursor-not-allowed">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Full
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
