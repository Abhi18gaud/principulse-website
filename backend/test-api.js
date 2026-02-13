const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api/v1';

async function testAPI() {
  console.log('Testing Backend API with Aiven PostgreSQL...');
  console.log('Note: Make sure your backend server is running on localhost:3001');
  console.log('The backend will connect to Aiven database automatically using DATABASE_URL');
  
  try {
    // Test register endpoint
    console.log('\n1. Testing POST /auth/register');
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: testEmail,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890',
      schoolName: 'Test School',
      position: 'Principal'
    });
    console.log('✅ Register Success:', registerResponse.status);
    console.log('User ID:', registerResponse.data.data?.user?.id);
    console.log('Email:', registerResponse.data.data?.user?.email);
    
    // Test login endpoint
    console.log('\n2. Testing POST /auth/login');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: testEmail,
      password: 'password123'
    });
    console.log('✅ Login Success:', loginResponse.status);
    console.log('Tokens received:', !!loginResponse.data.data?.tokens);
    console.log('Login response structure:', JSON.stringify(loginResponse.data.data, null, 2));
    
    // Test get profile endpoint with token
    if (loginResponse.data.data?.tokens) {
      console.log('\n3. Testing GET /auth/me');
      const token = loginResponse.data.data.tokens.accessToken;
      console.log('Using token:', token.substring(0, 50) + '...');
      
      const profileResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ Profile Success:', profileResponse.status);
      console.log('User profile:', profileResponse.data.data?.user?.email);
    }
    
    console.log('\n✅ All API tests completed successfully!');
    console.log('✅ Aiven PostgreSQL database is working through backend API');
    
  } catch (error) {
    console.error('\n❌ API Test Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data?.message || error.response.statusText);
      console.error('Data:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Backend server is not running on localhost:3001');
      console.error('🔧 Solution: Start your backend server with: npm run dev');
    } else {
      console.error('Error:', error.message);
    }
  }
}

testAPI();
