const { PrismaClient } = require('@prisma/client');

async function checkNewUser() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking the most recent user...');
    
    const user = await prisma.users.findFirst({
      orderBy: { created_at: 'desc' },
      include: {
        user_roles: {
          include: {
            roles: true
          }
        }
      }
    });
    
    if (user) {
      console.log('User:', user.email);
      console.log('Active:', user.is_active);
      console.log('Verified:', user.is_verified);
      console.log('Roles count:', user.user_roles.length);
      
      if (user.user_roles.length === 0) {
        console.log('❌ New user has no roles - assigning member role...');
        
        const memberRole = await prisma.roles.findUnique({
          where: { name: 'member' }
        });
        
        if (memberRole) {
          await prisma.user_roles.create({
            data: {
              user_id: user.id,
              role_id: memberRole.id
            }
          });
          console.log('✅ Member role assigned');
        }
      }
      
      if (!user.is_verified) {
        console.log('❌ New user is not verified - marking as verified...');
        await prisma.users.update({
          where: { id: user.id },
          data: { 
            is_verified: true,
            email_verified_at: new Date()
          }
        });
        console.log('✅ User marked as verified');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNewUser();
