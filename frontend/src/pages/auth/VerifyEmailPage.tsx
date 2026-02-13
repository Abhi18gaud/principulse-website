import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Mail, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import { authService } from '@/services/authService'

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid verification link')
        setIsVerifying(false)
        return
      }

      try {
        await authService.verifyEmail(token)
        setIsSuccess(true)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to verify email. The link may have expired.')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [token])

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verifying Your Email</h1>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Link
                to="/register"
                className="block w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Verified Successfully</h1>
          <p className="text-gray-600 mb-6">
            Your email address has been verified. You can now log in to your account.
          </p>
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </Link>
            <p className="text-sm text-gray-500">
              Thank you for joining Principulse!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
