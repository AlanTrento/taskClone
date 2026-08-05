import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository, CreateTaskListRequest, UpdateTaskListRequest } from '../../domain/repositories/ITaskListRepository';

const mockTaskLists: TaskList[] = [
  {
    id: '1',
    name: 'Minhas tarefas',
    color: '#8ab4f8',
    order: 0,
  },
  {
    id: '2',
    name: 'Trabalho',
    color: '#81c995',
    order: 1,
  },
  {
    id: '3',
    name: 'Pessoal',
    color: '#f28b82',
    order: 2,
  },
];

export class MockTaskListRepository implements ITaskListRepository {
  private taskLists: TaskList[] = [...mockTaskLists];

  async getAll(): Promise<TaskList[]> {
    await this.delay();
    return [...this.taskLists];
  }

  async getById(id: string): Promise<TaskList | null> {
    await this.delay();
    return this.taskLists.find((list) => list.id === id) || null;
  }

  async create(data: CreateTaskListRequest): Promise<TaskList> {
    await this.delay();
    const maxOrder = this.taskLists.reduce((max, list) => Math.max(max, list.order), -1);
    const newTaskList: TaskList = {
      id: crypto.randomUUID(),
      name: data.name,
      color: data.color,
      order: maxOrder + 1,
    };
    this.taskLists.push(newTaskList);
    return newTaskList;
  }

  async update(id: string, updates: UpdateTaskListRequest): Promise<TaskList> {
    await this.delay();
    const index = this.taskLists.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new Error('Task list not found');
    }
    this.taskLists[index] = {
      ...this.taskLists[index],
      ...updates,
    };
    return this.taskLists[index];
  }

  async delete(id: string): Promise<void> {
    await this.delay();
    this.taskLists = this.taskLists.filter((list) => list.id !== id);
  }

  async getMaxOrder(): Promise<number> {
    await this.delay();
    return this.taskLists.reduce((max, list) => Math.max(max, list.order), -1);
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
}
