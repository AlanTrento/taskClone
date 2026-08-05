import type { ITaskListRepository } from '../../interfaces/ITaskListRepository.js';
import type { TaskList } from '../../../domain/entities/TaskList.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class UpdateTaskListUseCase {
  constructor(private taskListRepository: ITaskListRepository) {}

  async execute(
    userId: string,
    listId: string,
    updates: Partial<Pick<TaskList, 'name' | 'color' | 'order'>>,
  ): Promise<TaskList> {
    const existing = await this.taskListRepository.findById(listId, userId);
    if (!existing) {
      throw new NotFoundError('Task list not found');
    }

    return this.taskListRepository.update(listId, userId, updates);
  }
}
