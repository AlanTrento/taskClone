import type { TaskList } from '../../domain/entities/TaskList.js';

export interface ITaskListRepository {
  findAll(userId: string): Promise<TaskList[]>;
  findById(id: string, userId: string): Promise<TaskList | null>;
  create(data: Omit<TaskList, 'id'>): Promise<TaskList>;
  update(id: string, userId: string, updates: Partial<Omit<TaskList, 'id' | 'userId'>>): Promise<TaskList>;
  delete(id: string, userId: string): Promise<void>;
  getMaxOrder(userId: string): Promise<number>;
}
