const axios = require('axios');

async function testDirectEndpoint() {
  console.log('Testing health endpoint...');
  
  try {
    // Test the health endpoint
    const response = await axios.get('http://localhost:3001/health');
    console.log('✅ Health endpoint response:', response.status);
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

testDirectEndpoint();
