import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class GetTasksUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(filters?: { listId?: string; completed?: boolean; starred?: boolean }): Promise<Task[]> {
    return this.taskRepository.getAll(filters);
  }
}
