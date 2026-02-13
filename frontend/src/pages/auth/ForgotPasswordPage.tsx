import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react'

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // In real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful submission
      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Check Your Email 📧
            </h2>

            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>.
              Click the link in the email to reset your password.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Didn't receive the email?</strong> Check your spam folder or try again in a few minutes.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Back to Sign In
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Try a different email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-12 text-white">
          <div className="flex flex-col justify-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-yellow-300" />
                </div>
                <h1 className="text-3xl font-bold">Reset Password</h1>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Get Back to Your Account
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                We'll send you a secure link to reset your password
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">What happens next?</h3>
                <div className="space-y-3 text-sm text-purple-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <p>Enter your email address associated with your Principulse account</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <p>Check your email for a secure password reset link</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <p>Follow the link to create a new password</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Security First</h3>
                <p className="text-sm text-purple-100">
                  Your account security is our top priority. The reset link will expire in 1 hour and can only be used once.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Principulse</h1>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Forgot Your Password? 🔐
                </h2>
                <p className="text-gray-600">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                      placeholder="principal@school.edu"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    We'll send a reset link to this email address
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Need help?</h3>
                <p className="text-sm text-gray-600">
                  If you're having trouble accessing your account, contact our support team at{' '}
                  <a href="mailto:support@principulse.com" className="text-blue-600 hover:text-blue-800">
                    support@principulse.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
