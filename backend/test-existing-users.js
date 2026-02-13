const axios = require('axios');

async function testExistingUsers() {
  console.log('Testing login with existing users in principulse-website-db...\n');
  
  const existingUsers = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'a@gmail.com', password: 'password123' },
    { email: 'gaudchandramohan708@gmail.com', password: 'password123' },
    { email: '1test@example.com', password: 'password123' },
    { email: '2test@example.com', password: 'password123' }
  ];
  
  for (const user of existingUsers) {
    try {
      console.log(`🔍 Testing: ${user.email}`);
      
      const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
        email: user.email,
        password: user.password
      });
      
      console.log(`✅ Success: ${user.email}`);
      console.log(`   User ID: ${loginResponse.data.data?.user?.id}`);
      console.log(`   Name: ${loginResponse.data.data?.user?.firstName} ${loginResponse.data.data?.user?.lastName}`);
      
    } catch (error) {
      if (error.response) {
        console.log(`❌ Failed: ${user.email} - ${error.response.status} (${error.response.data?.error?.message})`);
      } else {
        console.log(`❌ Error: ${user.email} - ${error.message}`);
      }
    }
    console.log('---');
  }
  
  console.log('\n💡 If none of these work, we need to register a new user or check passwords');
}

testExistingUsers();
