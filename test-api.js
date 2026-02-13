const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api/v1';

async function testAPI() {
  console.log('Testing Backend API...');
  
  try {
    // Test register endpoint
    console.log('\n1. Testing POST /auth/register');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    console.log('✅ Register Success:', registerResponse.status);
    
    // Test login endpoint
    console.log('\n2. Testing POST /auth/login');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login Success:', loginResponse.status);
    console.log('Tokens received:', !!loginResponse.data.data?.tokens);
    
  } catch (error) {
    console.error('❌ API Test Error:', error.response?.data || error.message);
  }
}

testAPI();
