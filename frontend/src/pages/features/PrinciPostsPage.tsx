import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { princiPostsService, Post, Category, Tag } from '@/services'
import { Calendar, Eye, Heart, MessageCircle, Search, Filter, Plus, Edit, Trash2, Star, TrendingUp } from 'lucide-react'

export const PrinciPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Load categories and tags
        const [categoriesData, tagsData] = await Promise.all([
          princiPostsService.getCategories(),
          princiPostsService.getTags()
        ])
        
        setCategories([{ id: '', name: 'All Categories', slug: '', color: '#6B7280', sortOrder: 0, isActive: true, createdAt: '' }, ...categoriesData])
        setTags([{ id: '', name: 'All Tags', slug: '', color: '#6B7280', usageCount: 0, createdAt: '' }, ...tagsData])
        
        // Load posts
        const queryParams: any = {
          limit: 50
        }
        
        if (searchQuery) queryParams.search = searchQuery
        if (selectedCategory) queryParams.category = selectedCategory
        if (selectedTag) queryParams.tag = selectedTag
        if (sortBy === 'popular') queryParams.sortBy = 'popular'
        if (sortBy === 'trending') queryParams.sortBy = 'trending'
        if (sortBy === 'featured') queryParams.featured = true

        const response = await princiPostsService.getPosts(queryParams)
        setPosts(response.posts)
        setFilteredPosts(response.posts)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchQuery, selectedCategory, selectedTag, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = async (postId: string) => {
    if (!isAuthenticated) {
      // Redirect to login
      return
    }
    try {
      await princiPostsService.likePost(postId)
      // Update local state optimistically
      setFilteredPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likeCount: post.likeCount + 1 }
          : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleBookmark = (postId: string) => {
    if (!isAuthenticated) {
      return
    }
    // API call to bookmark post - implement when bookmark service is available
    console.log('Bookmarking post:', postId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PrinciPosts</h1>
              <p className="text-gray-600">Insights and experiences from school leaders</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-posts/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Write Post
              </Link>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
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

            {/* Tag Filter */}
            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {tags.map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Viewed</option>
                <option value="liked">Most Liked</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                </div>
              </button>
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
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredPosts.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPosts.reduce((sum, post) => sum + post.viewCount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPosts.reduce((sum, post) => sum + post.likeCount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Comments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPosts.reduce((sum, post) => sum + post.commentCount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid/List */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No posts found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {viewMode === 'grid' ? (
                      /* Grid View */
                      <div>
                        {post.isFeatured && (
                          <div className="flex items-center justify-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-t-lg">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </div>
                        )}
                        
                        <Link to={`/princi-posts/${post.slug}`}>
                          {post.featuredImageUrl && (
                            <img
                              src={post.featuredImageUrl}
                              alt={post.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          )}
                          <div className="p-6">
                            <div className="flex items-center mb-3">
                              <img
                                src={post.author?.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.firstName + ' ' + post.author?.lastName || 'Unknown')}&background=random`}
                                alt={post.author?.firstName + ' ' + post.author?.lastName || 'Unknown'}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {post.author?.firstName} {post.author?.lastName}
                                </p>
                                <p className="text-xs text-gray-500">School Administrator</p>
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.categories?.map((category) => (
                                <span
                                  key={category.id}
                                  className="px-2 py-1 text-xs font-medium rounded-full"
                                  style={{ backgroundColor: category.color + '20', color: category.color }}
                                >
                                  {category.name}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {post.viewCount}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="w-4 h-4 mr-1" />
                                  {post.likeCount}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {post.commentCount}
                                </span>
                              </div>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(post.publishedAt || post.createdAt)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      /* List View */
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {post.featuredImageUrl && (
                            <img
                              src={post.featuredImageUrl}
                              alt={post.title}
                              className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <img
                                src={post.author?.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.firstName + ' ' + post.author?.lastName || 'Unknown')}&background=random`}
                                alt={post.author?.firstName + ' ' + post.author?.lastName || 'Unknown'}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {post.author?.firstName} {post.author?.lastName}
                                </p>
                                <p className="text-xs text-gray-500">School Administrator</p>
                              </div>
                            </div>

                            <Link to={`/princi-posts/${post.slug}`}>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                                {post.title}
                              </h3>
                            </Link>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {post.viewCount}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="w-4 h-4 mr-1" />
                                  {post.likeCount}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {post.commentCount}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatDate(post.publishedAt || post.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            Like
                          </button>
                          <button
                            onClick={() => handleBookmark(post.id)}
                            className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Save
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
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
