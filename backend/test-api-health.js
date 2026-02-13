const axios = require('axios');

async function testAPI() {
  console.log('Testing API health and login...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3001/api/v1/health');
    console.log('✅ Health:', healthResponse.status, healthResponse.data);
    
    // Test login with john@gmail.com
    console.log('\n2. Testing login with john@gmail.com...');
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: 'john@gmail.com',
      password: '12345678'
    });
    
    console.log('✅ Login Status:', loginResponse.status);
    console.log('✅ Login Data:', loginResponse.data);
    
    if (loginResponse.data.success) {
      console.log('✅ Token received:', !!loginResponse.data.data?.tokens);
      
      // Test protected endpoint
      console.log('\n3. Testing protected endpoint...');
      const token = loginResponse.data.data.tokens.accessToken;
      const profileResponse = await axios.get('http://localhost:3001/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Profile Status:', profileResponse.status);
      console.log('✅ Profile Data:', profileResponse.data);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testAPI();
