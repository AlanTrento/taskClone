import { Router } from 'express';
import authRoutes from './auth.routes.js';
import taskRoutes from './task.routes.js';
import taskListRoutes from './taskList.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/api/v1/health', healthRoutes);
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/tasks', taskRoutes);
router.use('/api/v1/task-lists', taskListRoutes);

export default router;
