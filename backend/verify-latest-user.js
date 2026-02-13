const { PrismaClient } = require('@prisma/client');

async function verifyLatestUser() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Verifying the latest user...');
    
    const user = await prisma.users.findFirst({
      orderBy: { created_at: 'desc' }
    });
    
    if (user) {
      console.log('User:', user.email);
      console.log('Current verified status:', user.is_verified);
      
      if (!user.is_verified) {
        await prisma.users.update({
          where: { id: user.id },
          data: { 
            is_verified: true,
            email_verified_at: new Date()
          }
        });
        console.log('✅ User has been marked as verified');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyLatestUser();
