import type { ITaskListRepository } from '../../interfaces/ITaskListRepository.js';
import type { TaskList } from '../../../domain/entities/TaskList.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class GetTaskListByIdUseCase {
  constructor(private taskListRepository: ITaskListRepository) {}

  async execute(userId: string, taskListId: string): Promise<TaskList> {
    const list = await this.taskListRepository.findById(taskListId, userId);
    if (!list) {
      throw new NotFoundError('Task list not found');
    }
    return list;
  }
}
