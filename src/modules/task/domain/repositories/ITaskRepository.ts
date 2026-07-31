import type { Task } from '../entities/Task';

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  deleteByFilter(predicate: (task: Task) => boolean): Promise<void>;
  updateByFilter(predicate: (task: Task) => boolean, updates: Partial<Task>): Promise<void>;
}
