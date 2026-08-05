import type { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import * as container from '../../di/container.js';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const result = await container.registerUseCase.execute({ name, email, password });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await container.loginUseCase.execute({ email, password });
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async me(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await container.getCurrentUserUseCase.execute(req.userId!);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await container.updateProfileUseCase.execute(req.userId!, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      await container.changePasswordUseCase.execute(req.userId!, currentPassword, newPassword);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await container.logoutUseCase.execute();
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
