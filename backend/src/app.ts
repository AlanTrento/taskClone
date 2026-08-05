import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { setupSwagger } from './config/swagger.js';
import routes from './http/routes/index.js';
import { errorHandler } from './http/middlewares/errorHandler.js';
import { rateLimiter } from './http/middlewares/rateLimiter.js';

const app = express();

// Trust proxy (required for rate limiting behind reverse proxies)
app.set('trust proxy', 1);

// Security
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(rateLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));

// Swagger
setupSwagger(app);

// Routes
app.use(routes);

// Global error handler
app.use(errorHandler);

export default app;
