const axios = require('axios');

async function testWithDebug() {
  console.log('Testing with debug logging...');
  
  try {
    // Get a fresh token
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: 'test1771004591015@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.data.tokens.accessToken;
    console.log('Got token:', token.substring(0, 50) + '...');
    
    // Test with detailed headers
    console.log('Testing /auth/me with detailed headers...');
    
    const response = await axios.get('http://localhost:3001/api/v1/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      // Add timeout to see if it's hanging
      timeout: 5000
    });
    
    console.log('✅ Success:', response.status);
    console.log('Data:', response.data);
    
  } catch (error) {
    console.log('❌ Error details:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Status Text:', error.response.statusText);
      console.log('Headers:', error.response.headers);
      console.log('Data:', error.response.data);
    } else if (error.code === 'ECONNABORTED') {
      console.log('Request timed out - middleware might be hanging');
    } else {
      console.log('Error:', error.message);
      console.log('Code:', error.code);
    }
  }
}

testWithDebug();
