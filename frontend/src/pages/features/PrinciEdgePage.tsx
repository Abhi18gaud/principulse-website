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
  Video, 
  Play, 
  Monitor, 
  Mic, 
  Award, 
  Target, 
  DollarSign, 
  UserCheck
} from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  speaker_name: string
  speaker_bio: string
  speaker_image_url?: string
  event_type: string
  start_time: string
  end_time: string
  timezone: string
  meeting_url?: string
  meeting_id?: string
  password?: string
  max_participants: number
  is_paid: boolean
  price: number
  is_featured: boolean
  status: string
  thumbnail_url?: string
  recording_url?: string
  participant_count: number
  created_at: string
}

export const PrinciEdgePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('upcoming')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const eventTypes = [
    { id: '', name: 'All Types', icon: Monitor, color: '#6B7280' },
    { id: 'webinar', name: 'Webinar', icon: Video, color: '#3B82F6' },
    { id: 'seminar', name: 'Seminar', icon: Users, color: '#10B981' },
    { id: 'summit', name: 'Summit', icon: Award, color: '#F59E0B' },
    { id: 'workshop', name: 'Workshop', icon: Target, color: '#8B5CF6' },
    { id: 'conference', name: 'Conference', icon: Mic, color: '#EF4444' }
  ]

  // Mock data - will be replaced with API calls
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Digital Transformation in Education',
      description: 'Join leading educators and tech experts as they discuss the future of digital learning. Learn about innovative tools, AI integration, and creating engaging online learning experiences.',
      speaker_name: 'Dr. Sarah Mitchell',
      speaker_bio: 'Superintendent with 20+ years in educational technology implementation.',
      speaker_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b6127a20?w=150',
      event_type: 'webinar',
      start_time: '2024-02-15T14:00:00Z',
      end_time: '2024-02-15T16:00:00Z',
      timezone: 'EST',
      meeting_url: 'https://zoom.us/meeting123',
      meeting_id: '123-456-789',
      password: 'edu2024',
      max_participants: 500,
      is_paid: false,
      price: 0,
      is_featured: true,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f20?w=800',
      recording_url: '',
      participant_count: 234,
      created_at: '2024-01-20T00:00:00Z'
    },
    {
      id: '2',
      title: 'Building Resilient School Communities',
      description: 'A comprehensive workshop on fostering mental health and wellbeing in educational settings. Learn practical strategies for supporting students, teachers, and families.',
      speaker_name: 'Prof. Michael Chen',
      speaker_bio: 'Clinical psychologist specializing in educational mental health.',
      speaker_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      event_type: 'workshop',
      start_time: '2024-02-10T10:00:00Z',
      end_time: '2024-02-10T17:00:00Z',
      timezone: 'PST',
      meeting_url: 'https://meet.google.com/workshop456',
      max_participants: 50,
      is_paid: true,
      price: 99,
      is_featured: false,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1573497019940-1c28988d916?w=800',
      recording_url: '',
      participant_count: 23,
      created_at: '2024-01-18T00:00:00Z'
    },
    {
      id: '3',
      title: 'Leadership Summit 2024',
      description: 'Annual gathering of educational leaders from across the country. Network, learn from keynote speakers, and participate in interactive sessions on current challenges and solutions.',
      speaker_name: 'Multiple Speakers',
      speaker_bio: 'Distinguished educators, superintendents, and education researchers.',
      event_type: 'summit',
      start_time: '2024-03-20T09:00:00Z',
      end_time: '2024-03-22T18:00:00Z',
      timezone: 'CST',
      meeting_url: 'https://summit.edu/live',
      max_participants: 1000,
      is_paid: true,
      price: 299,
      is_featured: true,
      status: 'upcoming',
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      recording_url: '',
      participant_count: 456,
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '4',
      title: 'STEM Education Best Practices',
      description: 'Recorded webinar showcasing successful STEM implementation strategies from top-performing schools. Learn from real-world case studies and implementation guides.',
      speaker_name: 'Dr. Lisa Rodriguez',
      speaker_bio: 'STEM curriculum specialist with expertise in program development.',
      speaker_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      event_type: 'webinar',
      start_time: '2024-01-10T15:00:00Z',
      end_time: '2024-01-10T17:00:00Z',
      timezone: 'EST',
      meeting_url: '',
      max_participants: 1000,
      is_paid: false,
      price: 0,
      is_featured: false,
      status: 'completed',
      thumbnail_url: 'https://images.unsplash.com/photo-1581291518857-6e9180ad8a1a?w=800',
      recording_url: 'https://vimeo.com/789012345',
      participant_count: 678,
      created_at: '2024-01-05T00:00:00Z'
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setEvents(mockEvents)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.speaker_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(event => event.event_type === selectedType)
    }

    switch (sortBy) {
      case 'upcoming':
        filtered.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
        filtered = filtered.filter(event => new Date(event.start_time) > new Date())
        break
      case 'popular':
        filtered.sort((a, b) => b.participant_count - a.participant_count)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedType, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  const getEventStatus = (event: Event) => {
    const now = new Date()
    const start = new Date(event.start_time)
    const end = new Date(event.end_time)

    if (now < start) return { status: 'upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (now >= start && now <= end) return { status: 'live', color: 'text-red-600', bgColor: 'bg-red-100' }
    return { status: 'completed', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  }

  const getEventIcon = (type: string) => {
    const eventType = eventTypes.find(t => t.id === type)
    if (eventType) {
      const IconComponent = eventType.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <Monitor className="w-5 h-5" />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Monitor className="w-8 h-8 mr-3 text-indigo-600" />
                PrinciEdge
              </h1>
              <p className="text-gray-600">Webinars, seminars, and professional development events</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-edge/create"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
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
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
              >
                {eventTypes.map(type => (
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
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Event Types Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {eventTypes.map(type => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(selectedType === type.id ? '' : type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-2 ${selectedType === type.id ? 'text-indigo-600' : 'text-gray-600'}`}>
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
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Monitor className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredEvents.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredEvents.reduce((sum, event) => sum + event.participant_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Live Events</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredEvents.filter(event => getEventStatus(event).status === 'live').length}
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
                      {formatCurrency(filteredEvents.filter(event => event.is_paid).reduce((sum, event) => sum + (event.price * event.participant_count), 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No events found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const { status, color, bgColor } = getEventStatus(event)
                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      {event.is_featured && (
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 text-xs font-medium rounded-t-lg">
                          Featured Event
                        </div>
                      )}

                      <Link to={`/princi-edge/${event.id}`}>
                        <div className="relative">
                          {event.thumbnail_url ? (
                            <img
                              src={event.thumbnail_url}
                              alt={event.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                              <div className="text-center">
                                {getEventIcon(event.event_type)}
                                <p className="text-sm text-gray-600 mt-2 capitalize">{event.event_type}</p>
                              </div>
                            </div>
                          )}

                          <div className="absolute top-2 left-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>

                          <div className="absolute top-2 right-2">
                            <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-90 text-gray-800">
                              {getEventIcon(event.event_type)}
                              <span className="ml-1 capitalize">{event.event_type}</span>
                            </span>
                          </div>

                          {status === 'live' && (
                            <div className="absolute bottom-2 left-2">
                              <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                                LIVE NOW
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {event.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {event.description}
                          </p>

                          <div className="flex items-center mb-4">
                            {event.speaker_image_url && (
                              <img
                                src={event.speaker_image_url}
                                alt={event.speaker_name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{event.speaker_name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{event.speaker_bio}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-500">Date & Time</div>
                              <div className="font-medium text-gray-900 text-sm">
                                {formatDate(event.start_time)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatTime(event.start_time)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Duration</div>
                              <div className="font-medium text-gray-900 text-sm">
                                {Math.round((new Date(event.end_time).getTime() - new Date(event.start_time).getTime()) / (1000 * 60 * 60))}h
                              </div>
                              <div className="text-xs text-gray-500">
                                {event.timezone}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.participant_count}/{event.max_participants} registered
                            </span>
                            {event.is_paid ? (
                              <span className="flex items-center font-medium text-green-600">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {formatCurrency(event.price)}
                              </span>
                            ) : (
                              <span className="text-green-600 font-medium">Free</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/princi-edge/${event.id}`}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </div>

                            {status === 'upcoming' && isAuthenticated && (
                              <Link
                                to={`/princi-edge/${event.id}/register`}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Register
                              </Link>
                            )}

                            {status === 'live' && (
                              <Link
                                to={`/princi-edge/${event.id}/join`}
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors animate-pulse"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Join Live
                              </Link>
                            )}

                            {status === 'completed' && event.recording_url && (
                              <Link
                                to={`/princi-edge/${event.id}/recording`}
                                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Watch Recording
                              </Link>
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
