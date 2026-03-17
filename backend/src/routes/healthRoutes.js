import express from 'express';
import config from '../config.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'BARS-AI Backend',
    version: '1.0.0',
    environment: config.nodeEnv,
    uptime: process.uptime(),
  });
});

export default router;
