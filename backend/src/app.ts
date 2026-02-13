import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import { rateLimiter } from './middleware/rateLimit.middleware';
import { logger } from './utils/logger';
import { connectRedis } from './config/redis';
import { swaggerOptions } from './config/swagger';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { createServer } from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import uploadRoutes from './routes/upload.routes';
import princiPostsRoutes from './routes/princiPosts.routes';
import princiVoiceRoutes from './routes/princiVoice.routes';
import princiMomentsRoutes from './routes/princiMoments.routes';
import princiTalksRoutes from './routes/princiTalks.routes';
import principassionsRoutes from './routes/principassions.routes';
import princiFlashRoutes from './routes/princiFlash.routes';
import princiCareRoutes from './routes/princiCare.routes';
import princiFestRoutes from './routes/princiFest.routes';
import princiTorchRoutes from './routes/princiTorch.routes';
import princiQuestRoutes from './routes/princiQuest.routes';
import princiEdgeRoutes from './routes/princiEdge.routes';
import princiCatalystRoutes from './routes/princiCatalyst.routes';
import princiCircleRoutes from './routes/princiCircle.routes';
import princiServeRoutes from './routes/princiServe.routes';
import princiPerksRoutes from './routes/princiPerks.routes';
import princiAwardsRoutes from './routes/princiAwards.routes';
import princiSchoolRoutes from './routes/princiSchool.routes';
import princiPathwayRoutes from './routes/princiPathway.routes';
import princiHubsRoutes from './routes/princiHubs.routes';
import paymentRoutes from './routes/payment.routes';
import notificationRoutes from './routes/notification.routes';
import analyticsRoutes from './routes/analytics.routes';
import adminRoutes from './routes/admin.routes';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(compression());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiting
app.use(rateLimiter);

// Swagger documentation
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
const apiVersion = '/api/v1';

app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/users`, userRoutes);
app.use(`${apiVersion}/upload`, uploadRoutes);
app.use(`${apiVersion}/princi-posts`, princiPostsRoutes);
app.use(`${apiVersion}/princi-voice`, princiVoiceRoutes);
app.use(`${apiVersion}/princi-moments`, princiMomentsRoutes);
app.use(`${apiVersion}/princi-talks`, princiTalksRoutes);
app.use(`${apiVersion}/principassions`, principassionsRoutes);
app.use(`${apiVersion}/princi-flash`, princiFlashRoutes);
app.use(`${apiVersion}/princi-care`, princiCareRoutes);
app.use(`${apiVersion}/princi-fest`, princiFestRoutes);
app.use(`${apiVersion}/princi-torch`, princiTorchRoutes);
app.use(`${apiVersion}/princi-quest`, princiQuestRoutes);
app.use(`${apiVersion}/princi-edge`, princiEdgeRoutes);
app.use(`${apiVersion}/princi-catalyst`, princiCatalystRoutes);
app.use(`${apiVersion}/princi-circle`, princiCircleRoutes);
app.use(`${apiVersion}/princi-serve`, princiServeRoutes);
app.use(`${apiVersion}/princi-perks`, princiPerksRoutes);
app.use(`${apiVersion}/princi-awards`, princiAwardsRoutes);
app.use(`${apiVersion}/princi-school`, princiSchoolRoutes);
app.use(`${apiVersion}/princi-pathway`, princiPathwayRoutes);
app.use(`${apiVersion}/princi-hubs`, princiHubsRoutes);
app.use(`${apiVersion}/payments`, paymentRoutes);
app.use(`${apiVersion}/notifications`, notificationRoutes);
app.use(`${apiVersion}/analytics`, analyticsRoutes);
app.use(`${apiVersion}/admin`, adminRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    logger.info(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    logger.info(`User ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Connect to Redis
    await connectRedis();
    logger.info('Connected to Redis');

    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

startServer();

export { app, io };
