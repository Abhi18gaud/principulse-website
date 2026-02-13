import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/slices/authSlice'
import { RootState } from '@/store/index'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Star,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In real app, this would call the API
      // For now, simulate login
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Dispatch login action (slice will handle user setting)
      const result = await dispatch(login({ email: formData.email, password: formData.password }))
      if (login.fulfilled.match(result)) {
        navigate('/dashboard')
      } else {
        throw new Error('Login failed')
      }
    } catch (err) {
      console.error('Login failed:', err)
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

  const features = [
    {
      icon: BookOpen,
      title: 'Share Knowledge',
      description: 'Publish insights and best practices',
      color: 'from-blue-400 to-cyan-300'
    },
    {
      icon: Users,
      title: 'Connect & Network',
      description: 'Build relationships with peers',
      color: 'from-purple-400 to-pink-300'
    },
    {
      icon: Award,
      title: 'Earn Recognition',
      description: 'Get rewarded for contributions',
      color: 'from-amber-400 to-orange-300'
    }
  ]

  const floatingElements = [
    { icon: Sparkles, delay: 0, duration: 3 },
    { icon: Zap, delay: 1, duration: 4 },
    { icon: Shield, delay: 2, duration: 3.5 },
    { icon: TrendingUp, delay: 0.5, duration: 4.5 }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-pulse" />
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`
          }}
        />
        
        {/* Floating Elements */}
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon
          return (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                left: `${20 + (index * 25)}%`,
                top: `${10 + (index * 20)}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            >
              <IconComponent className="w-6 h-6 text-purple-400/30 animate-pulse" />
            </div>
          )
        })}
      </div>

      <div className={`relative z-10 flex min-h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 relative backdrop-blur-xl bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-indigo-900/40 border-r border-white/10 p-12 text-white">
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="relative z-10 flex flex-col justify-center max-w-md mx-auto">
            <div className={`mb-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25 animate-pulse">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Principulse
                </h1>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Empowering <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">School Leaders</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join India's premier community for principals and educational leaders
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 transition-all duration-700 hover:translate-x-2 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="group-hover:text-white transition-colors duration-300">
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-blue-100 group-hover:text-blue-200 transition-colors duration-300">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={`mt-12 p-6 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <blockquote className="text-lg italic">
                "Principulse has transformed how I connect with fellow educators and share my experiences."
              </blockquote>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-sm font-medium text-white">SD</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Davis</p>
                  <p className="text-sm text-blue-100">Principal, Mumbai International School</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
          
          <div className={`max-w-md w-full relative z-10 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Principulse</h1>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome Back! 👋
                  </h2>
                  <p className="text-gray-300">
                    Sign in to continue your leadership journey
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg flex items-center space-x-3 animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 transition-colors duration-300 ${isFocused === 'email' ? 'text-blue-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => setIsFocused(null)}
                        className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 text-white placeholder-gray-400 hover:bg-white/15 focus:bg-white/20"
                        placeholder="principal@school.edu"
                      />
                      {isFocused === 'email' && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors duration-300 ${isFocused === 'password' ? 'text-blue-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('password')}
                        onBlur={() => setIsFocused(null)}
                        className="block w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 text-white placeholder-gray-400 hover:bg-white/15 focus:bg-white/20"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                      {isFocused === 'password' && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 bg-white/10 border-white/20 text-blue-600 focus:ring-blue-500/50 rounded focus:ring-2"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>

                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-300">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                    >
                      Join Principulse
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
