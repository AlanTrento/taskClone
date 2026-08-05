import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository, UpdateTaskListRequest } from '../../domain/repositories/ITaskListRepository';

interface UpdateTaskListUseCaseRequest {
  id: string;
  name?: string;
  color?: string;
  order?: number;
}

export class UpdateTaskListUseCase {
  private taskListRepository: ITaskListRepository;

  constructor(taskListRepository: ITaskListRepository) {
    this.taskListRepository = taskListRepository;
  }

  async execute(request: UpdateTaskListUseCaseRequest): Promise<TaskList> {
    const existing = await this.taskListRepository.getById(request.id);

    if (!existing) {
      throw new Error('Task list not found');
    }

    const updates: UpdateTaskListRequest = {};
    if (request.name !== undefined) updates.name = request.name;
    if (request.color !== undefined) updates.color = request.color;
    if (request.order !== undefined) updates.order = request.order;

    return this.taskListRepository.update(request.id, updates);
  }
}
