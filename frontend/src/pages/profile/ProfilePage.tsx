import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/index'
import { userService } from '@/services'
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
    const loadUserProfile = async () => {
      try {
        setLoading(true)
        const profileData = await userService.getProfile()
        setUserProfile(profileData)
        
        // Set form data with user profile
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
        console.error('Error loading user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        school: user.school_name || '',
        role: user.role || '',
        experience: user.experience || '',
        location: user.location || ''
      })
    }
    setLoading(false)
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
      
      await userService.updateProfile(updateData)
      
      // Reload profile to get updated data
      const profileData = await userService.getProfile()
      setUserProfile(profileData)
      
      setIsEditing(false)
      // Show success message (you could add a toast notification here)
      console.log('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      // Show error message (you could add a toast notification here)
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
        await userService.uploadAvatar(file)
        
        // Update user profile to get new avatar URL
        const profileData = await userService.getProfile()
        setUserProfile(profileData)
        
        // Show success message (you could add a toast notification here)
        console.log('Avatar uploaded successfully')
      } catch (error) {
        console.error('Error uploading avatar:', error)
        // Show error message (you could add a toast notification here)
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and track your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

{/* Avatar Section */}
<div className="flex items-center space-x-6 mb-6">
  <div className="relative">
    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
      {user?.profile_image_url ? (
        <img 
          src={user.profile_image_url} 
          alt={user.first_name + ' ' + user.last_name}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-12 h-12 text-gray-400" />
      )}
    </div>
    <button
      onClick={() => document.getElementById('avatar-upload')?.click()}
      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
    >
      <Camera className="w-4 h-4" />
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
    <h3 className="text-2xl font-bold text-gray-900 mb-2">
      {user?.first_name} {user?.last_name}
    </h3>
    <p className="text-gray-600 mb-4">{user?.role}</p>
    <p className="text-gray-600 mb-1">{user?.school_name}</p>
    <p className="text-sm text-gray-500 mb-4">Member since {mockStats.joinDate}</p>
  </div>
</div>

{/* Profile Form */}
{isEditing && (
  <div className="space-y-4 border-t border-gray-200 pt-6">
    {/* First Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Last Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* School Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
      <input
        type="text"
        value={formData.schoolName}
        onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Position */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
      <select
        value={formData.position}
        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
      <input
        type="number"
        value={formData.experienceYears}
        onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* School Address */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">School Address</label>
      <textarea
        value={formData.schoolAddress}
        onChange={(e) => setFormData(prev => ({ ...prev, schoolAddress: e.target.value }))}
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter school address..."
      />
    </div>

    {/* Bio */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
      <textarea
        value={formData.bio}
        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Tell us about yourself..."
      />
    </div>

    {/* Save Button */}
    <div className="flex justify-end">
      <button
        onClick={handleSaveProfile}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </button>
    </div>
  </div>
)}
            </div>
          </div>

          {/* Right Column - Stats and Activity */}
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{mockStats.totalPosts}</div>
                  <div className="text-sm text-gray-600">Total Posts</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{mockStats.totalVideos}</div>
                  <div className="text-sm text-gray-600">Total Videos</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{mockStats.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{mockStats.totalLikes}</div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{mockStats.totalComments}</div>
                  <div className="text-sm text-gray-600">Total Comments</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600">{mockStats.totalShares}</div>
                  <div className="text-sm text-gray-600">Total Shares</div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Active:</span>
                  <span className="font-medium text-gray-900">{mockStats.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex space-x-1 mb-6">
                {tabs.map(tab => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {tab.name}
                    </button>
                  )
                })}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Overview</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Account Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Verification Status</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Verified</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Membership Type</span>
                        <span className="font-medium text-gray-900">Premium</span>
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
