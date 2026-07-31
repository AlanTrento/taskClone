import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class MarkOldTasksAsCompletedUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(listId: string, olderThanDays: number = 30): Promise<void> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - olderThanDays);

    await this.taskRepository.updateByFilter(
      (task) => task.listId === listId && !task.completed && task.createdAt < cutoff,
      { completed: true }
    );
  }
}
