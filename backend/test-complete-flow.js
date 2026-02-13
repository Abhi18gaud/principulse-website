const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api/v1';

async function testCompleteFlow() {
  console.log('Testing Complete API Flow with Aiven PostgreSQL...');
  
  try {
    // Step 1: Register a user
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
    
    // Step 2: Verify the user in database
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.users.update({
      where: { id: registerResponse.data.data.user.id },
      data: { 
        is_verified: true,
        email_verified_at: new Date()
      }
    });
    console.log('✅ User verified in database');
    await prisma.$disconnect();
    
    // Step 3: Login
    console.log('\n2. Testing POST /auth/login');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: testEmail,
      password: 'password123'
    });
    console.log('✅ Login Success:', loginResponse.status);
    console.log('Tokens received:', !!loginResponse.data.data?.tokens);
    
    // Step 4: Test protected endpoint
    if (loginResponse.data.data?.tokens) {
      console.log('\n3. Testing GET /auth/me');
      const token = loginResponse.data.data.tokens.accessToken;
      
      const profileResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ Profile Success:', profileResponse.status);
      console.log('User profile:', profileResponse.data.data?.email);
    }
    
    console.log('\n✅ All API tests completed successfully!');
    console.log('✅ Aiven PostgreSQL database is working perfectly with authentication!');
    
  } catch (error) {
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Message:', error.response.data?.message || error.response.statusText);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testCompleteFlow();
