import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository, UpdateTaskRequest } from '../../domain/repositories/ITaskRepository';

export class UpdateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: string, updates: UpdateTaskRequest): Promise<Task> {
    const existingTask = await this.taskRepository.getById(id);

    if (!existingTask) {
      throw new Error('Task not found');
    }

    return this.taskRepository.update(id, updates);
  }
}
