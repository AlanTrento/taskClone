import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

router.get('/ready', (_req, res) => {
  const mongoState = mongoose.connection.readyState;
  const isConnected = mongoState === 1;

  res.status(isConnected ? 200 : 503).json({
    success: isConnected,
    data: {
      status: isConnected ? 'ready' : 'not ready',
      mongo: isConnected ? 'connected' : 'disconnected',
    },
  });
});

export default router;
