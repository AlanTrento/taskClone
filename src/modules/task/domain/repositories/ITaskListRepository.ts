import type { TaskList } from '../entities/TaskList';

export interface CreateTaskListRequest {
  name: string;
  color: string;
}

export interface UpdateTaskListRequest {
  name?: string;
  color?: string;
  order?: number;
}

export interface ITaskListRepository {
  getAll(): Promise<TaskList[]>;
  getById(id: string): Promise<TaskList | null>;
  create(data: CreateTaskListRequest): Promise<TaskList>;
  update(id: string, data: UpdateTaskListRequest): Promise<TaskList>;
  delete(id: string): Promise<void>;
  getMaxOrder(): Promise<number>;
}
