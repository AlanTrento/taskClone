import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class DeleteCompletedTasksUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(listId: string): Promise<void> {
    await this.taskRepository.deleteByFilter(
      (task) => task.completed && task.listId === listId
    );
  }
}
