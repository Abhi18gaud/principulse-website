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
  Building,
  MapPin,
  Globe,
  UserPlus,
  Award,
  Target,
  CheckCircle,
  Crown
} from 'lucide-react'

interface Hub {
  id: string
  name: string
  hub_type: string
  location: string
  description: string
  leader_id?: string
  member_count: number
  is_active: boolean
  created_at: string
  leader?: {
    first_name: string
    last_name: string
    school_name?: string
  }
}

interface HubEvent {
  id: string
  hub_id: string
  organizer_id: string
  title: string
  description: string
  event_type: string
  venue: string
  address: string
  start_time: string
  end_time: string
  max_participants: number
  is_paid: boolean
  price: number
  status: string
  created_at: string
}

export const PrinciHubsPage: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([])
  const [hubEvents, setHubEvents] = useState<HubEvent[]>([])
  const [filteredHubs, setFilteredHubs] = useState<Hub[]>([])
  const [filteredEvents, setFilteredEvents] = useState<HubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [activeTab, setActiveTab] = useState('hubs')
  const [sortBy, setSortBy] = useState('members')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const hubTypes = [
    { id: '', name: 'All Types', icon: Building, color: '#6B7280' },
    { id: 'district', name: 'District', icon: Building, color: '#3B82F6' },
    { id: 'regional', name: 'Regional', icon: MapPin, color: '#10B981' },
    { id: 'state', name: 'State', icon: Globe, color: '#F59E0B' }
  ]

  const locations = [
    { id: '', name: 'All Locations', color: '#6B7280' },
    { id: 'california', name: 'California', color: '#3B82F6' },
    { id: 'texas', name: 'Texas', color: '#10B981' },
    { id: 'florida', name: 'Florida', color: '#F59E0B' },
    { id: 'new-york', name: 'New York', color: '#8B5CF6' },
    { id: 'illinois', name: 'Illinois', color: '#EF4444' }
  ]

  // Mock data - will be replaced with API calls
  const mockHubs: Hub[] = [
    {
      id: '1',
      name: 'California District Hub',
      hub_type: 'district',
      location: 'California',
      description: 'Connecting educators across California\'s diverse school districts. From Silicon Valley to rural communities, we bring together educators to share best practices and drive innovation.',
      leader_id: '1',
      member_count: 1247,
      is_active: true,
      created_at: '2023-01-15T00:00:00Z',
      leader: {
        first_name: 'Dr. Sarah',
        last_name: 'Mitchell',
        school_name: 'Westfield School District'
      }
    },
    {
      id: '2',
      name: 'Texas Regional Network',
      hub_type: 'regional',
      location: 'Texas',
      description: 'A vibrant community of Texas educators spanning from Houston to Dallas, Austin to San Antonio. Together we\'re building stronger schools and better futures for Texas students.',
      leader_id: '2',
      member_count: 892,
      is_active: true,
      created_at: '2023-03-10T00:00:00Z',
      leader: {
        first_name: 'Michael',
        last_name: 'Chen',
        school_name: 'Riverside Elementary'
      }
    },
    {
      id: '3',
      name: 'Florida State Educators Alliance',
      hub_type: 'state',
      location: 'Florida',
      description: 'Florida\'s statewide network of educators committed to excellence in education. From Miami to Jacksonville, we unite educators in their mission to inspire and educate.',
      leader_id: '3',
      member_count: 2156,
      is_active: true,
      created_at: '2023-02-20T00:00:00Z',
      leader: {
        first_name: 'Lisa',
        last_name: 'Rodriguez',
        school_name: 'Northwood Academy'
      }
    }
  ]

  const mockEvents: HubEvent[] = [
    {
      id: '1',
      hub_id: '1',
      organizer_id: '1',
      title: 'California STEM Summit 2024',
      description: 'Annual gathering of STEM educators from across California. Featuring keynote speakers, hands-on workshops, and networking opportunities.',
      event_type: 'summit',
      venue: 'San Francisco Convention Center',
      address: '747 Howard St, San Francisco, CA 94103',
      start_time: '2024-04-15T09:00:00Z',
      end_time: '2024-04-17T18:00:00Z',
      max_participants: 500,
      is_paid: true,
      price: 150,
      status: 'upcoming',
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      hub_id: '2',
      organizer_id: '2',
      title: 'Texas Teacher Leadership Workshop',
      description: 'Interactive workshop focused on developing leadership skills for classroom teachers aspiring to take on leadership roles.',
      event_type: 'workshop',
      venue: 'Austin Community College',
      address: '5930 Middle Fiskville Rd, Austin, TX 78752',
      start_time: '2024-03-20T10:00:00Z',
      end_time: '2024-03-20T16:00:00Z',
      max_participants: 75,
      is_paid: false,
      price: 0,
      status: 'upcoming',
      created_at: '2024-01-18T00:00:00Z'
    },
    {
      id: '3',
      hub_id: '3',
      organizer_id: '3',
      title: 'Florida Education Innovation Meetup',
      description: 'Monthly meetup for Florida educators interested in educational technology and innovative teaching methods.',
      event_type: 'meetup',
      venue: 'Orlando Tech Hub',
      address: '123 Innovation Dr, Orlando, FL 32801',
      start_time: '2024-02-15T18:30:00Z',
      end_time: '2024-02-15T21:00:00Z',
      max_participants: 100,
      is_paid: false,
      price: 0,
      status: 'upcoming',
      created_at: '2024-01-20T00:00:00Z'
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setHubs(mockHubs)
    setHubEvents(mockEvents)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = hubs

    if (searchQuery) {
      filtered = filtered.filter(hub =>
        hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hub.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(hub => hub.hub_type === selectedType)
    }

    if (selectedLocation) {
      filtered = filtered.filter(hub => hub.location.toLowerCase().replace(' ', '-') === selectedLocation)
    }

    switch (sortBy) {
      case 'members':
        filtered.sort((a, b) => b.member_count - a.member_count)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredHubs(filtered)
  }, [hubs, searchQuery, selectedType, selectedLocation, sortBy])

  useEffect(() => {
    let filtered = hubEvents

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [hubEvents, searchQuery])

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
      minute: '2-digit'
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

  const getHubTypeIcon = (type: string) => {
    const hubType = hubTypes.find(t => t.id === type)
    if (hubType) {
      const IconComponent = hubType.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <Building className="w-5 h-5" />
  }

  const getEventStatus = (event: HubEvent) => {
    const now = new Date()
    const start = new Date(event.start_time)
    const end = new Date(event.end_time)

    if (now > end) return { status: 'completed', color: 'text-gray-600', bgColor: 'bg-gray-100' }
    if (now >= start && now <= end) return { status: 'ongoing', color: 'text-green-600', bgColor: 'bg-green-100' }

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
                <Building className="w-8 h-8 mr-3 text-cyan-600" />
                PrinciHubs
              </h1>
              <p className="text-gray-600">Local chapters and regional communities for educators</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-hubs/create"
                className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Hub
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('hubs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'hubs'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Hubs
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Hub Events
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'hubs' && (
              <>
                <div className="relative">
                  <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                  >
                    {hubTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                  >
                    <option value="members">Most Members</option>
                    <option value="recent">Recently Created</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'hubs' ? (
              <>
                {/* Hub Types Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {hubTypes.map(type => {
                    const IconComponent = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(selectedType === type.id ? '' : type.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedType === type.id
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-gray-200 bg-white hover:border-cyan-300'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`mb-2 ${selectedType === type.id ? 'text-cyan-600' : 'text-gray-600'}`}>
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
                      <div className="p-3 bg-cyan-100 rounded-lg">
                        <Building className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Hubs</p>
                        <p className="text-2xl font-bold text-gray-900">{filteredHubs.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Members</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredHubs.reduce((sum, hub) => sum + hub.member_count, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Globe className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Locations</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {new Set(filteredHubs.map(hub => hub.location)).size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Hubs</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {filteredHubs.filter(hub => hub.is_active).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hubs Grid */}
                {filteredHubs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No hubs found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHubs.map((hub) => (
                      <div
                        key={hub.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-cyan-100 text-cyan-800 capitalize">
                                {getHubTypeIcon(hub.hub_type)}
                                <span className="ml-1">{hub.hub_type}</span>
                              </span>
                              <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" />
                                {hub.location}
                              </span>
                            </div>
                          </div>

                          <Link to={`/princi-hubs/${hub.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-cyan-600 transition-colors">
                              {hub.name}
                            </h3>
                          </Link>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {hub.description}
                          </p>

                          {hub.leader && (
                            <div className="flex items-center mb-4">
                              <div className="flex items-center">
                                <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                                <span className="text-sm text-gray-700">Led by</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900 ml-2">
                                {hub.leader.first_name} {hub.leader.last_name}
                              </span>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900">{hub.member_count.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">Members</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900">
                                {hub.is_active ? 'Active' : 'Inactive'}
                              </div>
                              <div className="text-xs text-gray-500">Status</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Founded {formatDate(hub.created_at)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/princi-hubs/${hub.id}`}
                                className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white text-sm rounded-md hover:bg-cyan-700 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Hub
                              </Link>
                            </div>

                            {isAuthenticated && hub.is_active && (
                              <Link
                                to={`/princi-hubs/${hub.id}/join`}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Join Hub
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Hub Events */}
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No hub events found</div>
                    <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredEvents.map((event) => {
                      const { status, color, bgColor } = getEventStatus(event)
                      return (
                        <div
                          key={event.id}
                          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${color}`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
                                  {event.event_type}
                                </span>
                              </div>
                            </div>

                            <Link to={`/princi-hubs/events/${event.id}`}>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-cyan-600 transition-colors">
                                {event.title}
                              </h3>
                            </Link>

                            <p className="text-gray-700 mb-4 line-clamp-3">
                              {event.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                              <div>
                                <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                                <div className="font-medium text-gray-900">
                                  {formatDate(event.start_time)} at {formatTime(event.start_time)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Duration: {Math.round((new Date(event.end_time).getTime() - new Date(event.start_time).getTime()) / (1000 * 60 * 60))} hours
                                </div>
                              </div>

                              <div>
                                <div className="text-sm text-gray-500 mb-1">Venue</div>
                                <div className="font-medium text-gray-900">{event.venue}</div>
                                <div className="text-sm text-gray-600">{event.address}</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                Max {event.max_participants} participants
                              </span>
                              {event.is_paid ? (
                                <span className="flex items-center font-medium text-green-600">
                                  <Target className="w-4 h-4 mr-1" />
                                  {formatCurrency(event.price)}
                                </span>
                              ) : (
                                <span className="text-green-600 font-medium">Free Event</span>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                Organized {formatDate(event.created_at)}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Link
                                  to={`/princi-hubs/events/${event.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white text-sm rounded-md hover:bg-cyan-700 transition-colors"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Link>

                                {isAuthenticated && status === 'upcoming' && (
                                  <Link
                                    to={`/princi-hubs/events/${event.id}/register`}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Register
                                  </Link>
                                )}

                                {status === 'ongoing' && (
                                  <Link
                                    to={`/princi-hubs/events/${event.id}/join`}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors animate-pulse"
                                  >
                                    <Target className="w-4 h-4 mr-2" />
                                    Join Now
                                  </Link>
                                )}

                                {status === 'completed' && (
                                  <span className="inline-flex items-center px-4 py-2 bg-gray-400 text-white text-sm rounded-md cursor-not-allowed">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Completed
                                  </span>
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
            )}
          </>
        )}
      </div>
    </div>
  )
}
