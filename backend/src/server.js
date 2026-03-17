import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import config from './config.js';
import logger from './logger.js';
import chatRoutes from './routes/chatRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// Trust proxy - Required for rate limiting behind Render proxy
app.set('trust proxy', 1);

// Middleware - Security
app.use(helmet());

// Middleware - CORS
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware - Compression
app.use(compression());

// Middleware - Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message) } }));

// Middleware - Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware - Rate Limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: 'Route not found',
    },
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`🚀 BARS-AI Backend running on http://localhost:${PORT}`);
  logger.info(`Environment: ${config.nodeEnv}`);
  logger.info(`OpenRouter Model: ${config.openrouter.model}`);
});

export default app;
