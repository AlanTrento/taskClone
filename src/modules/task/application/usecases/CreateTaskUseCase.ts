import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { createTask } from '../../domain/entities/Task';

interface CreateTaskRequest {
  title: string;
  description?: string;
  listId: string;
}

export class CreateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(request: CreateTaskRequest): Promise<Task> {
    const newTask = createTask({
      id: crypto.randomUUID(),
      title: request.title,
      description: request.description,
      completed: false,
      starred: false,
      listId: request.listId,
    });

    return this.taskRepository.create(newTask);
  }
}
