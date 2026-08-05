import type { Task } from '../entities/Task';

export interface CreateTaskRequest {
  title: string;
  description?: string;
  listId: string;
  order?: number;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  starred?: boolean;
  starredAt?: Date;
  dueDate?: Date;
  dueTime?: string;
  order?: number;
}

export interface ITaskRepository {
  getAll(filters?: { listId?: string; completed?: boolean; starred?: boolean }): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(data: CreateTaskRequest): Promise<Task>;
  update(id: string, data: UpdateTaskRequest): Promise<Task>;
  delete(id: string): Promise<void>;
  deleteCompletedByListId(listId: string): Promise<void>;
  markOldAsCompleted(listId: string, olderThanDays?: number): Promise<void>;
}
