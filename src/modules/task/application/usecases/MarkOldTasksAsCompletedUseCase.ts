import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class MarkOldTasksAsCompletedUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(listId: string, olderThanDays: number = 30): Promise<void> {
    await this.taskRepository.markOldAsCompleted(listId, olderThanDays);
  }
}
