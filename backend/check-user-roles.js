const { PrismaClient } = require('@prisma/client');

async function checkUserRoles() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking user roles...');
    
    // Get the most recent user with roles
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
      console.log('User roles count:', user.user_roles.length);
      
      if (user.user_roles.length === 0) {
        console.log('❌ User has no roles assigned!');
        console.log('🔧 Solution: Assign a default role to the user');
        
        // Check if 'member' role exists
        const memberRole = await prisma.roles.findUnique({
          where: { name: 'member' }
        });
        
        if (memberRole) {
          // Assign member role to user
          await prisma.user_roles.create({
            data: {
              user_id: user.id,
              role_id: memberRole.id
            }
          });
          console.log('✅ Member role assigned to user');
        } else {
          console.log('❌ Member role not found in database');
        }
      } else {
        console.log('User roles:');
        user.user_roles.forEach(userRole => {
          console.log(`  - ${userRole.roles.name}`);
        });
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserRoles();
