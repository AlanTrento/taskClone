import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository, CreateTaskRequest } from '../../domain/repositories/ITaskRepository';

export class CreateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(request: CreateTaskRequest): Promise<Task> {
    if (!request.title || !request.title.trim()) {
      throw new Error('Título é obrigatório');
    }

    if (!request.listId) {
      throw new Error('Lista é obrigatória');
    }

    return this.taskRepository.create({
      title: request.title.trim(),
      description: request.description,
      listId: request.listId,
      order: request.order,
    });
  }
}
