import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';
import type { Task } from '../../../domain/entities/Task.js';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    userId: string,
    data: { title: string; description?: string; listId: string; order?: number },
  ): Promise<Task> {
    if (!data.title || !data.title.trim()) {
      throw new ValidationError('Título é obrigatório');
    }

    if (!data.listId) {
      throw new ValidationError('Lista é obrigatória');
    }

    const maxOrder = await this.taskRepository.getMaxOrder(userId);

    return this.taskRepository.create({
      title: data.title.trim(),
      description: data.description,
      completed: false,
      starred: false,
      listId: data.listId,
      userId,
      order: data.order ?? maxOrder + 1,
    });
  }
}
