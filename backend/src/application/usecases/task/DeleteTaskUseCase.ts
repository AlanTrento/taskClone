import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string, taskId: string): Promise<void> {
    const existing = await this.taskRepository.findById(taskId, userId);
    if (!existing) {
      throw new NotFoundError('Task not found');
    }

    await this.taskRepository.delete(taskId, userId);
  }
}
