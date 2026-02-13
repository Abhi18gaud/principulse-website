const { PrismaClient } = require('@prisma/client');

async function checkDatabaseConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking database connection...\n');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Get database info
    const result = await prisma.$queryRaw`SELECT current_database() as database_name`;
    console.log('📊 Database name:', result[0]?.database_name);
    
    // Get connection info
    const connectionInfo = await prisma.$queryRaw`
      SELECT 
        inet_server_addr() as server_address,
        inet_server_port() as server_port,
        current_user as current_user
    `;
    console.log('🌐 Server address:', connectionInfo[0]?.server_address);
    console.log('🔌 Server port:', connectionInfo[0]?.server_port);
    console.log('👤 Current user:', connectionInfo[0]?.current_user);
    
    // Count users
    const userCount = await prisma.users.count();
    console.log('👥 Total users in this database:', userCount);
    
    // Get recent users
    const recentUsers = await prisma.users.findMany({
      select: {
        email: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' },
      take: 5
    });
    
    console.log('\n📋 Recent users:');
    recentUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.created_at})`);
    });
    
    // Check if specific user exists
    const johnUser = await prisma.users.findUnique({
      where: { email: 'john@gmail.com' }
    });
    
    console.log('\n🔍 john@gmail.com exists:', !!johnUser);
    if (johnUser) {
      console.log('   ID:', johnUser.id);
      console.log('   Created:', johnUser.created_at);
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseConnection();
