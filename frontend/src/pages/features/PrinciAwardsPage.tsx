import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar, 
  Trophy, 
  Award, 
  Crown, 
  Target, 
  CheckCircle, 
  UserCheck, 
  Vote, 
  BarChart3
} from 'lucide-react'

interface AwardCategory {
  id: string
  name: string
  slug: string
  description: string
  criteria: string
  created_at: string
}

interface AwardCycle {
  id: string
  title: string
  description: string
  nomination_start: string
  nomination_end: string
  voting_start?: string
  voting_end?: string
  announcement_date: string
  status: string
  created_at: string
}

interface Award {
  id: string
  award_cycle_id: string
  award_category_id: string
  nominee_id: string
  nominator_id: string
  nomination_statement: string
  supporting_documents: string[]
  status: string
  vote_count: number
  created_at: string
  award_cycle: {
    title: string
    status: string
    announcement_date: string
  }
  award_category: {
    name: string
    slug: string
    description: string
    criteria: string
  }
  nominee: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    school_name?: string
  }
  nominator: {
    first_name: string
    last_name: string
  }
}

export const PrinciAwardsPage: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([])
  const [awardCycles, setAwardCycles] = useState<AwardCycle[]>([])
  const [categories, setCategories] = useState<AwardCategory[]>([])
  const [filteredAwards, setFilteredAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCycle, setSelectedCycle] = useState('')
  const [sortBy, setSortBy] = useState('votes')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const awardStatuses = [
    { id: 'nominated', name: 'Nominated', color: '#3B82F6', icon: UserCheck },
    { id: 'shortlisted', name: 'Shortlisted', color: '#F59E0B', icon: Target },
    { id: 'winner', name: 'Winner', color: '#10B981', icon: Trophy },
    { id: 'rejected', name: 'Not Selected', color: '#EF4444', icon: CheckCircle }
  ]

  // Mock data - will be replaced with API calls
  const mockCategories: AwardCategory[] = [
    {
      id: '1',
      name: 'Outstanding Educator',
      slug: 'outstanding-educator',
      description: 'Recognizing exceptional teaching and dedication to student success.',
      criteria: 'Demonstrated excellence in teaching, student outcomes, and educational innovation.',
      created_at: '2023-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Innovation in Education',
      slug: 'innovation',
      description: 'Honoring educators who pioneer new approaches and technologies in education.',
      criteria: 'Implementation of innovative teaching methods, technology integration, or educational solutions.',
      created_at: '2023-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Community Impact',
      slug: 'community-impact',
      description: 'Celebrating educators who make significant contributions to their communities.',
      criteria: 'Community involvement, mentorship, and positive societal impact through education.',
      created_at: '2023-01-01T00:00:00Z'
    },
    {
      id: '4',
      name: 'Leadership Excellence',
      slug: 'leadership',
      description: 'Recognizing outstanding educational leadership and administration.',
      criteria: 'Effective leadership, team development, and organizational excellence in education.',
      created_at: '2023-01-01T00:00:00Z'
    }
  ]

  const mockAwardCycles: AwardCycle[] = [
    {
      id: '1',
      title: '2024 Annual Education Awards',
      description: 'Celebrating excellence in education for the 2024 academic year.',
      nomination_start: '2024-01-01',
      nomination_end: '2024-02-15',
      voting_start: '2024-02-20',
      voting_end: '2024-03-15',
      announcement_date: '2024-03-20',
      status: 'completed',
      created_at: '2023-12-01T00:00:00Z'
    },
    {
      id: '2',
      title: '2025 Education Excellence Awards',
      description: 'Recognizing outstanding achievements in education for 2025.',
      nomination_start: '2024-09-01',
      nomination_end: '2024-10-15',
      voting_start: '2024-10-20',
      voting_end: '2024-11-15',
      announcement_date: '2024-11-20',
      status: 'nomination',
      created_at: '2024-08-01T00:00:00Z'
    }
  ]

  const mockAwards: Award[] = [
    {
      id: '1',
      award_cycle_id: '1',
      award_category_id: '1',
      nominee_id: '1',
      nominator_id: '2',
      nomination_statement: 'Ms. Johnson has demonstrated exceptional dedication to her students, implementing innovative teaching methods that have significantly improved student engagement and academic performance.',
      supporting_documents: ['/docs/testimonials.pdf', '/docs/achievements.pdf'],
      status: 'winner',
      vote_count: 245,
      created_at: '2024-01-15T10:00:00Z',
      award_cycle: {
        title: '2024 Annual Education Awards',
        status: 'completed',
        announcement_date: '2024-03-20'
      },
      award_category: {
        name: 'Outstanding Educator',
        slug: 'outstanding-educator',
        description: 'Recognizing exceptional teaching and dedication to student success.',
        criteria: 'Demonstrated excellence in teaching, student outcomes, and educational innovation.'
      },
      nominee: {
        id: '1',
        first_name: 'Sarah',
        last_name: 'Johnson',
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
        school_name: 'Lincoln High School'
      },
      nominator: {
        first_name: 'Michael',
        last_name: 'Chen'
      }
    },
    {
      id: '2',
      award_cycle_id: '1',
      award_category_id: '2',
      nominee_id: '3',
      nominator_id: '1',
      nomination_statement: 'Dr. Rodriguez has revolutionized STEM education in our district through her innovative use of technology and hands-on learning approaches.',
      supporting_documents: ['/docs/innovation.pdf'],
      status: 'winner',
      vote_count: 198,
      created_at: '2024-01-18T14:30:00Z',
      award_cycle: {
        title: '2024 Annual Education Awards',
        status: 'completed',
        announcement_date: '2024-03-20'
      },
      award_category: {
        name: 'Innovation in Education',
        slug: 'innovation',
        description: 'Honoring educators who pioneer new approaches and technologies in education.',
        criteria: 'Implementation of innovative teaching methods, technology integration, or educational solutions.'
      },
      nominee: {
        id: '3',
        first_name: 'Lisa',
        last_name: 'Rodriguez',
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        school_name: 'Northwood Academy'
      },
      nominator: {
        first_name: 'Sarah',
        last_name: 'Johnson'
      }
    },
    {
      id: '3',
      award_cycle_id: '2',
      award_category_id: '1',
      nominee_id: '4',
      nominator_id: '3',
      nomination_statement: 'Mr. Kim has shown remarkable dedication to his students, particularly those facing challenges, creating individualized learning plans that have transformed their educational journeys.',
      supporting_documents: ['/docs/impact.pdf', '/docs/testimonials.pdf'],
      status: 'nominated',
      vote_count: 0,
      created_at: '2024-09-05T12:20:00Z',
      award_cycle: {
        title: '2025 Education Excellence Awards',
        status: 'nomination',
        announcement_date: '2024-11-20'
      },
      award_category: {
        name: 'Outstanding Educator',
        slug: 'outstanding-educator',
        description: 'Recognizing exceptional teaching and dedication to student success.',
        criteria: 'Demonstrated excellence in teaching, student outcomes, and educational innovation.'
      },
      nominee: {
        id: '4',
        first_name: 'David',
        last_name: 'Kim',
        profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        school_name: 'East Valley Middle School'
      },
      nominator: {
        first_name: 'Lisa',
        last_name: 'Rodriguez'
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setCategories(mockCategories)
    setAwardCycles(mockAwardCycles)
    setAwards(mockAwards)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = awards

    if (searchQuery) {
      filtered = filtered.filter(award =>
        award.nomination_statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        award.nominee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        award.nominee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        award.award_category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(award => award.award_category_id === selectedCategory)
    }

    if (selectedCycle) {
      filtered = filtered.filter(award => award.award_cycle_id === selectedCycle)
    }

    switch (sortBy) {
      case 'votes':
        filtered.sort((a, b) => b.vote_count - a.vote_count)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'category':
        filtered.sort((a, b) => a.award_category.name.localeCompare(b.award_category.name))
        break
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status))
        break
    }

    setFilteredAwards(filtered)
  }, [awards, searchQuery, selectedCategory, selectedCycle, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: string) => {
    const statusInfo = awardStatuses.find(s => s.id === status)
    if (statusInfo) {
      const IconComponent = statusInfo.icon
      return <IconComponent className="w-4 h-4" />
    }
    return <Award className="w-4 h-4" />
  }

  const getStatusColor = (status: string) => {
    const statusInfo = awardStatuses.find(s => s.id === status)
    return statusInfo ? statusInfo.color : '#6B7280'
  }

  const getCycleStatus = (cycle: AwardCycle) => {
    const now = new Date()

    if (now > new Date(cycle.announcement_date)) return { status: 'completed', color: 'text-gray-600', bgColor: 'bg-gray-100' }
    if (cycle.voting_end && now > new Date(cycle.voting_end)) return { status: 'voting-closed', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (cycle.voting_start && now >= new Date(cycle.voting_start)) return { status: 'voting', color: 'text-green-600', bgColor: 'bg-green-100' }
    if (now > new Date(cycle.nomination_end)) return { status: 'nomination-closed', color: 'text-orange-600', bgColor: 'bg-orange-100' }
    if (now >= new Date(cycle.nomination_start)) return { status: 'nomination-open', color: 'text-blue-600', bgColor: 'bg-blue-100' }

    return { status: 'upcoming', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-yellow-600" />
                PrinciAwards
              </h1>
              <p className="text-gray-600">Recognizing excellence and celebrating achievements in education</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-awards/nominate"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nominate Someone
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
                  placeholder="Search awards and nominees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedCycle}
                onChange={(e) => setSelectedCycle(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                <option value="">All Award Cycles</option>
                {awardCycles.map(cycle => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                <option value="votes">Most Votes</option>
                <option value="recent">Most Recent</option>
                <option value="category">By Category</option>
                <option value="status">By Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <>
            {/* Award Cycles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {awardCycles.map((cycle) => {
                const { status, color, bgColor } = getCycleStatus(cycle)
                return (
                  <div
                    key={cycle.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{cycle.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{cycle.description}</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Nominations</div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(cycle.nomination_start)} - {formatDate(cycle.nomination_end)}
                        </div>
                      </div>
                      {cycle.voting_start && (
                        <div>
                          <div className="text-xs text-gray-500">Voting</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(cycle.voting_start)} - {formatDate(cycle.voting_end!)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Announcement: {formatDate(cycle.announcement_date)}
                      </div>
                      <Link
                        to={`/princi-awards/cycles/${cycle.id}`}
                        className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 bg-white hover:border-yellow-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-2 ${selectedCategory === category.id ? 'text-yellow-600' : 'text-gray-600'}`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-medium text-gray-900">{category.name}</h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Nominations</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredAwards.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Winners</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredAwards.filter(award => award.status === 'winner').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Vote className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Votes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredAwards.reduce((sum, award) => sum + award.vote_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Cycles</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {awardCycles.filter(cycle => cycle.status !== 'completed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards Grid */}
            {filteredAwards.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No awards found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAwards.map((award) => (
                  <div
                    key={award.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {award.status === 'winner' && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-medium rounded-t-lg flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        WINNER
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full"
                                style={{ backgroundColor: getStatusColor(award.status) + '20', color: getStatusColor(award.status) }}>
                            {getStatusIcon(award.status)}
                            <span className="ml-1 capitalize">{award.status}</span>
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            {award.award_category.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <img
                          src={award.nominee.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(award.nominee.first_name + ' ' + award.nominee.last_name)}&background=random`}
                          alt={award.nominee.first_name + ' ' + award.nominee.last_name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {award.nominee.first_name} {award.nominee.last_name}
                          </h3>
                          <p className="text-sm text-gray-500">{award.nominee.school_name}</p>
                        </div>
                      </div>

                      <Link to={`/princi-awards/${award.id}`}>
                        <p className="text-gray-700 mb-4 line-clamp-3 hover:text-yellow-600 transition-colors">
                          {award.nomination_statement}
                        </p>
                      </Link>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500">Award Cycle</div>
                          <div className="font-medium text-gray-900 text-sm line-clamp-1">
                            {award.award_cycle.title}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Nominated by</div>
                          <div className="font-medium text-gray-900 text-sm">
                            {award.nominator.first_name} {award.nominator.last_name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Vote className="w-4 h-4 mr-1" />
                          {award.vote_count} votes
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(award.created_at)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/princi-awards/${award.id}`}
                            className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </div>

                        {award.award_cycle.status === 'voting' && isAuthenticated && (
                          <Link
                            to={`/princi-awards/${award.id}/vote`}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            <Vote className="w-4 h-4 mr-2" />
                            Vote
                          </Link>
                        )}

                        {award.status === 'winner' && (
                          <div className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm rounded-md">
                            <Trophy className="w-4 h-4 mr-2" />
                            Winner
                          </div>
                        )}
                      </div>

                      {award.supporting_documents && award.supporting_documents.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500 mb-2">Supporting Documents</div>
                          <div className="flex flex-wrap gap-2">
                            {award.supporting_documents.slice(0, 2).map((_, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                Document {index + 1}
                              </span>
                            ))}
                            {award.supporting_documents.length > 2 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                +{award.supporting_documents.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
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
