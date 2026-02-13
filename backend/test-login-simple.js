const axios = require('axios');

async function testLogin() {
  console.log('Testing login endpoint...\n');
  
  try {
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: 'john@gmail.com',
      password: '12345678'
    });
    
    console.log('✅ Login Status:', loginResponse.status);
    console.log('✅ Login Response:', JSON.stringify(loginResponse.data, null, 2));
    
    if (loginResponse.data.success && loginResponse.data.data?.tokens) {
      const token = loginResponse.data.data.tokens.accessToken;
      console.log('✅ Token received:', token.substring(0, 20) + '...');
      
      // Test the protected endpoint
      console.log('\nTesting /auth/me endpoint...');
      const profileResponse = await axios.get('http://localhost:3001/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Profile Status:', profileResponse.status);
      console.log('✅ Profile Response:', JSON.stringify(profileResponse.data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testLogin();
