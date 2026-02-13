const { PrismaClient } = require('@prisma/client');

async function checkAllUsers() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking all users in database...\n');
    
    const allUsers = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
        is_verified: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' }
    });
    
    console.log(`📊 Total users found: ${allUsers.length}\n`);
    
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   Verified: ${user.is_verified}`);
      console.log(`   Created: ${user.created_at}`);
      console.log('---');
    });
    
    // Specifically check for john@email.com
    const johnUser = await prisma.users.findUnique({
      where: { email: 'john@email.com' }
    });
    
    console.log('\n🔍 Specific search for john@email.com:');
    if (johnUser) {
      console.log('✅ FOUND john@email.com in database');
      console.log('   ID:', johnUser.id);
      console.log('   Active:', johnUser.is_active);
    } else {
      console.log('❌ john@email.com NOT found in database');
    }
    
    // Check for similar emails
    const similarUsers = await prisma.users.findMany({
      where: {
        OR: [
          { email: { contains: 'john' } },
          { email: { contains: '@email.com' } }
        ]
      }
    });
    
    console.log('\n🔍 Users with "john" or "@email.com" in email:');
    if (similarUsers.length > 0) {
      similarUsers.forEach(user => {
        console.log(`   - ${user.email}`);
      });
    } else {
      console.log('   None found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllUsers();
