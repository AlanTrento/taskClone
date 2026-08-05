import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository, CreateTaskRequest, UpdateTaskRequest } from '../../domain/repositories/ITaskRepository';
import { httpClient } from '../../../../shared/services/HttpClient';

interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  listId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  dueTime?: string;
  starredAt?: string;
  order: number;
}

function toDomain(response: TaskResponse): Task {
  return {
    id: response.id,
    title: response.title,
    description: response.description,
    completed: response.completed,
    starred: response.starred,
    listId: response.listId,
    createdAt: new Date(response.createdAt),
    updatedAt: new Date(response.updatedAt),
    dueDate: response.dueDate ? new Date(response.dueDate) : undefined,
    dueTime: response.dueTime,
    starredAt: response.starredAt ? new Date(response.starredAt) : undefined,
    order: response.order,
  };
}

export class ApiTaskRepository implements ITaskRepository {
  async getAll(filters?: { listId?: string; completed?: boolean; starred?: boolean }): Promise<Task[]> {
    const params: Record<string, string> = {};
    if (filters?.listId) params.listId = filters.listId;
    if (filters?.completed !== undefined) params.completed = String(filters.completed);
    if (filters?.starred !== undefined) params.starred = String(filters.starred);

    const response = await httpClient.get<TaskResponse[]>('/tasks', Object.keys(params).length > 0 ? params : undefined);
    return response.map(toDomain);
  }

  async getById(id: string): Promise<Task | null> {
    try {
      const response = await httpClient.get<TaskResponse>(`/tasks/${id}`);
      return toDomain(response);
    } catch {
      return null;
    }
  }

  async create(data: CreateTaskRequest): Promise<Task> {
    const response = await httpClient.post<TaskResponse>('/tasks', {
      title: data.title,
      description: data.description,
      listId: data.listId,
      order: data.order,
    });
    return toDomain(response);
  }

  async update(id: string, data: UpdateTaskRequest): Promise<Task> {
    const body: Record<string, unknown> = {};
    if (data.title !== undefined) body.title = data.title;
    if (data.description !== undefined) body.description = data.description;
    if (data.completed !== undefined) body.completed = data.completed;
    if (data.starred !== undefined) body.starred = data.starred;
    if (data.starredAt !== undefined) body.starredAt = data.starredAt.toISOString();
    if (data.dueDate !== undefined) body.dueDate = data.dueDate.toISOString();
    if (data.dueTime !== undefined) body.dueTime = data.dueTime;
    if (data.order !== undefined) body.order = data.order;

    const response = await httpClient.put<TaskResponse>(`/tasks/${id}`, body);
    return toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/tasks/${id}`);
  }

  async deleteCompletedByListId(listId: string): Promise<void> {
    await httpClient.delete(`/tasks/completed/${listId}`);
  }

  async markOldAsCompleted(listId: string, olderThanDays: number = 30): Promise<void> {
    await httpClient.put(`/tasks/mark-old/${listId}`, null);
  }
}
