import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { logger } from '../utils/logger';

// General rate limiter for all API endpoints
export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}, URL: ${req.url}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP, please try again later.'
      }
    });
  }
});

// Strict rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later.'
    }
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req: Request, res: Response) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}, URL: ${req.url}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'AUTH_RATE_LIMIT_EXCEEDED',
        message: 'Too many authentication attempts, please try again later.'
      }
    });
  }
});

// Strict rate limiter for password reset
export const passwordResetRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    success: false,
    error: {
      code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
      message: 'Too many password reset attempts, please try again later.'
    }
  },
  handler: (req: Request, res: Response) => {
    logger.warn(`Password reset rate limit exceeded for IP: ${req.ip}, Email: ${req.body.email}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
        message: 'Too many password reset attempts, please try again later.'
      }
    });
  }
});

// Rate limiter for file uploads
export const uploadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 uploads per hour
  message: {
    success: false,
    error: {
      code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
      message: 'Too many upload requests, please try again later.'
    }
  },
  handler: (req: Request, res: Response) => {
    logger.warn(`Upload rate limit exceeded for IP: ${req.ip}, URL: ${req.url}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
        message: 'Too many upload requests, please try again later.'
      }
    });
  }
});

// Rate limiter for email sending
export const emailRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 email requests per hour
  message: {
    success: false,
    error: {
      code: 'EMAIL_RATE_LIMIT_EXCEEDED',
      message: 'Too many email requests, please try again later.'
    }
  },
  handler: (req: Request, res: Response) => {
    logger.warn(`Email rate limit exceeded for IP: ${req.ip}, Email: ${req.body.email}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'EMAIL_RATE_LIMIT_EXCEEDED',
        message: 'Too many email requests, please try again later.'
      }
    });
  }
});
