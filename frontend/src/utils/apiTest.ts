import { api } from '@/services'

export interface ApiTestResult {
  endpoint: string
  status: 'success' | 'error'
  responseTime: number
  error?: string
}

export const testApiConnectivity = async (): Promise<ApiTestResult[]> => {
  const tests: ApiTestResult[] = []

  const testEndpoint = async (endpoint: string, description: string): Promise<void> => {
    const startTime = Date.now()
    try {
      const response = await api.get(endpoint)
      const responseTime = Date.now() - startTime
      tests.push({
        endpoint: description,
        status: 'success',
        responseTime
      })
    } catch (error: any) {
      const responseTime = Date.now() - startTime
      tests.push({
        endpoint: description,
        status: 'error',
        responseTime,
        error: error.response?.data?.message || error.message || 'Unknown error'
      })
    }
  }

  // Test basic connectivity
  await testEndpoint('/health', 'Health Check')
  
  // Test authentication endpoints
  await testEndpoint('/auth/me', 'Get Current User')
  
  // Test content endpoints
  await testEndpoint('/princi-posts?limit=1', 'Get Posts')
  await testEndpoint('/princi-voice?limit=1', 'Get Videos')
  
  // Test admin endpoints (may fail due to auth)
  await testEndpoint('/admin/analytics', 'Admin Analytics')
  
  return tests
}

export const testDatabaseOperations = async (): Promise<{
  read: ApiTestResult[]
  write: ApiTestResult[]
}> => {
  const readTests: ApiTestResult[] = []
  const writeTests: ApiTestResult[] = []

  // Test Read Operations
  const testRead = async (endpoint: string, description: string) => {
    const startTime = Date.now()
    try {
      const response = await api.get(endpoint)
      const responseTime = Date.now() - startTime
      readTests.push({
        endpoint: description,
        status: 'success',
        responseTime
      })
    } catch (error: any) {
      const responseTime = Date.now() - startTime
      readTests.push({
        endpoint: description,
        status: 'error',
        responseTime,
        error: error.response?.data?.message || error.message || 'Unknown error'
      })
    }
  }

  // Test Write Operations (these will likely fail without proper auth/data)
  const testWrite = async (endpoint: string, description: string, data: any) => {
    const startTime = Date.now()
    try {
      const response = await api.post(endpoint, data)
      const responseTime = Date.now() - startTime
      writeTests.push({
        endpoint: description,
        status: 'success',
        responseTime
      })
    } catch (error: any) {
      const responseTime = Date.now() - startTime
      writeTests.push({
        endpoint: description,
        status: 'error',
        responseTime,
        error: error.response?.data?.message || error.message || 'Unknown error'
      })
    }
  }

  // Read Tests
  await testRead('/categories', 'Get Categories')
  await testRead('/tags', 'Get Tags')
  await testRead('/users/profile', 'Get User Profile')
  await testRead('/notifications/count', 'Get Notifications Count')

  // Write Tests (these may fail due to validation/auth)
  await testWrite('/princi-posts', 'Create Post', {
    title: 'Test Post',
    content: 'Test content',
    categoryIds: [],
    tagIds: [],
    status: 'draft'
  })

  await testWrite('/analytics/events', 'Track Analytics Event', {
    eventType: 'test',
    resourceType: 'test',
    metadata: { test: true }
  })

  return { read: readTests, write: writeTests }
}

export const runFullApiTest = async () => {
  console.log('🧪 Starting API Connectivity Tests...')
  
  const connectivityResults = await testApiConnectivity()
  console.log('📡 Connectivity Tests:', connectivityResults)
  
  const dbResults = await testDatabaseOperations()
  console.log('📊 Database Read Tests:', dbResults.read)
  console.log('✍️ Database Write Tests:', dbResults.write)
  
  const summary = {
    connectivity: {
      total: connectivityResults.length,
      success: connectivityResults.filter(r => r.status === 'success').length,
      failed: connectivityResults.filter(r => r.status === 'error').length
    },
    database: {
      read: {
        total: dbResults.read.length,
        success: dbResults.read.filter(r => r.status === 'success').length,
        failed: dbResults.read.filter(r => r.status === 'error').length
      },
      write: {
        total: dbResults.write.length,
        success: dbResults.write.filter(r => r.status === 'success').length,
        failed: dbResults.write.filter(r => r.status === 'error').length
      }
    }
  }
  
  console.log('📋 Test Summary:', summary)
  return { connectivityResults, dbResults, summary }
}

// Browser console test function
declare global {
  interface Window {
    testPrincipulseAPI: () => void
  }
}

window.testPrincipulseAPI = runFullApiTest

export default runFullApiTest
