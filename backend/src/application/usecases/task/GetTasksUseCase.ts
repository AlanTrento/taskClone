import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';
import type { Task } from '../../../domain/entities/Task.js';

export class GetTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    userId: string,
    filters?: { listId?: string; completed?: boolean; starred?: boolean },
  ): Promise<Task[]> {
    return this.taskRepository.findAll(userId, filters);
  }
}
