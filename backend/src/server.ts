import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { logger } from './shared/utils/logger.js';

async function start(): Promise<void> {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
    logger.info(`API docs: http://localhost:${env.PORT}/api-docs`);
    logger.info(`Health: http://localhost:${env.PORT}/api/v1/health`);
  });
}

start().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
