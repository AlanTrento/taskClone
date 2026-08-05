import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';
import type { Task } from '../../../domain/entities/Task.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    userId: string,
    taskId: string,
    updates: Partial<Pick<Task, 'title' | 'description' | 'completed' | 'starred' | 'starredAt' | 'dueDate' | 'dueTime' | 'order'>>,
  ): Promise<Task> {
    const existing = await this.taskRepository.findById(taskId, userId);
    if (!existing) {
      throw new NotFoundError('Task not found');
    }

    return this.taskRepository.update(taskId, userId, updates);
  }
}
