const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

async function debugAuth() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Debugging authentication process...');
    
    // Test token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZmE2NGU0OS03ODQzLTRlYzEtYjE3MS04NGJhMmEyOTNhMjgiLCJlbWFpbCI6InRlc3QxNzcxMDA0NTkxMDE1QGV4YW1wbGUuY29tIiwiaWF0IjoxNzcxMDA0NTkyLCJleHAiOjE3NzEwMDU0OTJ9.oW_iwgYeS25M6pJHYRffWo_oZ_Dyf-Ny92o6nEglB9o';
    
    // Step 1: Verify token
    console.log('\n1. Verifying JWT token...');
    const JWT_SECRET = "development-jwt-secret-key-change-in-production";
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token verified');
    console.log('User ID:', decoded.userId);
    
    // Step 2: Check user in database
    console.log('\n2. Checking user in database...');
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
        is_verified: true,
        email_verified_at: true,
        created_at: true,
        updated_at: true
      }
    });
    
    if (!user) {
      console.log('❌ User not found in database');
      return;
    }
    
    console.log('✅ User found');
    console.log('Email:', user.email);
    console.log('Active:', user.is_active);
    console.log('Verified:', user.is_verified);
    
    // Step 3: Check user roles
    console.log('\n3. Checking user roles...');
    const userRoles = await prisma.user_roles.findMany({
      where: { user_id: user.id },
      include: { roles: true }
    });
    
    console.log('User roles count:', userRoles.length);
    userRoles.forEach(userRole => {
      console.log(`  - ${userRole.roles.name}`);
    });
    
    // Step 4: Simulate middleware query
    console.log('\n4. Testing middleware query...');
    const middlewareUser = await prisma.users.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        school_name: true,
        position: true,
        is_active: true,
        is_verified: true,
        email_verified_at: true,
        created_at: true,
        updated_at: true,
        user_roles: {
          include: {
            roles: true
          }
        }
      }
    });
    
    if (!middlewareUser) {
      console.log('❌ Middleware query failed - user not found');
    } else {
      console.log('✅ Middleware query successful');
      console.log('User has roles:', middlewareUser.user_roles.length > 0);
      console.log('User is active:', middlewareUser.is_active);
      console.log('User is verified:', middlewareUser.is_verified);
      
      if (!middlewareUser.is_active) {
        console.log('❌ User is inactive');
      }
      if (!middlewareUser.is_verified) {
        console.log('❌ User is not verified');
      }
      if (middlewareUser.user_roles.length === 0) {
        console.log('❌ User has no roles');
      }
      
      if (middlewareUser.is_active && middlewareUser.is_verified && middlewareUser.user_roles.length > 0) {
        console.log('✅ User should pass authentication!');
      }
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

debugAuth();
