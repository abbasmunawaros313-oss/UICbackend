import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './utils/error-handler.js';
import logger from './utils/logger.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.method === 'POST' ? req.body : undefined,
    ip: req.ip,
  });
  next();
});

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'UIC Travel Insurance API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      travel: {
        packages: 'GET /api/uic/packages',
        allCoverages: 'GET /api/uic/coverages/all',
        coveragesByArea: 'GET /api/uic/coverages/area',
        countries: 'GET /api/uic/countries',
        createPolicy: 'POST /api/uic/policy/create',
        requests: 'GET /api/uic/policy/requests',
        processRequest: 'POST /api/uic/policy/process',
      },
      pakcare: {
        countries: 'GET /api/pakcare/countries',
        coverages: 'GET /api/pakcare/coverages',
        packages: 'GET /api/pakcare/packages',
        createPolicy: 'POST /api/pakcare/policy/create',
        requests: 'GET /api/pakcare/policy/requests',
        processRequest: 'POST /api/pakcare/policy/process',
        report: 'GET /api/pakcare/policy/report',
        printUrl: 'GET /api/pakcare/policy/print-url',
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;