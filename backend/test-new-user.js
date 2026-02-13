const axios = require('axios');

async function testAuthRoute() {
  console.log('Testing auth route without middleware...');
  
  try {
    // Test the register endpoint which should work without auth
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    
    const response = await axios.post('http://localhost:3001/api/v1/auth/register', {
      email: testEmail,
      password: 'password123',
      firstName: 'Debug',
      lastName: 'User',
      phone: '+1234567890',
      schoolName: 'Debug School',
      position: 'Principal'
    });
    
    console.log('✅ Register Success:', response.status);
    console.log('User ID:', response.data.data?.user?.id);
    
    // Now test login with this new user
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: testEmail,
      password: 'password123'
    });
    
    console.log('✅ Login Success:', loginResponse.status);
    console.log('Got tokens:', !!loginResponse.data.data?.tokens);
    
    if (loginResponse.data.data?.tokens) {
      const token = loginResponse.data.data.tokens.accessToken;
      console.log('Testing /auth/me with fresh user token...');
      
      const profileResponse = await axios.get('http://localhost:3001/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Profile Success:', profileResponse.status);
      console.log('Profile data:', profileResponse.data.data?.user?.email);
    }
    
  } catch (error) {
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testAuthRoute();
