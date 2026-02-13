import React, { useState, useEffect } from 'react'
import {
  Users,
  Search,
  MoreHorizontal,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Phone,
  Building,
  Crown,
  UserCheck,
  AlertTriangle,
  Download,
  Plus
} from 'lucide-react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  schoolName: string
  position: string
  isActive: boolean
  isVerified: boolean
  role: string
  joinDate: string
  lastLogin?: string
  postsCount: number
  followersCount: number
}

export const AdminUsersPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in real app, this would come from API
  const users: User[] = [
    {
      id: '1',
      firstName: 'Dr. Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@school.edu',
      phone: '+91 98765 43210',
      schoolName: 'Delhi Public School',
      position: 'Principal',
      isActive: true,
      isVerified: true,
      role: 'member',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-20',
      postsCount: 24,
      followersCount: 156
    },
    {
      id: '2',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@school.edu',
      phone: '+91 87654 32109',
      schoolName: 'St. Mary\'s School',
      position: 'Vice Principal',
      isActive: true,
      isVerified: true,
      role: 'member',
      joinDate: '2023-03-22',
      lastLogin: '2024-01-19',
      postsCount: 18,
      followersCount: 89
    },
    {
      id: '3',
      firstName: 'Meera',
      lastName: 'Singh',
      email: 'meera.singh@school.edu',
      schoolName: 'Modern High School',
      position: 'Principal',
      isActive: false,
      isVerified: true,
      role: 'member',
      joinDate: '2023-06-10',
      lastLogin: '2024-01-15',
      postsCount: 31,
      followersCount: 203
    },
    {
      id: '4',
      firstName: 'Amit',
      lastName: 'Patel',
      email: 'amit.patel@school.edu',
      phone: '+91 76543 21098',
      schoolName: 'Green Valley School',
      position: 'Headmaster',
      isActive: true,
      isVerified: false,
      role: 'member',
      joinDate: '2023-08-05',
      postsCount: 12,
      followersCount: 67
    },
    {
      id: '5',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@principulse.com',
      schoolName: 'Principulse',
      position: 'Administrator',
      isActive: true,
      isVerified: true,
      role: 'admin',
      joinDate: '2023-01-01',
      lastLogin: '2024-01-20',
      postsCount: 0,
      followersCount: 0
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email} ${user.schoolName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive) ||
      (statusFilter === 'unverified' && !user.isVerified)

    const matchesRole = roleFilter === 'all' || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length
        ? []
        : filteredUsers.map(user => user.id)
    )
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <Crown className="w-3 h-3 mr-1" />
          Admin
        </span>
      case 'moderator':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <UserCheck className="w-3 h-3 mr-1" />
          Moderator
        </span>
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Member
        </span>
    }
  }

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isVerified) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Unverified
      </span>
    }
    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="mt-1 text-gray-600">Manage and monitor platform users</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.isActive).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unverified</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => !u.isVerified).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="unverified">Unverified</option>
              </select>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>
            </div>

            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
                <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                  <Ban className="w-4 h-4 mr-1 inline" />
                  Suspend
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.position}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            {getRoleBadge(user.role)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      {user.phone && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{user.schoolName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.isActive, user.isVerified)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>{user.postsCount} posts</div>
                        <div className="text-gray-500">{user.followersCount} followers</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className={`${
                          user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}>
                          {user.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <div className="relative">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
