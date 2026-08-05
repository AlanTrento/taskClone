import type { ITaskListRepository } from '../../interfaces/ITaskListRepository.js';
import type { TaskList } from '../../../domain/entities/TaskList.js';

export class GetTaskListsUseCase {
  constructor(private taskListRepository: ITaskListRepository) {}

  async execute(userId: string): Promise<TaskList[]> {
    return this.taskListRepository.findAll(userId);
  }
}
