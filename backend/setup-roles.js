const { PrismaClient } = require('@prisma/client');

async function setupRoles() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Setting up roles...');
    
    // Check existing roles
    const existingRoles = await prisma.roles.findMany();
    console.log('Existing roles:', existingRoles.map(r => r.name));
    
    // Create default roles if they don't exist
    const defaultRoles = [
      { name: 'admin', description: 'System administrator with full access' },
      { name: 'moderator', description: 'Content moderator with elevated permissions' },
      { name: 'member', description: 'Regular member with standard permissions' }
    ];
    
    for (const roleData of defaultRoles) {
      const existingRole = await prisma.roles.findUnique({
        where: { name: roleData.name }
      });
      
      if (!existingRole) {
        await prisma.roles.create({
          data: roleData
        });
        console.log(`✅ Created role: ${roleData.name}`);
      } else {
        console.log(`✅ Role already exists: ${roleData.name}`);
      }
    }
    
    // Get the latest user
    const latestUser = await prisma.users.findFirst({
      orderBy: { created_at: 'desc' }
    });
    
    if (latestUser) {
      console.log(`Latest user: ${latestUser.email}`);
      
      // Check if user has roles
      const userRoles = await prisma.user_roles.findMany({
        where: { user_id: latestUser.id },
        include: { roles: true }
      });
      
      if (userRoles.length === 0) {
        console.log('Assigning member role to user...');
        
        const memberRole = await prisma.roles.findUnique({
          where: { name: 'member' }
        });
        
        if (memberRole) {
          await prisma.user_roles.create({
            data: {
              user_id: latestUser.id,
              role_id: memberRole.id
            }
          });
          console.log('✅ Member role assigned to user');
        }
      } else {
        console.log('User already has roles:', userRoles.map(ur => ur.roles.name));
      }
    }
    
    console.log('\n✅ Role setup completed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupRoles();
