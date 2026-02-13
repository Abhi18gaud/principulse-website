const axios = require('axios');

async function testAuthEndpoint() {
  console.log('Testing /auth/me endpoint without token...');
  
  try {
    const response = await axios.get('http://localhost:3001/api/v1/auth/me');
    console.log('✅ Response:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testAuthEndpoint();
