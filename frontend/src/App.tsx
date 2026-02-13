import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'sonner'

import { RootState } from './store/index'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Layout } from './components/layout/Layout'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

// Auth pages
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage'

// Dashboard and main pages
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { HomePage } from './pages/HomePage'

// Feature pages
import { PrinciPostsPage } from './pages/features/PrinciPostsPage'
import { PrinciVoicePage } from './pages/features/PrinciVoicePage'
import { PrinciMomentsPage } from './pages/features/PrinciMomentsPage'
import { PrinciTalksPage } from './pages/features/PrinciTalksPage'
import { PrinciPassionsPage } from './pages/features/PrincipassionsPage'
import { PrinciFlashPage } from './pages/features/PrinciFlashPage'
import { PrinciCarePage } from './pages/features/PrinciCarePage'
import { PrinciFestPage } from './pages/features/PrinciFestPage'
import { PrinciTorchPage } from './pages/features/PrinciTorchPage'
import { PrinciQuestPage } from './pages/features/PrinciQuestPage'
import { PrinciEdgePage } from './pages/features/PrinciEdgePage'
import { PrinciCatalystPage } from './pages/features/PrinciCatalystPage'
import { PrinciCirclePage } from './pages/features/PrinciCirclePage'
import { PrinciServePage } from './pages/features/PrinciServePage'
import { PrinciPerksPage } from './pages/features/PrinciPerksPage'
import { PrinciAwardsPage } from './pages/features/PrinciAwardsPage'
import { PrinciSchoolPage } from './pages/features/PrinciSchoolPage'
import { PrinciPathwayPage } from './pages/features/PrinciPathwayPage'
import { PrinciHubsPage } from './pages/features/PrinciHubsPage'

// Admin pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminUsersPage } from './pages/admin/AdminUsersPage'
import { AdminContentPage } from './pages/admin/AdminContentPage'
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage'

// Error pages
import { NotFoundPage } from './pages/error/NotFoundPage'
import { ServerErrorPage } from './pages/error/ServerErrorPage'

function App() {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pages" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* Feature routes */}
          <Route path="princi-posts" element={<PrinciPostsPage />} />
          <Route path="princi-posts/create" element={<div>Create Post Page - Coming Soon</div>} />
          <Route path="princi-voice" element={<PrinciVoicePage />} />
          <Route path="princi-voice/create" element={<div>Create Video Page - Coming Soon</div>} />
          <Route path="princi-moments" element={<PrinciMomentsPage />} />
          <Route path="princi-moments/create" element={<div>Create Moment Page - Coming Soon</div>} />
          <Route path="princi-talks" element={<PrinciTalksPage />} />
          <Route path="principassions" element={<PrinciPassionsPage />} />
          <Route path="princi-flash" element={<PrinciFlashPage />} />
          <Route path="princi-care" element={<PrinciCarePage />} />
          <Route path="princi-fest" element={<PrinciFestPage />} />
          <Route path="princi-torch" element={<PrinciTorchPage />} />
          <Route path="princi-quest" element={<PrinciQuestPage />} />
          <Route path="princi-edge" element={<PrinciEdgePage />} />
          <Route path="princi-catalyst" element={<PrinciCatalystPage />} />
          <Route path="princi-circle" element={<PrinciCirclePage />} />
          <Route path="princi-serve" element={<PrinciServePage />} />
          <Route path="princi-perks" element={<PrinciPerksPage />} />
          <Route path="princi-awards" element={<PrinciAwardsPage />} />
          <Route path="princi-school" element={<PrinciSchoolPage />} />
          <Route path="princi-pathway" element={<PrinciPathwayPage />} />
          <Route path="princi-hubs" element={<PrinciHubsPage />} />

          {/* Additional routes referenced in dashboard */}
          <Route path="activity" element={<div>Activity Page - Coming Soon</div>} />
          <Route path="events" element={<div>Events Page - Coming Soon</div>} />

          {/* Admin routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/users"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/content"
            element={
              <ProtectedRoute requiredRoles={['admin', 'moderator']}>
                <AdminContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/analytics"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminAnalyticsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Error routes */}
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={4000}
      />
    </>
  )
}

export default App
