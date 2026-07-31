import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class ApiTaskRepository implements ITaskRepository {
  async getAll(): Promise<Task[]> {
    throw new Error('ApiTaskRepository.getAll() not implemented');
  }

  async getById(_id: string): Promise<Task | null> {
    throw new Error('ApiTaskRepository.getById() not implemented');
  }

  async create(_task: Task): Promise<Task> {
    throw new Error('ApiTaskRepository.create() not implemented');
  }

  async update(_task: Task): Promise<Task> {
    throw new Error('ApiTaskRepository.update() not implemented');
  }

  async delete(_id: string): Promise<void> {
    throw new Error('ApiTaskRepository.delete() not implemented');
  }

  async deleteByFilter(_predicate: (task: Task) => boolean): Promise<void> {
    throw new Error('ApiTaskRepository.deleteByFilter() not implemented');
  }

  async updateByFilter(_predicate: (task: Task) => boolean, _updates: Partial<Task>): Promise<void> {
    throw new Error('ApiTaskRepository.updateByFilter() not implemented');
  }
}
