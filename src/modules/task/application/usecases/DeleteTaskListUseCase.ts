import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';

export class DeleteTaskListUseCase {
  private taskListRepository: ITaskListRepository;

  constructor(taskListRepository: ITaskListRepository) {
    this.taskListRepository = taskListRepository;
  }

  async execute(id: string): Promise<void> {
    const existing = await this.taskListRepository.getById(id);

    if (!existing) {
      throw new Error('Task list not found');
    }

    await this.taskListRepository.delete(id);
  }
}
