import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import {
  Search,
  Filter,
  Plus,
  Eye,
  Star,
  Tag,
  Percent,
  DollarSign,
  ShoppingBag,
  Award,
  Gift,
  BookOpen,
  Laptop,
  GraduationCap
} from 'lucide-react'

interface PerkCategory {
  id: string
  name: string
  slug: string
  description: string
  icon_url?: string
  icon?: any
}

interface Perk {
  id: string
  vendor_id: string
  perk_category_id: string
  title: string
  description: string
  discount_type: string
  discount_value: number
  original_price?: number
  discounted_price?: number
  terms_conditions: string
  redemption_url?: string
  promo_code?: string
  valid_from: string
  valid_until: string
  is_featured: boolean
  is_active: boolean
  view_count: number
  click_count: number
  created_at: string
  vendor: {
    id: string
    first_name: string
    last_name: string
    school_name?: string
  }
  perk_category: {
    name: string
    slug: string
  }
}

export const PrinciPerksPage: React.FC = () => {
  const [perks, setPerks] = useState<Perk[]>([])
  const [categories, setCategories] = useState<PerkCategory[]>([])
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDiscountType, setSelectedDiscountType] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const discountTypes = [
    { id: '', name: 'All Types', icon: Tag },
    { id: 'percentage', name: 'Percentage Off', icon: Percent },
    { id: 'fixed_amount', name: 'Fixed Amount', icon: DollarSign },
    { id: 'buy_one_get_one', name: 'Buy One Get One', icon: Gift }
  ]

  // Mock data - will be replaced with API calls
  const mockCategories: PerkCategory[] = [
    { id: '1', name: 'Educational Resources', slug: 'educational', description: 'Books, software, and learning materials', icon: BookOpen },
    { id: '2', name: 'Technology', slug: 'technology', description: 'Computers, tablets, and tech gadgets', icon: Laptop },
    { id: '3', name: 'Professional Development', slug: 'professional', description: 'Courses, workshops, and certifications', icon: GraduationCap },
    { id: '4', name: 'School Supplies', slug: 'supplies', description: 'Classroom materials and supplies', icon: ShoppingBag },
    { id: '5', name: 'Software', slug: 'software', description: 'Educational software and applications', icon: Award }
  ]

  const mockPerks: Perk[] = [
    {
      id: '1',
      vendor_id: '1',
      perk_category_id: '1',
      title: '50% Off Educational Books',
      description: 'Get 50% off on all educational books from our partner bookstore. Perfect for updating your classroom library or personal professional development.',
      discount_type: 'percentage',
      discount_value: 50,
      original_price: 100,
      discounted_price: 50,
      terms_conditions: 'Valid for in-stock items only. Cannot be combined with other offers.',
      redemption_url: 'https://bookstore.edu/redeem',
      promo_code: 'EDU50OFF',
      valid_from: '2024-01-01',
      valid_until: '2024-12-31',
      is_featured: true,
      is_active: true,
      view_count: 1247,
      click_count: 234,
      created_at: '2024-01-15T10:00:00Z',
      vendor: {
        id: '1',
        first_name: 'Academic',
        last_name: 'Books Inc',
        school_name: 'Partner Vendor'
      },
      perk_category: {
        name: 'Educational Resources',
        slug: 'educational'
      }
    },
    {
      id: '2',
      vendor_id: '2',
      perk_category_id: '2',
      title: 'Tablet Bundle Deal',
      description: 'Special bundle: Buy one tablet, get the second at 50% off. Perfect for classroom technology upgrades or BYOD programs.',
      discount_type: 'buy_one_get_one',
      discount_value: 50,
      original_price: 600,
      discounted_price: 450,
      terms_conditions: 'Buy one tablet at full price, get second tablet at 50% off. Limited stock available.',
      redemption_url: 'https://techstore.edu/tablets',
      promo_code: 'TABLETBUNDLE',
      valid_from: '2024-02-01',
      valid_until: '2024-03-31',
      is_featured: false,
      is_active: true,
      view_count: 892,
      click_count: 156,
      created_at: '2024-01-20T14:30:00Z',
      vendor: {
        id: '2',
        first_name: 'EduTech',
        last_name: 'Solutions',
        school_name: 'Partner Vendor'
      },
      perk_category: {
        name: 'Technology',
        slug: 'technology'
      }
    },
    {
      id: '3',
      vendor_id: '3',
      perk_category_id: '3',
      title: '$100 Off Leadership Certification',
      description: 'Save $100 on our premium educational leadership certification course. Includes 40 hours of online instruction and certification.',
      discount_type: 'fixed_amount',
      discount_value: 100,
      original_price: 500,
      discounted_price: 400,
      terms_conditions: 'Valid for new enrollments only. Must complete course within 6 months.',
      redemption_url: 'https://certification.edu/leadership',
      promo_code: 'LEAD100OFF',
      valid_from: '2024-01-15',
      valid_until: '2024-06-15',
      is_featured: true,
      is_active: true,
      view_count: 567,
      click_count: 89,
      created_at: '2024-01-18T16:45:00Z',
      vendor: {
        id: '3',
        first_name: 'Leadership',
        last_name: 'Institute',
        school_name: 'Partner Vendor'
      },
      perk_category: {
        name: 'Professional Development',
        slug: 'professional'
      }
    },
    {
      id: '4',
      vendor_id: '4',
      perk_category_id: '4',
      title: 'Free Classroom Supplies Package',
      description: 'Receive a free classroom supplies package with any purchase over $50. Includes markers, notebooks, and organizational tools.',
      discount_type: 'fixed_amount',
      discount_value: 25,
      original_price: 50,
      discounted_price: 25,
      terms_conditions: 'Free supplies package included with qualifying purchases. Supplies valued at $25.',
      redemption_url: 'https://supplystore.edu/classroom',
      promo_code: 'FREESUPPLIES',
      valid_from: '2024-01-01',
      valid_until: '2024-12-31',
      is_featured: false,
      is_active: true,
      view_count: 734,
      click_count: 145,
      created_at: '2024-01-12T12:20:00Z',
      vendor: {
        id: '4',
        first_name: 'Classroom',
        last_name: 'Essentials',
        school_name: 'Partner Vendor'
      },
      perk_category: {
        name: 'School Supplies',
        slug: 'supplies'
      }
    }
  ]

  useEffect(() => {
    // TODO: Replace with API calls
    setCategories(mockCategories)
    setPerks(mockPerks)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = perks

    if (searchQuery) {
      filtered = filtered.filter(perk =>
        perk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perk.vendor.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(perk => perk.perk_category_id === selectedCategory)
    }

    if (selectedDiscountType) {
      filtered = filtered.filter(perk => perk.discount_type === selectedDiscountType)
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'ending-soon':
        filtered.sort((a, b) => new Date(a.valid_until).getTime() - new Date(b.valid_until).getTime())
        break
      case 'most-viewed':
        filtered.sort((a, b) => b.view_count - a.view_count)
        break
      case 'discount-amount':
        filtered.sort((a, b) => b.discount_value - a.discount_value)
        break
      case 'featured':
        filtered = filtered.filter(perk => perk.is_featured)
        break
    }

    setFilteredPerks(filtered)
  }, [perks, searchQuery, selectedCategory, selectedDiscountType, sortBy])

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

  const getDiscountText = (perk: Perk) => {
    switch (perk.discount_type) {
      case 'percentage':
        return `${perk.discount_value}% off`
      case 'fixed_amount':
        return `${formatCurrency(perk.discount_value)} off`
      case 'buy_one_get_one':
        return `Buy one, get ${perk.discount_value}% off second`
      default:
        return 'Special offer'
    }
  }

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case 'educational':
        return <BookOpen className="w-5 h-5" />
      case 'technology':
        return <Laptop className="w-5 h-5" />
      case 'professional':
        return <GraduationCap className="w-5 h-5" />
      case 'supplies':
        return <ShoppingBag className="w-5 h-5" />
      case 'software':
        return <Award className="w-5 h-5" />
      default:
        return <Tag className="w-5 h-5" />
    }
  }

  const getDiscountIcon = (discountType: string) => {
    switch (discountType) {
      case 'percentage':
        return <Percent className="w-4 h-4" />
      case 'fixed_amount':
        return <DollarSign className="w-4 h-4" />
      case 'buy_one_get_one':
        return <Gift className="w-4 h-4" />
      default:
        return <Tag className="w-4 h-4" />
    }
  }

  const isExpiringSoon = (validUntil: string) => {
    const endDate = new Date(validUntil)
    const now = new Date()
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysLeft <= 7 && daysLeft > 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Tag className="w-8 h-8 mr-3 text-purple-600" />
                PrinciPerks
              </h1>
              <p className="text-gray-600">Exclusive deals and discounts for educators</p>
            </div>
            {isAuthenticated && (
              <Link
                to="/princi-perks/create"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Perk
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
                  placeholder="Search perks..."
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
                value={selectedDiscountType}
                onChange={(e) => setSelectedDiscountType(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {discountTypes.map(type => (
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
                <option value="newest">Newest</option>
                <option value="ending-soon">Ending Soon</option>
                <option value="most-viewed">Most Viewed</option>
                <option value="discount-amount">Biggest Discount</option>
                <option value="featured">Featured</option>
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
            {/* Categories and Types Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[...categories, ...discountTypes.slice(1)].map((item, index) => {
                const isCategory = index < categories.length
                const isSelected = isCategory
                  ? selectedCategory === item.id
                  : selectedDiscountType === item.id

                return (
                  <button
                    key={`${isCategory ? 'category' : 'type'}-${item.id}`}
                    onClick={() => {
                      if (isCategory) {
                        setSelectedCategory(selectedCategory === item.id ? '' : item.id)
                      } else {
                        setSelectedDiscountType(selectedDiscountType === item.id ? '' : item.id)
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
                        {isCategory ? getCategoryIcon((item as any).slug) : React.createElement((item as any).icon, { className: "w-5 h-5" })}
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
                    <Tag className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Perks</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredPerks.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPerks.reduce((sum, perk) => sum + perk.view_count, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Redemptions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPerks.reduce((sum, perk) => sum + perk.click_count, 0).toLocaleString()}
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
                    <p className="text-sm font-medium text-gray-600">Featured Perks</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPerks.filter(perk => perk.is_featured).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks Grid */}
            {filteredPerks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No perks found</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPerks.map((perk) => (
                  <div
                    key={perk.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {perk.is_featured && (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-medium rounded-t-lg">
                        Featured Perk
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {getDiscountIcon(perk.discount_type)}
                            <span className="ml-1">{getDiscountText(perk)}</span>
                          </span>
                          {isExpiringSoon(perk.valid_until) && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              Expires Soon
                            </span>
                          )}
                        </div>
                      </div>

                      <Link to={`/princi-perks/${perk.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                          {perk.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {perk.description}
                      </p>

                      <div className="flex items-center mb-3">
                        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {getCategoryIcon(perk.perk_category.slug)}
                          <span className="ml-1">{perk.perk_category.name}</span>
                        </span>
                      </div>

                      {perk.original_price && perk.discounted_price && (
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(perk.discounted_price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(perk.original_price)}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            Save {formatCurrency(perk.original_price - perk.discounted_price)}
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500">Valid From</div>
                          <div className="font-medium text-gray-900 text-sm">
                            {formatDate(perk.valid_from)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Valid Until</div>
                          <div className={`font-medium text-sm ${isExpiringSoon(perk.valid_until) ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatDate(perk.valid_until)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {perk.view_count} views
                        </span>
                        <span className="flex items-center">
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          {perk.click_count} redeemed
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/princi-perks/${perk.id}`}
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </div>

                        {perk.redemption_url && (
                          <a
                            href={perk.redemption_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Redeem
                          </a>
                        )}
                      </div>

                      {perk.promo_code && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">Promo Code</div>
                          <div className="font-mono text-sm font-medium text-gray-900 bg-white px-2 py-1 rounded border">
                            {perk.promo_code}
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
