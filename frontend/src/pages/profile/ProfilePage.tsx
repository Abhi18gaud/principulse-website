import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/index'
import { setUser, clearUser } from '@/store/slices/authSlice'
import { userService } from '@/services'
import { authService } from '@/services/authService'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Video,
  Edit,
  Camera,
  Settings,
  LogOut,
  Shield,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Bell,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  Save,
  X
} from 'lucide-react'

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    schoolName: '',
    position: '',
    experienceYears: '',
    schoolAddress: ''
  })
  
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch fresh user data from database when profile page loads
    const fetchUserData = async () => {
      if (user) {
        try {
          setLoading(true)
          // Fetch fresh user data from database
          const profileData = await userService.getProfile()
          setUserProfile(profileData)
          
          // Update form data with fresh user data
          setFormData({
            firstName: profileData.user.firstName || '',
            lastName: profileData.user.lastName || '',
            email: profileData.user.email || '',
            phone: profileData.user.phone || '',
            bio: profileData.user.bio || '',
            schoolName: profileData.user.schoolName || '',
            position: profileData.user.position || '',
            experienceYears: profileData.user.experienceYears?.toString() || '',
            schoolAddress: profileData.user.schoolAddress || ''
          })
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Fallback to auth state if API fails
          setUserProfile({ user, stats: { postsCount: 0, videosCount: 0, followersCount: 0, followingCount: 0 } })
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            bio: user.bio || '',
            schoolName: user.schoolName || '',
            position: user.position || '',
            experienceYears: user.experienceYears?.toString() || '',
            schoolAddress: ''
          })
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        bio: formData.bio,
        schoolName: formData.schoolName,
        position: formData.position,
        experienceYears: formData.experienceYears ? parseInt(formData.experienceYears) : undefined,
        schoolAddress: formData.schoolAddress
      }
      
      const updatedUser = await userService.updateProfile(updateData)
      
      // Update Redux state with new user data (merge with existing user data)
      const mergedUser = { 
        ...user, 
        ...updatedUser,
        experienceYears: updatedUser.experienceYears?.toString() || user.experienceYears
      }
      dispatch(setUser(mergedUser))
      
      // Update local profile state
      setUserProfile(prev => ({ ...prev, user: mergedUser }))
      
      setIsEditing(false)
      console.log('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      
      // Call logout service
      await authService.logout()
      
      // Clear Redux state
      dispatch(clearUser())
      
      // Redirect to login page
      window.location.href = '/'
    } catch (error) {
      console.error('Error logging out:', error)
      // Even if API call fails, clear local state
      dispatch(clearUser())
      window.location.href = '/'
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        setLoading(true)
        
        // Upload avatar
        const avatarData = await userService.uploadAvatar(file)
        
        // Update user profile with new avatar URL
        const updatedUser = { 
          ...user, 
          profileImageUrl: avatarData.url 
        }
        dispatch(setUser(updatedUser))
        setUserProfile(prev => ({ ...prev, user: updatedUser }))
        
        console.log('Avatar uploaded successfully')
      } catch (error) {
        console.error('Error uploading avatar:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'activity', name: 'Activity', icon: TrendingUp },
    { id: 'content', name: 'Content', icon: BookOpen },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const mockStats = {
    totalPosts: 45,
    totalVideos: 12,
    totalViews: 12567,
    totalLikes: 890,
    totalComments: 234,
    totalShares: 56,
    joinDate: 'January 15, 2024',
    lastActive: '2 hours ago'
  }

  const mockActivity = [
    {
      id: '1',
      type: 'post',
      title: 'Published: Transforming School Leadership Through Digital Innovation',
      timestamp: '2 hours ago',
      icon: BookOpen
    },
    {
      id: '2',
      type: 'video',
      title: 'Uploaded: Building Inclusive School Communities',
      timestamp: '1 day ago',
      icon: Video
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned: Thought Leader Badge',
      timestamp: '3 days ago',
      icon: Award
    },
    {
      id: '4',
      type: 'comment',
      title: 'Commented on Data-Driven Decision Making',
      timestamp: '5 days ago',
      icon: MessageCircle
    }
  ]

  const mockAchievements = [
    {
      id: '1',
      title: 'Thought Leader',
      description: 'Recognized for innovative leadership approaches',
      icon: Star,
      date: 'March 2024',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: '2',
      title: 'Content Creator',
      description: 'Published 50+ high-quality posts',
      icon: BookOpen,
      date: 'February 2024',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: '3',
      title: 'Community Builder',
      description: 'Active in 10+ discussion forums',
      icon: Users,
      date: 'January 2024',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: '4',
      title: 'Mentor',
      description: 'Mentored 5 emerging leaders',
      icon: Shield,
      date: 'December 2023',
      color: 'bg-orange-100 text-orange-600'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-white/95">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 text-lg">Manage your professional profile and track your leadership journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-900">January 2024</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-semibold text-green-600">Verified</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <User className="w-6 h-6 mr-3 text-blue-600" />
                  Profile Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  {isEditing ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

{/* Avatar Section */}
<div className="flex items-center space-x-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
  <div className="relative">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-white">
      {user?.profileImageUrl ? (
        <img 
          src={user.profileImageUrl} 
          alt={user.firstName + ' ' + user.lastName}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-16 h-16 text-white" />
      )}
    </div>
    <button
      onClick={() => document.getElementById('avatar-upload')?.click()}
      className="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg transform transition-all duration-200 hover:scale-110"
    >
      <Camera className="w-5 h-5" />
    </button>
    <input
      id="avatar-upload"
      type="file"
      accept="image/*"
      onChange={handleAvatarUpload}
      className="hidden"
    />
  </div>

  <div className="flex-1">
    <h3 className="text-3xl font-bold text-gray-900 mb-3">
      {user?.firstName} {user?.lastName}
    </h3>
    <div className="flex items-center space-x-4 mb-3">
      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
        {user?.position || 'Educational Leader'}
      </span>
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
        {user?.isVerified ? 'Verified' : 'Pending'}
      </span>
    </div>
    <p className="text-gray-700 text-lg mb-2 font-medium">{user?.schoolName}</p>
    <div className="flex items-center space-x-6 text-gray-600">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Member since January 2024</span>
      </div>
      <div className="flex items-center">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{user?.schoolAddress || 'Location not set'}</span>
      </div>
    </div>
  </div>
</div>

{/* Profile Form */}
{isEditing && (
  <div className="space-y-6 border-t border-gray-200 pt-6">
    {/* First Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
        placeholder="Enter your first name"
      />
    </div>

    {/* Last Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
        placeholder="Enter your last name"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
        placeholder="your.email@example.com"
        readOnly
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
        placeholder="+1 (555) 123-4567"
      />
    </div>

    {/* School Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">School Name</label>
      <input
        type="text"
        value={formData.schoolName}
        onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
        placeholder="Enter your school name"
      />
    </div>

    {/* Position */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">Position</label>
      <select
        value={formData.position}
        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
      >
        <option value="">Select your position</option>
        <option value="Principal">Principal</option>
        <option value="Vice Principal">Vice Principal</option>
        <option value="Headmaster">Headmaster</option>
        <option value="Headmistress">Headmistress</option>
        <option value="Academic Head">Academic Head</option>
        <option value="Administrative Head">Administrative Head</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Experience Years */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">Years of Experience</label>
      <input
        type="number"
        value={formData.experienceYears}
        onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
        placeholder="Enter years of experience"
        min="0"
        max="50"
      />
    </div>

    {/* School Address */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">School Address</label>
      <textarea
        value={formData.schoolAddress}
        onChange={(e) => setFormData(prev => ({ ...prev, schoolAddress: e.target.value }))}
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm resize-none"
        placeholder="Enter school address..."
      />
    </div>

    {/* Bio */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">Professional Bio</label>
      <textarea
        value={formData.bio}
        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm resize-none"
        placeholder="Tell us about your professional background and interests..."
      />
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end space-x-4 pt-4">
      <button
        onClick={() => setIsEditing(false)}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        Cancel
      </button>
      <button
        onClick={handleSaveProfile}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </>
        )}
      </button>
    </div>
  </div>
)}
            </div>
          </div>

          {/* Right Column - Stats and Activity */}
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Performance Overview
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{userProfile?.stats?.postsCount || 0}</div>
                  <div className="text-sm text-gray-700 font-medium">Total Posts</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{userProfile?.stats?.videosCount || 0}</div>
                  <div className="text-sm text-gray-700 font-medium">Total Videos</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-green-600 mb-2">{userProfile?.stats?.followersCount || 0}</div>
                  <div className="text-sm text-gray-700 font-medium">Followers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{userProfile?.stats?.followingCount || 0}</div>
                  <div className="text-sm text-gray-700 font-medium">Following</div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Active:</span>
                  <span className="font-medium text-gray-900 bg-green-100 px-3 py-1 rounded-full">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-12" aria-label="Tabs">
                  {tabs.map(tab => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-2 py-4 border-b-4 font-medium text-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-6 h-6 mr-3" />
                        {tab.name}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <User className="w-6 h-6 mr-3 text-blue-600" />
                      Account Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-700 font-medium text-lg">Account Status</p>
                            <p className="text-gray-600 text-sm">Your account is active and in good standing</p>
                          </div>
                          <div className="px-4 py-2 bg-green-600 text-white rounded-full font-bold">Active</div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-700 font-medium text-lg">Verification Status</p>
                            <p className="text-gray-600 text-sm">Your identity has been verified</p>
                          </div>
                          <div className="px-4 py-2 bg-blue-600 text-white rounded-full font-bold flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verified
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-700 font-medium text-lg">Membership Type</p>
                            <p className="text-gray-600 text-sm">Premium member with full access</p>
                          </div>
                          <div className="px-4 py-2 bg-purple-600 text-white rounded-full font-bold">Premium</div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-700 font-medium text-lg">Profile Completion</p>
                            <p className="text-gray-600 text-sm">85% of profile completed</p>
                          </div>
                          <div className="text-2xl font-bold text-orange-600">85%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {mockActivity.map((activity, index) => {
                        const ActivityIcon = activity.icon
                        return (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ${activity.type === 'achievement' ? 'bg-yellow-100' : activity.type === 'comment' ? 'bg-green-100' : 'bg-purple-100'}`}>
                              <ActivityIcon className={`w-5 h-5 ${activity.type === 'achievement' ? 'text-yellow-600' : activity.type === 'comment' ? 'text-green-600' : 'text-purple-600'}`} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-500">{activity.timestamp}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">My Content</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{mockStats.totalPosts}</div>
                        <div className="text-sm text-gray-600">Posts Published</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{mockStats.totalVideos}</div>
                        <div className="text-sm text-gray-600">Videos Uploaded</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                    <div className="space-y-4">
                      {mockAchievements.map((achievement, index) => {
                        const AchievementIcon = achievement.icon
                        return (
                          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center`}>
                              <AchievementIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                              <div className="text-xs text-gray-500">{achievement.date}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive email updates about your activity</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">Email Notifications</span>
                          <span className="translate-x-6 inline-block h-4 w-4 bg-blue-600 rounded-full shadow-lg transform ring-0 transition duration-200 ease-in-out group-hover:translate-x-0"></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">Profile Visibility</p>
                          <p className="text-sm text-gray-500">Control who can see your profile</p>
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Public</option>
                          <option>Members Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">Two-Factor Authentication</span>
                          <span className="translate-x-6 inline-block h-4 w-4 bg-blue-600 rounded-full shadow-lg transform ring-0 transition duration-200 ease-in-out group-hover:translate-x-0"></span>
                        </button>
                      </div>
                      
                      {/* Logout Button */}
                      <div className="border-t border-gray-200 pt-6">
                        <button
                          onClick={handleLogout}
                          disabled={loading}
                          className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Logging out...
                            </>
                          ) : (
                            <>
                              <LogOut className="w-4 h-4 mr-2" />
                              Sign Out
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
