import type { TaskList } from '../entities/TaskList';

export interface ITaskListRepository {
  getAll(): Promise<TaskList[]>;
  getById(id: string): Promise<TaskList | null>;
  create(taskList: TaskList): Promise<TaskList>;
  update(taskList: TaskList): Promise<TaskList>;
  delete(id: string): Promise<void>;
}
