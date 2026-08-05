import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository, CreateTaskListRequest } from '../../domain/repositories/ITaskListRepository';

export class CreateTaskListUseCase {
  private taskListRepository: ITaskListRepository;

  constructor(taskListRepository: ITaskListRepository) {
    this.taskListRepository = taskListRepository;
  }

  async execute(request: CreateTaskListRequest): Promise<TaskList> {
    if (!request.name || !request.name.trim()) {
      throw new Error('Nome é obrigatório');
    }

    if (!request.color) {
      throw new Error('Cor é obrigatória');
    }

    return this.taskListRepository.create({
      name: request.name.trim(),
      color: request.color,
    });
  }
}
