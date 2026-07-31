import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';

export class GetTaskListsUseCase {
  private taskListRepository: ITaskListRepository;

  constructor(taskListRepository: ITaskListRepository) {
    this.taskListRepository = taskListRepository;
  }

  async execute(): Promise<TaskList[]> {
    return this.taskListRepository.getAll();
  }
}
