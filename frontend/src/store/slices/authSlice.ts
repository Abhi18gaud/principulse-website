import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@/services/authService'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  schoolName?: string
  position?: string
  isActive: boolean
  isVerified: boolean
  emailVerifiedAt?: string
  createdAt: string
  updatedAt: string
  roles: Array<{
    id: string
    role: {
      id: string
      name: string
      permissions: string[]
    }
  }>
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
    schoolName?: string
    position?: string
  }, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Registration failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Logout failed')
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Token refresh failed')
    }
  }
)

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to get profile')
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwords: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await authService.changePassword(passwords)
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Password change failed')
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false
        // Update user data if needed
        if (action.payload.user) {
          state.user = action.payload.user
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        // On refresh failure, clear auth state
        state.user = null
        state.isAuthenticated = false
      })

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setUser, clearUser } = authSlice.actions
export default authSlice.reducer
