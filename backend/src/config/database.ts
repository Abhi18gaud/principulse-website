import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

declare global {
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma || new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL database');
    
    // Test basic query
    await prisma.$queryRaw`SELECT 1`;
    logger.info('Database connection test successful');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    logger.info('Disconnected from database');
  } catch (error) {
    logger.error('Error disconnecting from database:', error);
    throw error;
  }
}

export { prisma };
