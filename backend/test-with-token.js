const axios = require('axios');

async function testWithToken() {
  console.log('Testing /auth/me endpoint with token...');
  
  // Use the token from previous test
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZmE2NGU0OS03ODQzLTRlYzEtYjE3MS04NGJhMmEyOTNhMjgiLCJlbWFpbCI6InRlc3QxNzcxMDA0NTkxMDE1QGV4YW1wbGUuY29tIiwiaWF0IjoxNzcxMDA0NTkyLCJleHAiOjE3NzEwMDU0OTJ9.oW_iwgYeS25M6pJHYRffWo_oZ_Dyf-Ny92o6nEglB9o';
  
  try {
    const response = await axios.get('http://localhost:3001/api/v1/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Response:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testWithToken();
