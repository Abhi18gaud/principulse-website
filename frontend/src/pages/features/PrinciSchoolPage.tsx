import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  GraduationCap, 
  Heart, 
  Share2, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock,
  Star,
  BookOpen,
  Play,
  CheckCircle,
  DollarSign,
  Users2
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  price: number
  instructor: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    title?: string
    organization?: string
  }
  thumbnail_url: string
  video_url?: string
  enrollment_count: number
  rating: number
  review_count: number
  topics: Array<{
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

export const PrinciSchoolPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Mock data
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced Educational Leadership',
      description: 'Master the art of educational leadership with comprehensive strategies for modern school management, team building, and creating positive learning environments.',
      category: 'Leadership',
      level: 'Advanced',
      duration: 1200,
      price: 299,
      instructor: {
        id: '1',
        first_name: 'Dr. Sarah',
        last_name: 'Mitchell',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        title: 'Superintendent',
        organization: 'Westfield School District'
      },
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      video_url: 'https://sample-videos.com/course1.mp4',
      enrollment_count: 156,
      rating: 4.8,
      review_count: 42,
      topics: [
        { id: '1', name: 'Leadership', color: '#3B82F6' },
        { id: '2', name: 'Management', color: '#10B981' },
        { id: '3', name: 'Strategy', color: '#8B5CF6' }
      ],
      is_featured: true,
      is_active: true,
      start_date: '2024-02-01T00:00:00Z',
      end_date: '2024-05-31T23:59:59Z',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Digital Transformation in Education',
      description: 'Learn how to lead digital transformation initiatives in your school, from technology integration to creating future-ready learning environments.',
      category: 'Technology',
      level: 'Intermediate',
      duration: 900,
      price: 199,
      instructor: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        title: 'EdTech Director',
        organization: 'InnovateEDU'
      },
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f20?w=800',
      video_url: 'https://sample-videos.com/course2.mp4',
      enrollment_count: 89,
      rating: 4.6,
      review_count: 28,
      topics: [
        { id: '4', name: 'Technology', color: '#10B981' },
        { id: '5', name: 'Innovation', color: '#6366F1' },
        { id: '6', name: 'Digital Learning', color: '#8B5CF6' }
      ],
      is_featured: false,
      is_active: true,
      start_date: '2024-01-20T00:00:00Z',
      end_date: '2024-04-20T23:59:59Z',
      created_at: '2024-01-14T14:30:00Z',
      updated_at: '2024-01-14T14:30:00Z'
    },
    {
      id: '3',
      title: 'Student Mental Health & Wellbeing',
      description: 'Essential strategies for supporting student mental health, creating inclusive environments, and promoting wellbeing in educational settings.',
      category: 'Wellness',
      level: 'Beginner',
      duration: 600,
      price: 149,
      instructor: {
        id: '3',
        first_name: 'Dr. Lisa',
        last_name: 'Thompson',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        title: 'Clinical Psychologist',
        organization: 'Child Wellness Institute'
      },
      thumbnail_url: 'https://images.unsplash.com/photo-1573497019940-1c28988d916?w=800',
      video_url: 'https://sample-videos.com/course3.mp4',
      enrollment_count: 234,
      rating: 4.9,
      review_count: 67,
      topics: [
        { id: '7', name: 'Mental Health', color: '#EF4444' },
        { id: '8', name: 'Student Support', color: '#F59E0B' },
        { id: '9', name: 'Wellbeing', color: '#10B981' }
      ],
      is_featured: true,
      is_active: true,
      start_date: '2024-02-05T00:00:00Z',
      end_date: '2024-06-05T23:59:59Z',
      created_at: '2024-01-13T16:45:00Z',
      updated_at: '2024-01-13T16:45:00Z'
    }
  ]

  const categories = [
    { id: '', name: 'All Categories', color: '#6B7280' },
    { id: '1', name: 'Leadership', color: '#3B82F6' },
    { id: '2', name: 'Technology', color: '#10B981' },
    { id: '3', name: 'Wellness', color: '#EF4444' },
    { id: '4', name: 'Curriculum', color: '#8B5CF6' },
    { id: '5', name: 'Assessment', color: '#F59E0B' }
  ]

  const levels = [
    { id: '', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' }
  ]

  useEffect(() => {
    setCourses(mockCourses)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = courses

    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.enrollment_count - a.enrollment_count)
        break
      case 'rated':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'featured':
        filtered = filtered.filter(course => course.is_featured)
        break
    }

    setFilteredCourses(filtered)
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-yellow-200 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    )
  }

  const handleLike = (courseId: string) => {
    if (!isAuthenticated) return
    console.log('Liking course:', courseId)
  }

  const handleShare = (courseId: string) => {
    if (!isAuthenticated) return
    console.log('Sharing course:', courseId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
                PrinciSchool
              </h1>
              <p className="text-gray-600">Professional development for educational leaders</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-school/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
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
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="rated">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredCourses.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredCourses.reduce((sum, course) => sum + course.enrollment_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(filteredCourses.reduce((sum, course) => sum + course.rating, 0) / filteredCourses.length).toFixed(1)}
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
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(filteredCourses.reduce((sum, course) => sum + (course.price * course.enrollment_count), 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No courses found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {course.is_featured && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <Link to={`/princi-school/${course.id}`}>
                      <div className="relative">
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {course.video_url && (
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {course.level}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 mr-2">
                            {course.category}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDuration(course.duration)}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {course.description}
                        </p>

                        <div className="flex items-center mb-4">
                          <img
                            src={course.instructor.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor.first_name + ' ' + course.instructor.last_name)}&background=random`}
                            alt={course.instructor.first_name + ' ' + course.instructor.last_name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {course.instructor.first_name} {course.instructor.last_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {course.instructor.title} • {course.instructor.organization}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users2 className="w-4 h-4 mr-1" />
                              {course.enrollment_count} students
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(course.start_date)}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {formatCurrency(course.price)}
                          </div>
                        </div>

                        <div className="flex items-center mb-4">
                          {renderStars(course.rating)}
                          <span className="ml-auto text-sm text-gray-500">
                            ({course.review_count} reviews)
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleLike(course.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Like
                            </button>
                            <button
                              onClick={() => handleShare(course.id)}
                              className="flex items-center px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </button>
                          </div>
                          <Link
                            to={`/princi-school/${course.id}/enroll`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Enroll Now
                          </Link>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {course.topics.map((topic) => (
                            <span
                              key={topic.id}
                              className="px-2 py-1 text-xs font-medium rounded-full"
                              style={{ backgroundColor: topic.color + '20', color: topic.color }}
                            >
                              {topic.name}
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
