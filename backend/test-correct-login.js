const axios = require('axios');

async function testCorrectLogin() {
  console.log('Testing login with CORRECT email: john@gmail.com...');
  
  try {
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: 'john@gmail.com',
      password: '12345678'
    });
    
    console.log('✅ Login successful!');
    console.log('Status:', loginResponse.status);
    console.log('User:', loginResponse.data.data?.user?.email);
    console.log('Name:', `${loginResponse.data.data?.user?.firstName} ${loginResponse.data.data?.user?.lastName}`);
    
  } catch (error) {
    if (error.response) {
      console.log('❌ Login failed:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        console.log('\n💡 This means the password might be wrong too.');
        console.log('Let me check what password was actually set for this user...');
        
        // Check if we can find the actual password
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        
        const user = await prisma.users.findUnique({
          where: { email: 'john@gmail.com' },
          select: { email: true, password_hash: true }
        });
        
        if (user) {
          console.log('User found in database:', user.email);
          console.log('Password hash exists:', !!user.password_hash);
          console.log('The password hash starts with:', user.password_hash.substring(0, 10) + '...');
        }
        
        await prisma.$disconnect();
      }
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

testCorrectLogin();
