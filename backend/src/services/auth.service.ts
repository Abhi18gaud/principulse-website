import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { RedisService } from '../config/redis';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/error.middleware';
import { prisma } from '../config/database';

interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  schoolName?: string;
  position?: string;
}

export class AuthService {
  private redisService: RedisService | null = null;

  private getRedisService(): RedisService {
    if (!this.redisService) {
      this.redisService = new RedisService();
    }
    return this.redisService;
  }

  // Utility function to convert snake_case to camelCase
  private toCamelCase(obj: any): any {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => this.toCamelCase(item));
    const result: any = {};
    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = this.toCamelCase(obj[key]);
    }
    return result;
  }

  async register(userData: RegisterUserData) {
    const { email, password, firstName, lastName, phone, schoolName, position } = userData;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.users.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        school_name: schoolName || null,
        position: position || null
      }
    });

    // Transform to camelCase for frontend
    const transformedUser = this.toCamelCase(newUser);

    // Assign default role (member role)
    const memberRole = await prisma.roles.findFirst({
      where: { name: 'member' }
    });

    if (memberRole) {
      // Assign default role
      await prisma.user_roles.create({
        data: {
          user_id: transformedUser.id,
          role_id: memberRole.id
        }
      });
    }

    // Send verification email
    await this.sendVerificationEmail(transformedUser.email, transformedUser.id);

    // Generate tokens
    const tokens = await this.generateTokens(transformedUser);

    return {
      user: transformedUser,
      tokens
    };
  }

  // Login user
  async login(email: string, password: string) {
    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password_hash: true,
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

    if (!user || !user.is_active) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Transform to camelCase for frontend
    const transformedUser = this.toCamelCase(user);

    // Update last login
    await prisma.users.update({
      where: { id: user.id },
      data: { last_login_at: new Date() }
    });

    // Generate tokens
    const tokens = await this.generateTokens(transformedUser);

    return {
      user: transformedUser,
      tokens
    };
  }

  // Generate JWT tokens
  private async generateTokens(user: any) {
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    return {
      accessToken,
      refreshToken
    };
  }

  // Send verification email
  private async sendVerificationEmail(email: string, userId: string) {
    const verificationToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Send verification email
    const emailResult = { success: true, message: 'Email service temporarily disabled' };
    logger.info(`📧 Email service temporarily disabled - user ${email} created with verification token ${verificationToken}`);
    
    // For now, automatically verify users after registration
    await prisma.users.update({
      where: { id: userId },
      data: {
        is_verified: true,
        email_verified_at: new Date()
      }
    });
    
    logger.info(`✅ User ${email} automatically verified`);
    return { success: true, message: 'User automatically verified' };
  }

  // Verify email
  async verifyEmail(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      await prisma.users.update({
        where: { id: decoded.userId },
        data: {
          is_verified: true,
          email_verified_at: new Date()
        }
      });

      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      throw new AppError('Invalid verification token', 400);
    }
  }

  // Refresh token
  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
      
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
          user_roles: {
            include: {
              roles: true
            }
          }
        }
      });

      if (!user || !user.is_active) {
        throw new AppError('Invalid refresh token', 401);
      }

      const transformedUser = this.toCamelCase(user);
      const tokens = await this.generateTokens(transformedUser);

      return {
        user: transformedUser,
        tokens
      };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  // Forgot password
  async forgotPassword(email: string) {
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    await this.sendPasswordResetEmail(email, resetToken);

    return { success: true, message: 'Password reset email sent' };
  }

  // Send password reset email
  public async sendPasswordResetEmail(email: string, token: string) {
    // TODO: Implement email service
    logger.info(`Password reset email sent to ${email} with token ${token}`);
  }

  // Reset password
  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      await prisma.users.update({
        where: { id: decoded.userId },
        data: { password_hash: passwordHash }
      });

      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      throw new AppError('Invalid reset token', 400);
    }
  }

  // Logout
  async logout(userId: string, refreshToken: string) {
    // Remove refresh token from Redis
    await this.getRedisService().removeRefreshToken(userId, refreshToken);
    
    return { success: true, message: 'Logged out successfully' };
  }

  // Get user profile
  async getUserProfile(userId: string) {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        school_name: true,
        position: true,
        bio: true,
        profile_image_url: true,
        experience_years: true,
        education_qualification: true,
        specialization: true,
        date_of_birth: true,
        join_date: true,
        is_active: true,
        is_verified: true,
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
      throw new AppError('User not found', 404);
    }

    return this.toCamelCase(user);
  }

  // Update user profile
  async updateProfile(userId: string, updateData: any) {
    const { firstName, lastName, phone, schoolName, position, bio } = updateData;

    const updateFields: any = {};
    
    if (firstName !== undefined) updateFields.first_name = firstName;
    if (lastName !== undefined) updateFields.last_name = lastName;
    if (phone !== undefined) updateFields.phone = phone;
    if (schoolName !== undefined) updateFields.school_name = schoolName;
    if (position !== undefined) updateFields.position = position;
    if (bio !== undefined) updateFields.bio = bio;

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateFields
    });

    return this.toCamelCase(updatedUser);
  }

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password_hash: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isCurrentPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.users.update({
      where: { id: userId },
      data: { password_hash: passwordHash }
    });

    return { success: true, message: 'Password changed successfully' };
  }

  // Store refresh token
  async storeRefreshToken(userId: string, refreshToken: string) {
    await this.getRedisService().storeRefreshToken(userId, refreshToken);
  }

  // Get refresh token
  async getRefreshToken(userId: string) {
    return await this.getRedisService().getRefreshToken(userId);
  }

  // Remove refresh token
  async removeRefreshToken(userId: string, refreshToken: string) {
    await this.getRedisService().removeRefreshToken(userId, refreshToken);
  }

  // Invalidate all refresh tokens for user
  async invalidateAllRefreshTokens(userId: string) {
    await this.getRedisService().invalidateAllRefreshTokens(userId);
  }
}
