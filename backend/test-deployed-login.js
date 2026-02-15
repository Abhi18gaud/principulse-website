const axios = require('axios');

async function testLogin() {
  console.log('🔍 Testing login with deployed backend...\n');
  
  const API_BASE = 'https://principulse-website.onrender.com/api/v1';
  
  try {
    // Test login with known user
    console.log('1️⃣ Testing login with john@gmail.com...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'john@gmail.com',
      password: '12345678'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Login successful!');
      console.log('   User:', loginResponse.data.data?.user?.email);
      console.log('   Token received:', !!loginResponse.data.data?.tokens?.accessToken);
      
      // Test protected endpoint
      console.log('\n2️⃣ Testing protected endpoint...');
      const profileResponse = await axios.get(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.data.tokens.accessToken}`
        }
      });
      
      if (profileResponse.data.success) {
        console.log('✅ Protected endpoint working!');
        console.log('   Profile data:', profileResponse.data.data?.email);
      } else {
        console.log('❌ Protected endpoint failed');
      }
    } else {
      console.log('❌ Login failed');
      console.log('   Error:', loginResponse.data.error?.message);
    }
    
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Error:', error.response.data?.error?.message);
    }
  }
}

testLogin();
