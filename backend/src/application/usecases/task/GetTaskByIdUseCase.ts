import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';
import type { Task } from '../../../domain/entities/Task.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class GetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId, userId);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return task;
  }
}
