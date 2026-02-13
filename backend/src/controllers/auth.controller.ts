import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../middleware/error.middleware';
import { ApiResponse, AuthenticatedRequest } from '../types';

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.register(req.body);

    res.status(201).json({
      success: true,
      data: result,
      message: 'Registration successful. Please check your email for verification.'
    } as ApiResponse);
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);

    // Set HTTP-only cookies for tokens
    res.cookie('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      data: result,
      message: 'Login successful'
    } as ApiResponse);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Refresh token required'
        }
      } as ApiResponse);
      return;
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    res.cookie('accessToken', tokens.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.json({
      success: true,
      data: tokens
    } as ApiResponse);
  });

  logout = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const refreshToken = req.cookies?.refreshToken;

    if (userId && refreshToken) {
      await this.authService.logout(userId, refreshToken);
    }

    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      message: 'Logout successful'
    } as ApiResponse);
  });

  verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Verification token required'
        }
      } as ApiResponse);
      return;
    }

    const result = await this.authService.verifyEmail(token);

    res.json({
      success: true,
      data: result,
      message: 'Email verified successfully'
    } as ApiResponse);
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_EMAIL',
          message: 'Email address required'
        }
      } as ApiResponse);
      return;
    }

    const resetToken = jwt.sign(
      { userId: 'temp' }, // Temporary user ID for reset
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const result = await this.authService.sendPasswordResetEmail(email, resetToken);

    res.json({
      success: true,
      data: result,
      message: 'Password reset email sent'
    } as ApiResponse);
  });

  resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Token and new password required'
        }
      } as ApiResponse);
      return;
    }

    const result = await this.authService.resetPassword(token, newPassword);

    res.json({
      success: true,
      data: result,
      message: 'Password reset successful'
    } as ApiResponse);
  });

  getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      } as ApiResponse);
      return;
    }

    const user = await this.authService.getUserProfile(userId);

    res.json({
      success: true,
      data: user
    } as ApiResponse);
  });

  changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const body = req.body as unknown as ChangePasswordRequest;
    const { currentPassword, newPassword } = body;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      } as ApiResponse);
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Current password and new password required'
        }
      } as ApiResponse);
      return;
    }

    await this.authService.changePassword(userId, currentPassword, newPassword);

    res.json({
      success: true,
      message: 'Password changed successfully'
    } as ApiResponse);
  });
}

export { AuthController };
