import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';
import { createTaskList } from '../../domain/entities/TaskList';

interface CreateTaskListRequest {
  name: string;
  color: string;
}

export class CreateTaskListUseCase {
  private taskListRepository: ITaskListRepository;

  constructor(taskListRepository: ITaskListRepository) {
    this.taskListRepository = taskListRepository;
  }

  async execute(request: CreateTaskListRequest): Promise<TaskList> {
    const existing = await this.taskListRepository.getAll();
    const maxOrder = existing.reduce((max, list) => Math.max(max, list.order), -1);

    const newTaskList = createTaskList({
      id: crypto.randomUUID(),
      name: request.name,
      color: request.color,
    });

    newTaskList.order = maxOrder + 1;

    return this.taskListRepository.create(newTaskList);
  }
}
