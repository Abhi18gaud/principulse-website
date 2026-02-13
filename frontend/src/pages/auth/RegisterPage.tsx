import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/store/slices/authSlice'
import { RootState } from '@/store/index'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building,
  Briefcase,
  Star,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    schoolName: '',
    position: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    setIsLoading(true)

    try {
      // In real app, this would call the API
      // For now, simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Dispatch register action (slice will handle user setting)
      await dispatch(register(formData))

      navigate('/verify-email')
    } catch (err) {
      console.error('Registration failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const benefits = [
    {
      icon: BookOpen,
      title: 'Access Exclusive Content',
      description: 'Get premium resources and expert insights'
    },
    {
      icon: Users,
      title: 'Join Professional Network',
      description: 'Connect with 10,000+ school leaders'
    },
    {
      icon: Award,
      title: 'Earn Certifications',
      description: 'Complete courses and get recognized'
    }
  ]

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return 'text-red-500'
    if (strength <= 3) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak'
    if (strength <= 3) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 p-12 text-white">
          <div className="flex flex-col justify-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-7 h-7 text-yellow-300" />
                </div>
                <h1 className="text-3xl font-bold">Join Principulse</h1>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Start Your Leadership Journey
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Become part of India's most trusted community for school leaders
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-green-100">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="font-semibold">10,000+ Members</p>
                  <p className="text-sm text-green-100">Growing community</p>
                </div>
              </div>
              <p className="text-sm text-green-100">
                Join principals from 500+ schools across India who trust Principulse for their professional development.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Principulse</h1>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Your Account 🚀
                </h2>
                <p className="text-gray-600">
                  Join the community of educational leaders
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                      placeholder="principal@school.edu"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${getPasswordStrengthColor(passwordStrength(formData.password))}`}>
                          {getPasswordStrengthText(passwordStrength(formData.password))}
                        </span>
                        <span className="text-gray-500">{formData.password.length}/8</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            passwordStrength(formData.password) <= 2 ? 'bg-red-500' :
                            passwordStrength(formData.password) <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && formData.confirmPassword && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Passwords match
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      required
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                      placeholder="Delhi Public School"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleChange as any}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
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
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !agreeToTerms}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
