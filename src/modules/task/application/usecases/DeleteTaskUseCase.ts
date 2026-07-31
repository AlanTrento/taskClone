import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class DeleteTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: string): Promise<void> {
    const existingTask = await this.taskRepository.getById(id);

    if (!existingTask) {
      throw new Error('Task not found');
    }

    await this.taskRepository.delete(id);
  }
}
