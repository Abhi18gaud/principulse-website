import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user
    if (token) {
      headers.set('authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    }
    return headers
  },
})

// Base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'PrinciPost',
    'PrinciVoice',
    'PrinciMoment',
    'PrinciTalk',
    'Principassion',
    'PrinciFlash',
    'PrinciCare',
    'PrinciFest',
    'PrinciTorch',
    'PrinciQuest',
    'PrinciEdge',
    'PrinciCatalyst',
    'PrinciCircle',
    'PrinciServe',
    'PrinciPerk',
    'PrinciAward',
    'PrinciSchool',
    'PrinciPathway',
    'PrinciHub',
    'Notification',
    'Analytics',
  ],
  endpoints: () => ({}),
})
