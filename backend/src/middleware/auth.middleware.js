const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { RedisService } = require('../config/redis');
const { logger } = require('../utils/logger');
const { AppError } = require('./error.middleware');

const authenticateToken = async (req, res, next) => {
  try {
    console.log('🔍 AUTH DEBUG: Starting authentication...');
    
    const redisService = new RedisService();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log('🔍 AUTH DEBUG: Auth header:', authHeader ? 'Present' : 'Missing');
    console.log('🔍 AUTH DEBUG: Token:', token ? token.substring(0, 20) + '...' : 'Missing');

    if (!token) {
      console.log('🔍 AUTH DEBUG: No token provided');
      throw new AppError('Access token required', 401, 'NO_TOKEN');
    }

    // Check if token is blacklisted
    const isBlacklisted = await redisService.get(`blacklist:${token}`);
    if (isBlacklisted) {
      console.log('🔍 AUTH DEBUG: Token is blacklisted');
      throw new AppError('Token has been revoked', 401, 'TOKEN_REVOKED');
    }

    console.log('🔍 AUTH DEBUG: Verifying JWT token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔍 AUTH DEBUG: Token verified, user ID:', decoded.userId);
    
    console.log('🔍 AUTH DEBUG: Looking up user in database...');
    const user = await prisma.users.findUnique({
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

    if (!user) {
      console.log('🔍 AUTH DEBUG: User not found in database');
      throw new AppError('User not found', 401, 'USER_NOT_FOUND');
    }

    console.log('🔍 AUTH DEBUG: User found:', user.email);
    console.log('🔍 AUTH DEBUG: User active:', user.is_active);
    console.log('🔍 AUTH DEBUG: User verified:', user.is_verified);
    console.log('🔍 AUTH DEBUG: User roles count:', user.user_roles.length);

    if (!user.is_active) {
      console.log('🔍 AUTH DEBUG: User is inactive');
      throw new AppError('Account is inactive', 401, 'ACCOUNT_INACTIVE');
    }

    if (!user.is_verified) {
      console.log('🔍 AUTH DEBUG: User is not verified');
      throw new AppError('Email not verified', 401, 'EMAIL_NOT_VERIFIED');
    }

    console.log('🔍 AUTH DEBUG: User validation passed, creating user object...');

    // Create a simple user object that matches what the controller expects
    const formattedUser = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      isActive: user.is_active,
      isVerified: user.is_verified,
      roles: user.user_roles.map((userRole) => ({
        id: userRole.roles.id,
        role: {
          id: userRole.roles.id,
          name: userRole.roles.name,
          permissions: userRole.roles.permissions || []
        }
      }))
    };

    console.log('🔍 AUTH DEBUG: User formatted successfully');
    console.log('🔍 AUTH DEBUG: Setting req.user...');

    req.user = formattedUser;
    console.log('🔍 AUTH DEBUG: Authentication successful!');
    next();
  } catch (error) {
    console.log('🔍 AUTH DEBUG: Error in authentication:', error.message);
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401, 'INVALID_TOKEN'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401, 'TOKEN_EXPIRED'));
    } else {
      next(error);
    }
  }
};

module.exports = {
  authenticateToken,
  requireRole: (roles) => (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }
    const userRoles = req.user.roles.map(userRole => userRole.role.name);
    const hasRequiredRole = roles.some(role => userRoles.includes(role));
    if (!hasRequiredRole) {
      return next(new AppError('Insufficient permissions', 403, 'FORBIDDEN'));
    }
    next();
  },
  requireAdmin: (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }
    const userRoles = req.user.roles.map(userRole => userRole.role.name);
    if (!userRoles.includes('admin')) {
      return next(new AppError('Insufficient permissions', 403, 'FORBIDDEN'));
    }
    next();
  }
};
