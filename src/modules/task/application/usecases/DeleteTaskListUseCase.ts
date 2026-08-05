import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class DeleteTaskListUseCase {
  private taskListRepository: ITaskListRepository;
  private taskRepository: ITaskRepository;

  constructor(taskListRepository: ITaskListRepository, taskRepository: ITaskRepository) {
    this.taskListRepository = taskListRepository;
    this.taskRepository = taskRepository;
  }

  async execute(id: string): Promise<void> {
    const existing = await this.taskListRepository.getById(id);

    if (!existing) {
      throw new Error('Task list not found');
    }

    await this.taskListRepository.delete(id);
  }
}
