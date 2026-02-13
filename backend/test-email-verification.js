const axios = require('axios');

async function testEmailVerification() {
  console.log('Testing email verification flow...');
  
  try {
    // Step 1: Register a new user
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    
    console.log('\n1. Registering new user...');
    const registerResponse = await axios.post('http://localhost:3001/api/v1/auth/register', {
      email: testEmail,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890',
      schoolName: 'Test School',
      position: 'Principal'
    });
    
    console.log('✅ Registration successful:', registerResponse.status);
    
    // Step 2: Check if verification token was generated (from logs)
    console.log('\n2. Note: Check backend logs for verification token...');
    console.log('   The token should be logged in the backend console');
    
    // Step 3: Try to verify with a sample token (this will fail, but shows the process)
    console.log('\n3. Testing verification endpoint with sample token...');
    try {
      const verifyResponse = await axios.get('http://localhost:3001/api/v1/auth/verify-email?token=sample123');
      console.log('Verification response:', verifyResponse.status, verifyResponse.data);
    } catch (error) {
      console.log('Expected error with invalid token:', error.response?.status, error.response?.data);
    }
    
    // Step 4: Check if user exists in database
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const user = await prisma.users.findUnique({
      where: { email: testEmail }
    });
    
    if (user) {
      console.log('\n4. User found in database:');
      console.log('   Email:', user.email);
      console.log('   Verified:', user.is_verified);
      console.log('   Email Verified At:', user.email_verified_at);
    } else {
      console.log('\n4. User NOT found in database');
    }
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testEmailVerification();
