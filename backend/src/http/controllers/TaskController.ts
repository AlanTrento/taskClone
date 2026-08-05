import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import * as container from '../../di/container.js';

export class TaskController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { listId, completed, starred } = req.query;
      const filters: { listId?: string; completed?: boolean; starred?: boolean } = {};
      if (listId) filters.listId = listId as string;
      if (completed !== undefined) filters.completed = completed === 'true';
      if (starred !== undefined) filters.starred = starred === 'true';

      const tasks = await container.getTasksUseCase.execute(req.userId!, filters);
      res.status(200).json({ success: true, data: tasks });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await container.getTaskByIdUseCase.execute(req.userId!, id);
      res.status(200).json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, listId, order } = req.body;
      const task = await container.createTaskUseCase.execute(req.userId!, { title, description, listId, order });
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await container.updateTaskUseCase.execute(req.userId!, id, req.body);
      res.status(200).json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await container.deleteTaskUseCase.execute(req.userId!, id);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async deleteCompleted(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { listId } = req.params;
      await container.deleteCompletedTasksUseCase.execute(req.userId!, listId);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async markOld(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { listId } = req.params;
      const { olderThanDays } = req.query;
      await container.markOldTasksAsCompletedUseCase.execute(
        req.userId!,
        listId,
        olderThanDays ? Number(olderThanDays) : 30,
      );
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
