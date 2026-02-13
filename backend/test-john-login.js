const axios = require('axios');

async function testSpecificLogin() {
  console.log('Testing login with john@email.com...');
  
  try {
    // Test login with john@email.com
    const loginResponse = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: 'john@email.com',
      password: '12345678'
    });
    
    console.log('✅ Login successful!');
    console.log('Status:', loginResponse.status);
    console.log('User data:', loginResponse.data.data?.user?.email);
    console.log('User ID:', loginResponse.data.data?.user?.id);
    
    // Now check if this user actually exists in database
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const user = await prisma.users.findUnique({
      where: { email: 'john@email.com' }
    });
    
    if (user) {
      console.log('\n🔍 User found in database:');
      console.log('Email:', user.email);
      console.log('ID:', user.id);
      console.log('Created:', user.created_at);
    } else {
      console.log('\n❌ User NOT found in database!');
      console.log('This is very strange - login succeeded but user not in DB');
    }
    
    // List all users in database
    const allUsers = await prisma.users.findMany({
      select: {
        email: true,
        created_at: true
      }
    });
    
    console.log('\n📋 All users in database:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.created_at})`);
    });
    
    await prisma.$disconnect();
    
  } catch (error) {
    if (error.response) {
      console.log('❌ Login failed:', error.response.status, error.response.data);
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

testSpecificLogin();
