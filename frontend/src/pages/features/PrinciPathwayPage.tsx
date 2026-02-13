import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Clock, 
  Star, 
  UserPlus, 
  Hand, 
  Target, 
  Award, 
  BookOpen, 
  Users2, 
  Briefcase, 
  GraduationCap,
  CheckCircle,
  MessageSquare
} from 'lucide-react'

interface MentorshipProfile {
  id: string
  user_id: string
  mentorship_type: string
  expertise_areas: string[]
  experience_years: number
  mentorship_style: string
  availability: string
  max_mentees: number
  current_mentees: number
  bio: string
  is_available: boolean
  created_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
    position?: string
  }
}

interface MentorshipProgram {
  id: string
  title: string
  description: string
  program_type: string
  duration_weeks: number
  start_date?: string
  end_date?: string
  is_paid: boolean
  price: number
  max_participants: number
  status: string
  created_at: string
}

interface MentorshipConnection {
  id: string
  mentor_id: string
  mentee_id: string
  program_id?: string
  status: string
  start_date: string
  end_date?: string
  goals: string[]
  notes: string
  created_at: string
  mentor: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
    position?: string
  }
  mentee: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
    position?: string
  }
}

export const PrinciPathwayPage: React.FC = () => {
  const [mentors, setMentors] = useState<MentorshipProfile[]>([])
  const [programs, setPrograms] = useState<MentorshipProgram[]>([])
  const [connections, setConnections] = useState<MentorshipConnection[]>([])
  const [filteredMentors, setFilteredMentors] = useState<MentorshipProfile[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<MentorshipProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState('')
  const [activeTab, setActiveTab] = useState('mentors')
  const [sortBy, setSortBy] = useState('availability')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const mentorshipTypes = [
    { id: '', name: 'All Types', icon: Users2, color: '#6B7280' },
    { id: 'mentor', name: 'Mentors', icon: Award, color: '#3B82F6' },
    { id: 'mentee', name: 'Mentees', icon: UserPlus, color: '#10B981' }
  ]

  const expertiseAreas = [
    { id: '', name: 'All Areas', color: '#6B7280' },
    { id: 'leadership', name: 'Leadership', color: '#3B82F6' },
    { id: 'teaching', name: 'Teaching', color: '#10B981' },
    { id: 'administration', name: 'Administration', color: '#F59E0B' },
    { id: 'curriculum', name: 'Curriculum', color: '#8B5CF6' },
    { id: 'technology', name: 'Technology', color: '#EF4444' },
    { id: 'student-engagement', name: 'Student Engagement', color: '#6366F1' }
  ]

  // Mock data - will be replaced with API calls
  const mockMentors: MentorshipProfile[] = [
    {
      id: '1',
      user_id: '1',
      mentorship_type: 'mentor',
      expertise_areas: ['leadership', 'administration'],
      experience_years: 25,
      mentorship_style: 'Structured and goal-oriented',
      availability: 'Weekends and evenings',
      max_mentees: 3,
      current_mentees: 2,
      bio: 'Experienced school administrator with 25 years in education leadership. Passionate about mentoring emerging leaders and helping them navigate the challenges of educational administration.',
      is_available: true,
      created_at: '2023-06-01T00:00:00Z',
      user: {
        id: '1',
        first_name: 'Dr. Sarah',
        last_name: 'Mitchell',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Westfield School District',
        position: 'Superintendent'
      }
    },
    {
      id: '2',
      user_id: '2',
      mentorship_type: 'mentor',
      expertise_areas: ['teaching', 'technology'],
      experience_years: 15,
      mentorship_style: 'Collaborative and innovative',
      availability: 'Evenings and online',
      max_mentees: 4,
      current_mentees: 1,
      bio: 'STEM educator with expertise in integrating technology into classroom instruction. Love helping fellow teachers discover new ways to engage students through digital tools.',
      is_available: true,
      created_at: '2023-08-15T00:00:00Z',
      user: {
        id: '2',
        first_name: 'Michael',
        last_name: 'Chen',
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        school_name: 'Riverside Elementary',
        position: 'STEM Coordinator'
      }
    },
    {
      id: '3',
      user_id: '3',
      mentorship_type: 'mentee',
      expertise_areas: ['leadership'],
      experience_years: 8,
      mentorship_style: 'Open to guidance',
      availability: 'Flexible',
      max_mentees: 0,
      current_mentees: 0,
      bio: 'Middle school principal looking to grow my leadership skills and learn from experienced administrators. Interested in school culture, teacher development, and community engagement.',
      is_available: true,
      created_at: '2024-01-10T00:00:00Z',
      user: {
        id: '3',
        first_name: 'Lisa',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy',
        position: 'Principal'
      }
    }
  ]

  const mockPrograms: MentorshipProgram[] = [
    {
      id: '1',
      title: 'New Leaders Mentorship Program',
      description: 'A comprehensive 12-week program designed for aspiring school leaders. Includes one-on-one mentoring, group workshops, and leadership skill development.',
      program_type: 'structured',
      duration_weeks: 12,
      start_date: '2024-03-01',
      end_date: '2024-05-24',
      is_paid: true,
      price: 299,
      max_participants: 20,
      status: 'upcoming',
      created_at: '2023-12-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Peer Mentorship Circle',
      description: 'Monthly peer mentoring sessions for educators at similar career stages. Share experiences, challenges, and solutions in a supportive environment.',
      program_type: 'peer',
      duration_weeks: 24,
      start_date: '2024-02-01',
      end_date: '2024-07-31',
      is_paid: false,
      price: 0,
      max_participants: 15,
      status: 'active',
      created_at: '2024-01-01T00:00:00Z'
    }
  ]

  const mockConnections: MentorshipConnection[] = [
    {
      id: '1',
      mentor_id: '1',
      mentee_id: '3',
      program_id: '1',
      status: 'active',
      start_date: '2024-01-15',
      end_date: '2024-04-15',
      goals: ['Develop leadership vision', 'Improve team management skills', 'Enhance community relations'],
      notes: 'Mentee is making excellent progress in understanding leadership principles.',
      created_at: '2024-01-10T00:00:00Z',
      mentor: {
        id: '1',
        first_name: 'Dr. Sarah',
        last_name: 'Mitchell',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Westfield School District',
        position: 'Superintendent'
      },
      mentee: {
        id: '3',
        first_name: 'Lisa',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy',
        position: 'Principal'
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setMentors(mockMentors)
    setPrograms(mockPrograms)
    setConnections(mockConnections)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = mentors

    if (searchQuery) {
      filtered = filtered.filter(mentor =>
        mentor.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise_areas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedType) {
      filtered = filtered.filter(mentor => mentor.mentorship_type === selectedType)
    }

    if (selectedExpertise) {
      filtered = filtered.filter(mentor => mentor.expertise_areas.includes(selectedExpertise))
    }

    switch (sortBy) {
      case 'availability':
        filtered.sort((a, b) => (b.is_available ? 1 : 0) - (a.is_available ? 1 : 0))
        break
      case 'experience':
        filtered.sort((a, b) => b.experience_years - a.experience_years)
        break
      case 'mentees':
        filtered.sort((a, b) => b.current_mentees - a.current_mentees)
        break
    }

    setFilteredMentors(filtered)
  }, [mentors, searchQuery, selectedType, selectedExpertise, sortBy])

  useEffect(() => {
    let filtered = programs

    if (searchQuery) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPrograms(filtered)
  }, [programs, searchQuery])

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

  const getMentorshipTypeIcon = (type: string) => {
    const mentorshipType = mentorshipTypes.find(t => t.id === type)
    if (mentorshipType) {
      const IconComponent = mentorshipType.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <Users2 className="w-5 h-5" />
  }

  const getExpertiseIcon = (expertise: string) => {
    switch (expertise) {
      case 'leadership':
        return <Award className="w-4 h-4" />
      case 'teaching':
        return <BookOpen className="w-4 h-4" />
      case 'administration':
        return <Briefcase className="w-4 h-4" />
      case 'curriculum':
        return <GraduationCap className="w-4 h-4" />
      case 'technology':
        return <Target className="w-4 h-4" />
      case 'student-engagement':
        return <Users2 className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getProgramStatus = (program: MentorshipProgram) => {
    const now = new Date()

    if (program.end_date && now > new Date(program.end_date)) return { status: 'completed', color: 'text-gray-600', bgColor: 'bg-gray-100' }
    if (program.start_date && now >= new Date(program.start_date)) return { status: 'active', color: 'text-green-600', bgColor: 'bg-green-100' }

    return { status: 'upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Hand className="w-8 h-8 mr-3 text-indigo-600" />
                PrinciPathway
              </h1>
              <p className="text-gray-600">Mentorship connections and professional growth</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-pathway/create-profile"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Profile
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('mentors')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'mentors'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Mentors & Mentees
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'programs'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'connections'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Connections
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'mentors' && (
              <>
                <div className="relative">
                  <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    {mentorshipTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={selectedExpertise}
                    onChange={(e) => setSelectedExpertise(e.target.value)}
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    {expertiseAreas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    <option value="availability">Availability</option>
                    <option value="experience">Experience</option>
                    <option value="mentees">Current Mentees</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'mentors' ? (
              <>
                {/* Expertise Areas Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                  {expertiseAreas.map(area => (
                    <button
                      key={area.id}
                      onClick={() => setSelectedExpertise(selectedExpertise === area.id ? '' : area.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedExpertise === area.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`mb-2 ${selectedExpertise === area.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                          {getExpertiseIcon(area.id)}
                        </div>
                        <h3 className="text-xs font-medium text-gray-900">{area.name}</h3>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <Award className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Available Mentors</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredMentors.filter(m => m.mentorship_type === 'mentor' && m.is_available).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <UserPlus className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Seeking Mentors</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredMentors.filter(m => m.mentorship_type === 'mentee').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Users2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Connections</p>
                        <p className="text-2xl font-bold text-gray-900">{connections.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Target className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Mentorship Programs</p>
                        <p className="text-2xl font-bold text-gray-900">{programs.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mentors/Mentees Grid */}
                {filteredMentors.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No mentorship profiles found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                mentor.mentorship_type === 'mentor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {getMentorshipTypeIcon(mentor.mentorship_type)}
                                <span className="ml-1 capitalize">{mentor.mentorship_type}</span>
                              </span>
                              {mentor.is_available ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Available
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                  Unavailable
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center mb-4">
                            <img
                              src={mentor.user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.user.first_name + ' ' + mentor.user.last_name)}&background=random`}
                              alt={mentor.user.first_name + ' ' + mentor.user.last_name}
                              className="w-12 h-12 rounded-full mr-3"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {mentor.user.first_name} {mentor.user.last_name}
                              </h3>
                              <p className="text-sm text-gray-500">{mentor.user.position} • {mentor.user.school_name}</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {mentor.bio}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-500">Experience</div>
                              <div className="font-medium text-gray-900 text-sm">
                                {mentor.experience_years} years
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Style</div>
                              <div className="font-medium text-gray-900 text-sm line-clamp-1">
                                {mentor.mentorship_style}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="text-xs text-gray-500 mb-2">Expertise Areas</div>
                            <div className="flex flex-wrap gap-2">
                              {mentor.expertise_areas.slice(0, 3).map((area, index) => (
                                <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                                  {area}
                                </span>
                              ))}
                              {mentor.expertise_areas.length > 3 && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                  +{mentor.expertise_areas.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {mentor.mentorship_type === 'mentor' && (
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span className="flex items-center">
                                <Users2 className="w-4 h-4 mr-1" />
                                {mentor.current_mentees}/{mentor.max_mentees} mentees
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {mentor.availability}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/princi-pathway/${mentor.id}`}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </Link>
                            </div>

                            {isAuthenticated && mentor.is_available && (
                              <Link
                                to={`/princi-pathway/${mentor.id}/connect`}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Connect
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : activeTab === 'programs' ? (
              <>
                {/* Programs Grid */}
                {filteredPrograms.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No mentorship programs found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPrograms.map((program) => {
                      const { status, color, bgColor } = getProgramStatus(program)
                      return (
                        <div
                          key={program.id}
                          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{program.description}</p>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{program.duration_weeks}</div>
                                <div className="text-xs text-gray-500">Weeks</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">
                                  {program.max_participants}
                                </div>
                                <div className="text-xs text-gray-500">Max Participants</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">
                                  {program.is_paid ? formatCurrency(program.price) : 'Free'}
                                </div>
                                <div className="text-xs text-gray-500">Cost</div>
                              </div>
                            </div>

                            {program.start_date && program.end_date && (
                              <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-1">Program Dates</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {formatDate(program.start_date)} - {formatDate(program.end_date)}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                Created {formatDate(program.created_at)}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Link
                                  to={`/princi-pathway/programs/${program.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Link>

                                {isAuthenticated && status !== 'completed' && (
                                  <Link
                                    to={`/princi-pathway/programs/${program.id}/join`}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Join Program
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Connections Grid */}
                {connections.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No mentorship connections found</div>
                    <p className="text-gray-400 mt-2">Start building your mentorship network</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {connections.map((connection) => (
                      <div
                        key={connection.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <img
                                  src={connection.mentor.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(connection.mentor.first_name + ' ' + connection.mentor.last_name)}&background=random`}
                                  alt={connection.mentor.first_name}
                                  className="w-12 h-12 rounded-full mx-auto"
                                />
                                <p className="text-xs text-gray-500 mt-1">Mentor</p>
                              </div>

                              <div className="flex-1 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    connection.status === 'active' ? 'bg-green-100 text-green-800' :
                                    connection.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500 mt-2">
                                  {formatDate(connection.start_date)}
                                  {connection.end_date && ` - ${formatDate(connection.end_date)}`}
                                </div>
                              </div>

                              <div className="text-center">
                                <img
                                  src={connection.mentee.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(connection.mentee.first_name + ' ' + connection.mentee.last_name)}&background=random`}
                                  alt={connection.mentee.first_name}
                                  className="w-12 h-12 rounded-full mx-auto"
                                />
                                <p className="text-xs text-gray-500 mt-1">Mentee</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">
                                {connection.mentor.first_name} {connection.mentor.last_name}
                              </h4>
                              <p className="text-sm text-gray-500">{connection.mentor.position}</p>
                              <p className="text-xs text-gray-400">{connection.mentor.school_name}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">
                                {connection.mentee.first_name} {connection.mentee.last_name}
                              </h4>
                              <p className="text-sm text-gray-500">{connection.mentee.position}</p>
                              <p className="text-xs text-gray-400">{connection.mentee.school_name}</p>
                            </div>
                          </div>

                          {connection.goals && connection.goals.length > 0 && (
                            <div className="mb-4">
                              <div className="text-sm font-medium text-gray-900 mb-2">Goals</div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {connection.goals.slice(0, 3).map((goal, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {goal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                              Connected {formatDate(connection.created_at)}
                            </div>

                            <Link
                              to={`/princi-pathway/connections/${connection.id}`}
                              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              View Connection
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
