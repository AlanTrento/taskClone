import type { ITaskRepository } from '../../interfaces/ITaskRepository.js';

export class DeleteCompletedTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string, listId: string): Promise<void> {
    await this.taskRepository.deleteCompletedByListId(listId, userId);
  }
}
