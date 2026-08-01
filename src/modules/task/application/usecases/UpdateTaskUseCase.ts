import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { updateTask } from '../../domain/entities/Task';

interface UpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  starred?: boolean;
  starredAt?: Date;
  dueDate?: Date;
  dueTime?: string;
  order?: number;
}

export class UpdateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(request: UpdateTaskRequest): Promise<Task> {
    const existingTask = await this.taskRepository.getById(request.id);

    if (!existingTask) {
      throw new Error('Task not found');
    }

    const updatedTask = updateTask(existingTask, request);

    return this.taskRepository.update(updatedTask);
  }
}
