import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { errorHandler } from '../../src/http/middlewares/errorHandler.js';
import { authMiddleware } from '../../src/http/middlewares/authMiddleware.js';
import { validate } from '../../src/http/middlewares/validator.js';
import { loginSchema, registerSchema } from '../../src/http/validators/auth.validator.js';
import { createTaskSchema } from '../../src/http/validators/task.validator.js';
import { createTaskListSchema } from '../../src/http/validators/taskList.validator.js';

// Minimal test app without DB dependencies
function createTestApp() {
  const app = express();
  app.use(express.json());

  // Health
  app.get('/api/v1/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() } });
  });

  // Auth routes with validation only
  app.post('/api/v1/auth/login', validate(loginSchema), (_req, res) => {
    res.json({ success: true, data: { user: {}, token: 'test' } });
  });

  app.post('/api/v1/auth/register', validate(registerSchema), (_req, res) => {
    res.status(201).json({ success: true, data: { user: {}, token: 'test' } });
  });

  // Protected routes
  app.get('/api/v1/tasks', authMiddleware, (_req, res) => {
    res.json({ success: true, data: [] });
  });

  app.post('/api/v1/tasks', authMiddleware, validate(createTaskSchema), (_req, res) => {
    res.status(201).json({ success: true, data: {} });
  });

  app.get('/api/v1/task-lists', authMiddleware, (_req, res) => {
    res.json({ success: true, data: [] });
  });

  app.post('/api/v1/task-lists', authMiddleware, validate(createTaskListSchema), (_req, res) => {
    res.status(201).json({ success: true, data: {} });
  });

  app.use(errorHandler);
  return app;
}

describe('Health Routes', () => {
  const app = createTestApp();

  it('GET /api/v1/health should return ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
  });
});

describe('Auth Routes (validation)', () => {
  const app = createTestApp();

  it('POST /api/v1/auth/login should validate input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: '', password: '' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/auth/login should accept valid input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.com', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/v1/auth/register should validate password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'test@test.com', password: 'weak' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/auth/register should accept valid input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'test@test.com', password: 'Strong@123' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

describe('Task Routes (auth)', () => {
  const app = createTestApp();

  it('GET /api/v1/tasks should require auth', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/tasks should require auth', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ title: 'Test', listId: '1' });
    expect(res.status).toBe(401);
  });
});

describe('TaskList Routes (auth)', () => {
  const app = createTestApp();

  it('GET /api/v1/task-lists should require auth', async () => {
    const res = await request(app).get('/api/v1/task-lists');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/task-lists should require auth', async () => {
    const res = await request(app)
      .post('/api/v1/task-lists')
      .send({ name: 'Test', color: '#8ab4f8' });
    expect(res.status).toBe(401);
  });
});
