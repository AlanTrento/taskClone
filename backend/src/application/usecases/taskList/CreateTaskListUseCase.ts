import type { ITaskListRepository } from '../../interfaces/ITaskListRepository.js';
import type { TaskList } from '../../../domain/entities/TaskList.js';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class CreateTaskListUseCase {
  constructor(private taskListRepository: ITaskListRepository) {}

  async execute(userId: string, data: { name: string; color: string }): Promise<TaskList> {
    if (!data.name || !data.name.trim()) {
      throw new ValidationError('Nome é obrigatório');
    }

    if (!data.color) {
      throw new ValidationError('Cor é obrigatória');
    }

    const maxOrder = await this.taskListRepository.getMaxOrder(userId);

    return this.taskListRepository.create({
      name: data.name.trim(),
      color: data.color,
      order: maxOrder + 1,
      userId,
    });
  }
}
