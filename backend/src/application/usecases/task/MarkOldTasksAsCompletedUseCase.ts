import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';

export class MarkOldTasksAsCompletedUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string, listId: string, olderThanDays = 30): Promise<void> {
    await this.taskRepository.markOldAsCompleted(listId, userId, olderThanDays);
  }
}
