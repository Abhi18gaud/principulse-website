const axios = require('axios');

async function testFreshLogin() {
  console.log('Testing fresh login with verified user...');
  
  try {
    // Login with verified user
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: 'test1771004591015@example.com',
      password: 'password123'
    });
    
    console.log('✅ Login Success:', loginResponse.status);
    console.log('Tokens received:', !!loginResponse.data.data?.tokens);
    
    if (loginResponse.data.data?.tokens) {
      const token = loginResponse.data.data.tokens.accessToken;
      console.log('Testing /auth/me with fresh token...');
      
      const profileResponse = await axios.get('http://localhost:3001/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Profile Success:', profileResponse.status);
      console.log('User data:', JSON.stringify(profileResponse.data.data, null, 2));
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

testFreshLogin();
