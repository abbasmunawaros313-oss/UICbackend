import express from 'express';
import travelRoutes from './travel.routes.js';
import pakcareRoutes from './pakcare.routes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'UIC Travel Insurance API is running',
        timestamp: new Date().toISOString(),
    });
});

// Mount route modules
router.use('/uic', travelRoutes);
router.use('/pakcare', pakcareRoutes);

export default router;
