const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

async function createManualVerification() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Creating manual verification helper...');
    
    // Get the most recent unverified user
    const user = await prisma.users.findFirst({
      where: { is_verified: false },
      orderBy: { created_at: 'desc' }
    });
    
    if (user) {
      // Generate verification token
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      console.log('\n📧 MANUAL VERIFICATION NEEDED:');
      console.log('=====================================');
      console.log('User Email:', user.email);
      console.log('User ID:', user.id);
      console.log('Verification Token:', verificationToken);
      console.log('Verification Link:', `http://localhost:3000/auth/verify-email?token=${verificationToken}`);
      console.log('=====================================\n');
      
      console.log('💡 SOLUTION: Implement email sending or manually verify using the link above');
    } else {
      console.log('✅ All users are verified!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createManualVerification();
