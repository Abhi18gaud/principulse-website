const { PrismaClient } = require('@prisma/client');

async function testPrismaConnection() {
  console.log('Testing Prisma connection to Aiven PostgreSQL...');
  
  let prisma;
  
  try {
    console.log('\n1. Initializing Prisma Client...');
    prisma = new PrismaClient();
    console.log('✅ Prisma Client initialized');
    
    console.log('\n2. Testing database connection...');
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Connected to database successfully!');
    
    console.log('\n3. Testing database query...');
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as version`;
    console.log('✅ Query successful!');
    console.log('Current time:', result[0].current_time);
    console.log('PostgreSQL version:', result[0].version.split(' ')[1]);
    
    console.log('\n4. Checking if users table exists...');
    try {
      const userCount = await prisma.users.count();
      console.log(`✅ Users table exists with ${userCount} records`);
      
      if (userCount > 0) {
        console.log('\n5. Sample user data:');
        const sampleUsers = await prisma.users.findMany({
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            created_at: true
          },
          take: 3
        });
        sampleUsers.forEach((user, index) => {
          console.log(`  ${index + 1}. ${user.first_name} ${user.last_name} (${user.email}) - Created: ${user.created_at}`);
        });
      }
      
    } catch (error) {
      if (error.code === 'P2021') {
        console.log('❌ Users table does not exist');
        console.log('You may need to run: npm run db:migrate');
      } else {
        throw error;
      }
    }
    
    console.log('\n6. Testing write operation...');
    // Test a simple write operation (you can remove this if you don't want test data)
    const testResult = await prisma.$queryRaw`SELECT 1 as test_value`;
    console.log('✅ Write operation successful!');
    
    console.log('\n✅ All database tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Database connection error:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.meta || 'No additional details');
    
    if (error.code === 'P1001') {
      console.error('\n🔧 Possible solutions:');
      console.error('1. Check if Aiven database is running');
      console.error('2. Verify DATABASE_URL in .env file');
      console.error('3. Check network connectivity');
      console.error('4. Verify SSL certificate');
    } else if (error.code === 'P1002') {
      console.error('\n🔧 Possible solutions:');
      console.error('1. Database connection timeout');
      console.error('2. Check network latency');
      console.error('3. Verify database server status');
    } else if (error.code === 'P2021') {
      console.error('\n🔧 Possible solutions:');
      console.error('1. Run: npm run db:migrate');
      console.error('2. Run: npm run db:generate');
      console.error('3. Check Prisma schema');
    }
    
  } finally {
    if (prisma) {
      await prisma.$disconnect();
      console.log('\n📝 Disconnected from database');
    }
  }
}

testPrismaConnection();
