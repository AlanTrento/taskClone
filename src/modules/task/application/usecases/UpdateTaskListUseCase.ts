import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';
import { updateTaskList } from '../../domain/entities/TaskList';

interface UpdateTaskListRequest {
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

  async execute(request: UpdateTaskListRequest): Promise<TaskList> {
    const existing = await this.taskListRepository.getById(request.id);

    if (!existing) {
      throw new Error('Task list not found');
    }

    const updated = updateTaskList(existing, request);

    return this.taskListRepository.update(updated);
  }
}
