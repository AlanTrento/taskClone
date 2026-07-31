import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';

export class ApiTaskListRepository implements ITaskListRepository {
  async getAll(): Promise<TaskList[]> {
    throw new Error('ApiTaskListRepository.getAll() not implemented');
  }

  async getById(_id: string): Promise<TaskList | null> {
    throw new Error('ApiTaskListRepository.getById() not implemented');
  }

  async create(_taskList: TaskList): Promise<TaskList> {
    throw new Error('ApiTaskListRepository.create() not implemented');
  }

  async update(_taskList: TaskList): Promise<TaskList> {
    throw new Error('ApiTaskListRepository.update() not implemented');
  }

  async delete(_id: string): Promise<void> {
    throw new Error('ApiTaskListRepository.delete() not implemented');
  }
}
