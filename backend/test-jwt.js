const jwt = require('jsonwebtoken');

// Test token from the previous test
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZmE2NGU0OS03ODQzLTRlYzEtYjE3MS04NGJhMmEyOTNhMjgiLCJlbWFpbCI6InRlc3QxNzcxMDA0NTkxMDE1QGV4YW1wbGUuY29tIiwiaWF0IjoxNzcxMDA0NTkyLCJleHAiOjE3NzEwMDU0OTJ9.oW_iwgYeS25M6pJHYRffWo_oZ_Dyf-Ny92o6nEglB9o';

function testJWT() {
  console.log('Testing JWT token validation...');
  
  try {
    // Decode the token (without verification)
    const decoded = jwt.decode(testToken);
    console.log('✅ Token decoded successfully:');
    console.log('User ID:', decoded.userId);
    console.log('Email:', decoded.email);
    console.log('Issued at:', new Date(decoded.iat * 1000));
    console.log('Expires at:', new Date(decoded.exp * 1000));
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      console.log('❌ Token is expired');
    } else {
      console.log('✅ Token is still valid');
    }
    
    // Try to verify with the same secret as backend
    const JWT_SECRET = "development-jwt-secret-key-change-in-production";
    try {
      const verified = jwt.verify(testToken, JWT_SECRET);
      console.log('✅ Token verification successful');
      console.log('Verified payload:', verified);
    } catch (verifyError) {
      console.log('❌ Token verification failed:', verifyError.message);
    }
    
  } catch (error) {
    console.error('❌ Token decode error:', error.message);
  }
}

testJWT();
