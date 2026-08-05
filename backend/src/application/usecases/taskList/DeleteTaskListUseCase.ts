import type { ITaskListRepository } from '../../interfaces/ITaskListRepository.js';
import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class DeleteTaskListUseCase {
  constructor(
    private taskListRepository: ITaskListRepository,
    private taskRepository: ITaskRepository,
  ) {}

  async execute(userId: string, listId: string): Promise<void> {
    const existing = await this.taskListRepository.findById(listId, userId);
    if (!existing) {
      throw new NotFoundError('Task list not found');
    }

    // Cascade delete: remove all tasks in this list
    await this.taskRepository.deleteByListId(listId, userId);
    await this.taskListRepository.delete(listId, userId);
  }
}
