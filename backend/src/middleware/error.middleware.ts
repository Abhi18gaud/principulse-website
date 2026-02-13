import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiResponse } from '../types';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let code = 'INTERNAL_SERVER_ERROR';
  let details: any = undefined;

  // Log the error
  logger.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Handle known error types
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code || 'APP_ERROR';
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
    details = error.message;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    code = 'INVALID_ID';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    code = 'INVALID_TOKEN';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    code = 'TOKEN_EXPIRED';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    if (error.message.includes('File too large')) {
      message = 'File size exceeds limit';
      code = 'FILE_TOO_LARGE';
    } else if (error.message.includes('Unexpected field')) {
      message = 'Unexpected field in file upload';
      code = 'UNEXPECTED_FIELD';
    } else {
      message = 'File upload error';
      code = 'FILE_UPLOAD_ERROR';
    }
  } else if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    switch (prismaError.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Resource already exists';
        code = 'RESOURCE_EXISTS';
        details = prismaError.meta?.target;
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Resource not found';
        code = 'RESOURCE_NOT_FOUND';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Foreign key constraint violation';
        code = 'FOREIGN_KEY_VIOLATION';
        break;
      default:
        statusCode = 500;
        message = 'Database error';
        code = 'DATABASE_ERROR';
    }
  } else if (error.name === 'PrismaClientUnknownRequestError') {
    statusCode = 500;
    message = 'Unknown database error';
    code = 'UNKNOWN_DATABASE_ERROR';
  } else if (error.name === 'PrismaClientRustPanicError') {
    statusCode = 500;
    message = 'Database connection error';
    code = 'DATABASE_CONNECTION_ERROR';
  } else if (error.name === 'PrismaClientInitializationError') {
    statusCode = 500;
    message = 'Database initialization error';
    code = 'DATABASE_INITIALIZATION_ERROR';
  } else if (error.name === 'PrismaClientValidationError') {
    statusCode = 400;
    message = 'Database validation error';
    code = 'DATABASE_VALIDATION_ERROR';
    details = error.message;
  }

  // Don't expose error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    details = undefined;
  }

  const response: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details && { details })
    }
  };

  res.status(statusCode).json(response);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const createError = (message: string, statusCode: number = 500, code?: string): AppError => {
  return new AppError(message, statusCode, code);
};
