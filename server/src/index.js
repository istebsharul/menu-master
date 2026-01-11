import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes.js';
import menuCategoryRoutes from './routes/menuCategory.routes.js';
import menuItemRoutes from './routes/menuItem.routes.js';
import publicMenuRoutes from './routes/public/menuRoutes.js';

import { publicLimiter, authLimiter, adminLimiter } from './middlewares/rateLimiter.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';

dotenv.config();

// --------------------
// ENV Validation
// --------------------
if (!process.env.MONGO_URI) {
  logger.error('❌ MONGO_URI missing in .env');
  process.exit(1);
}

const app = express();

// --------------------
// App Config
// --------------------
app.set('trust proxy', 1);

// --------------------
// Global Middlewares
// --------------------
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------------
// Health Check
// --------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// --------------------
// Routes + Rate Limiters
// --------------------

// Auth (login, register)
app.use('/api/auth', authLimiter, authRoutes);

// Admin dashboard
app.use('/api/categories', adminLimiter, menuCategoryRoutes);
app.use('/api/items', adminLimiter, menuItemRoutes);

// Public customer menu
app.use('/api/public', publicLimiter, publicMenuRoutes);

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// --------------------
// Server Bootstrap
// --------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    logger.info('✅ MongoDB connected');

    const server = app.listen(PORT, '0.0.0.0',() => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

    const shutdown = (signal) => {
      logger.warn(`⚠️ ${signal} received. Shutting down...`);
      server.close(() => {
        logger.info('🛑 Server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    logger.error('❌ Startup error', error);
    process.exit(1);
  }
};

startServer();