import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository, CreateTaskListRequest, UpdateTaskListRequest } from '../../domain/repositories/ITaskListRepository';
import { httpClient } from '../../../../shared/services/HttpClient';

interface TaskListResponse {
  id: string;
  name: string;
  color: string;
  order: number;
}

function toDomain(response: TaskListResponse): TaskList {
  return {
    id: response.id,
    name: response.name,
    color: response.color,
    order: response.order,
  };
}

export class ApiTaskListRepository implements ITaskListRepository {
  async getAll(): Promise<TaskList[]> {
    const response = await httpClient.get<TaskListResponse[]>('/task-lists');
    return response.map(toDomain);
  }

  async getById(id: string): Promise<TaskList | null> {
    try {
      const response = await httpClient.get<TaskListResponse>(`/task-lists/${id}`);
      return toDomain(response);
    } catch {
      return null;
    }
  }

  async create(data: CreateTaskListRequest): Promise<TaskList> {
    const response = await httpClient.post<TaskListResponse>('/task-lists', {
      name: data.name,
      color: data.color,
    });
    return toDomain(response);
  }

  async update(id: string, updates: UpdateTaskListRequest): Promise<TaskList> {
    const body: Record<string, unknown> = {};
    if (updates.name !== undefined) body.name = updates.name;
    if (updates.color !== undefined) body.color = updates.color;
    if (updates.order !== undefined) body.order = updates.order;

    const response = await httpClient.put<TaskListResponse>(`/task-lists/${id}`, body);
    return toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/task-lists/${id}`);
  }

  async getMaxOrder(): Promise<number> {
    const lists = await this.getAll();
    return lists.reduce((max, list) => Math.max(max, list.order), -1);
  }
}
