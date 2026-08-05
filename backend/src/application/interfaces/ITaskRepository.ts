import type { Task } from '../../domain/entities/Task.js';

export interface ITaskRepository {
  findAll(userId: string, filters?: { listId?: string; completed?: boolean; starred?: boolean }): Promise<Task[]>;
  findById(id: string, userId: string): Promise<Task | null>;
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  update(id: string, userId: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'userId'>>): Promise<Task>;
  delete(id: string, userId: string): Promise<void>;
  deleteByListId(listId: string, userId: string): Promise<void>;
  deleteCompletedByListId(listId: string, userId: string): Promise<void>;
  markOldAsCompleted(listId: string, userId: string, olderThanDays: number): Promise<void>;
  getMaxOrder(userId: string): Promise<number>;
}
