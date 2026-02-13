const { PrismaClient } = require('@prisma/client');

async function checkUserVerification() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking user verification status...');
    
    // Get the most recent user
    const user = await prisma.users.findFirst({
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
        is_verified: true,
        email_verified_at: true,
        created_at: true
      }
    });
    
    if (user) {
      console.log('Latest user:');
      console.log('  ID:', user.id);
      console.log('  Email:', user.email);
      console.log('  Name:', user.first_name, user.last_name);
      console.log('  Active:', user.is_active);
      console.log('  Verified:', user.is_verified);
      console.log('  Email Verified At:', user.email_verified_at);
      console.log('  Created At:', user.created_at);
      
      if (!user.is_verified) {
        console.log('\n❌ User is not verified - this is why API calls fail!');
        console.log('🔧 Solution: Update user to verified status');
        
        // Update user to verified
        await prisma.users.update({
          where: { id: user.id },
          data: { 
            is_verified: true,
            email_verified_at: new Date()
          }
        });
        
        console.log('✅ User has been marked as verified');
      }
    } else {
      console.log('❌ No users found in database');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserVerification();
