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
  Users,
  Star, 
  Trophy, 
  Target, 
  Play, 
  Award, 
  BookOpen, 
  Brain
} from 'lucide-react'

interface Quest {
  id: string
  title: string
  description: string
  quest_type: string
  category: string
  start_date: string
  end_date: string
  is_active: boolean
  prize_description: string
  max_participants: number
  participant_count: number
  created_at: string
}

export const PrinciQuestPage: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([])
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const questTypes = [
    { id: '', name: 'All Types', icon: Target, color: '#6B7280' },
    { id: 'quiz', name: 'Quiz', icon: Brain, color: '#3B82F6' },
    { id: 'contest', name: 'Contest', icon: Trophy, color: '#F59E0B' },
    { id: 'challenge', name: 'Challenge', icon: Target, color: '#10B981' },
    { id: 'competition', name: 'Competition', icon: Award, color: '#8B5CF6' }
  ]

  const categories = [
    { id: '', name: 'All Categories', icon: BookOpen, color: '#6B7280' },
    { id: 'education', name: 'Education', icon: BookOpen, color: '#3B82F6' },
    { id: 'leadership', name: 'Leadership', icon: Award, color: '#10B981' },
    { id: 'teaching', name: 'Teaching', icon: Users, color: '#F59E0B' },
    { id: 'student-success', name: 'Student Success', icon: Trophy, color: '#8B5CF6' },
    { id: 'innovation', name: 'Innovation', icon: Target, color: '#EF4444' }
  ]

  // Mock data - will be replaced with API calls
  const mockQuests: Quest[] = [
    {
      id: '1',
      title: 'Educational Leadership Quiz',
      description: 'Test your knowledge of modern educational leadership principles and practices. 20 questions covering leadership theories, management strategies, and current trends.',
      quest_type: 'quiz',
      category: 'leadership',
      start_date: '2024-02-01',
      end_date: '2024-02-28',
      is_active: true,
      prize_description: 'Certificate of Excellence + Featured on Leaderboard',
      max_participants: 500,
      participant_count: 234,
      created_at: '2024-01-20T00:00:00Z'
    },
    {
      id: '2',
      title: 'Teaching Innovation Challenge',
      description: 'Design and present an innovative teaching method or classroom activity. Submit your ideas and get feedback from peers. Winners get featured in our newsletter!',
      quest_type: 'challenge',
      category: 'innovation',
      start_date: '2024-01-15',
      end_date: '2024-02-15',
      is_active: true,
      prize_description: '$500 grant for classroom resources + Professional development opportunity',
      max_participants: 100,
      participant_count: 67,
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      title: 'Student Success Stories Contest',
      description: 'Share inspiring stories of student success and transformation. Tell us about students who overcame challenges and achieved their goals.',
      quest_type: 'contest',
      category: 'student-success',
      start_date: '2024-01-01',
      end_date: '2024-01-31',
      is_active: false,
      prize_description: 'Story published in educational journal + $200 gift card',
      max_participants: 200,
      participant_count: 156,
      created_at: '2023-12-20T00:00:00Z'
    },
    {
      id: '4',
      title: 'Educational Technology Competition',
      description: 'Create educational content using digital tools. Submit videos, interactive presentations, or apps that enhance learning.',
      quest_type: 'competition',
      category: 'education',
      start_date: '2024-02-10',
      end_date: '2024-03-10',
      is_active: true,
      prize_description: 'Grand prize: $1000 + Featured on EdTech conference',
      max_participants: 50,
      participant_count: 23,
      created_at: '2024-01-25T00:00:00Z'
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setQuests(mockQuests)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = quests

    if (searchQuery) {
      filtered = filtered.filter(quest =>
        quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(quest => quest.category === selectedCategory)
    }

    if (selectedType) {
      filtered = filtered.filter(quest => quest.quest_type === selectedType)
    }

    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.participant_count - a.participant_count)
        break
      case 'ending-soon':
        filtered.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime())
        break
      case 'starting-soon':
        filtered.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        break
    }

    setFilteredQuests(filtered)
  }, [quests, searchQuery, selectedCategory, selectedType, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getQuestStatus = (quest: Quest) => {
    const now = new Date()
    const start = new Date(quest.start_date)
    const end = new Date(quest.end_date)

    if (now < start) return { status: 'upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (now >= start && now <= end && quest.is_active) return { status: 'active', color: 'text-green-600', bgColor: 'bg-green-100' }
    return { status: 'ended', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  }

  const getQuestIcon = (type: string) => {
    const questType = questTypes.find(t => t.id === type)
    if (questType) {
      const IconComponent = questType.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <Target className="w-5 h-5" />
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <BookOpen className="w-4 h-4" />
      case 'leadership':
        return <Award className="w-4 h-4" />
      case 'teaching':
        return <Users className="w-4 h-4" />
      case 'student-success':
        return <Trophy className="w-4 h-4" />
      case 'innovation':
        return <Target className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Target className="w-8 h-8 mr-3 text-purple-600" />
                PrinciQuest
              </h1>
              <p className="text-gray-600">Quizzes, challenges, and competitions for educational excellence</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-quest/create"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Quest
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
                  placeholder="Search quests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {questTypes.map(type => (
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
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="ending-soon">Ending Soon</option>
                <option value="starting-soon">Starting Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Quest Types and Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[...questTypes.slice(1), ...categories.slice(1)].map((item, index) => {
                const IconComponent = item.icon
                const isType = index < questTypes.length - 1
                const isSelected = isType
                  ? selectedType === item.id
                  : selectedCategory === item.id

                return (
                  <button
                    key={`${isType ? 'type' : 'category'}-${item.id}`}
                    onClick={() => {
                      if (isType) {
                        setSelectedType(selectedType === item.id ? '' : item.id)
                      } else {
                        setSelectedCategory(selectedCategory === item.id ? '' : item.id)
                      }
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-2 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-medium text-gray-900">{item.name}</h3>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Quests</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredQuests.length}</p>
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
                      {filteredQuests.reduce((sum, quest) => sum + quest.participant_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Play className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Quests</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredQuests.filter(quest => quest.is_active && new Date(quest.start_date) <= new Date() && new Date(quest.end_date) >= new Date()).length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Prizes Available</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredQuests.filter(quest => quest.prize_description).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quests Grid */}
            {filteredQuests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No quests found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuests.map((quest) => {
                  const { status, color, bgColor } = getQuestStatus(quest)
                  return (
                    <div
                      key={quest.id}
                      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                            <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                              {getQuestIcon(quest.quest_type)}
                              <span className="ml-1 capitalize">{quest.quest_type}</span>
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {quest.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {quest.description}
                        </p>

                        <div className="flex items-center mb-3">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {getCategoryIcon(quest.category)}
                            <span className="ml-1 capitalize">{quest.category.replace('-', ' ')}</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Start Date</div>
                            <div className="font-medium text-gray-900 text-sm">
                              {formatDate(quest.start_date)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">End Date</div>
                            <div className="font-medium text-gray-900 text-sm">
                              {formatDate(quest.end_date)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {quest.participant_count}/{quest.max_participants} participants
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Created {formatDate(quest.created_at)}
                          </span>
                        </div>

                        {quest.prize_description && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center">
                              <Trophy className="w-4 h-4 text-yellow-600 mr-2" />
                              <span className="text-sm font-medium text-yellow-800">Prize:</span>
                            </div>
                            <p className="text-sm text-yellow-700 mt-1">{quest.prize_description}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/princi-quest/${quest.id}`}
                              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </div>

                          {isAuthenticated && status === 'active' && (
                            <Link
                              to={`/princi-quest/${quest.id}/participate`}
                              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Participate
                            </Link>
                          )}

                          {status === 'upcoming' && (
                            <Link
                              to={`/princi-quest/${quest.id}`}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Set Reminder
                            </Link>
                          )}

                          {status === 'ended' && (
                            <Link
                              to={`/princi-quest/${quest.id}/results`}
                              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                            >
                              <Trophy className="w-4 h-4 mr-2" />
                              View Results
                            </Link>
                          )}
                        </div>
                      </div>
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
