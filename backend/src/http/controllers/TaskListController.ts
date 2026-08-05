import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import * as container from '../../di/container.js';

export class TaskListController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const lists = await container.getTaskListsUseCase.execute(req.userId!);
      res.status(200).json({ success: true, data: lists });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const list = await container.getTaskListByIdUseCase.execute(req.userId!, id);
      res.status(200).json({ success: true, data: list });
    } catch (err) {
      next(err);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, color } = req.body;
      const list = await container.createTaskListUseCase.execute(req.userId!, { name, color });
      res.status(201).json({ success: true, data: list });
    } catch (err) {
      next(err);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const list = await container.updateTaskListUseCase.execute(req.userId!, id, req.body);
      res.status(200).json({ success: true, data: list });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await container.deleteTaskListUseCase.execute(req.userId!, id);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
