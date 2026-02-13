import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: number
    read: boolean
  }>
  currentPage: string
  searchQuery: string
  loading: {
    global: boolean
    [key: string]: boolean
  }
}

const initialState: UIState = {
  sidebarOpen: false,
  theme: 'system',
  notifications: [],
  currentPage: '',
  searchQuery: '',
  loading: {
    global: false,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp' | 'read'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      }
      state.notifications.unshift(notification)
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50)
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(n => {
        n.read = true
      })
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      state.loading[action.payload.key] = action.payload.loading
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  setCurrentPage,
  setSearchQuery,
  setLoading,
  setGlobalLoading,
} = uiSlice.actions

export default uiSlice.reducer

// Selectors
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen
export const selectTheme = (state: { ui: UIState }) => state.ui.theme
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications
export const selectUnreadNotifications = (state: { ui: UIState }) => 
  state.ui.notifications.filter(n => !n.read)
export const selectCurrentPage = (state: { ui: UIState }) => state.ui.currentPage
export const selectSearchQuery = (state: { ui: UIState }) => state.ui.searchQuery
export const selectLoading = (key: string) => (state: { ui: UIState }) => 
  state.ui.loading[key] || false
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.loading.global
