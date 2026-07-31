import type { TaskList } from '../../domain/entities/TaskList';
import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';

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

  async create(taskList: TaskList): Promise<TaskList> {
    await this.delay();
    this.taskLists.push(taskList);
    return taskList;
  }

  async update(taskList: TaskList): Promise<TaskList> {
    await this.delay();
    const index = this.taskLists.findIndex((l) => l.id === taskList.id);
    if (index !== -1) {
      this.taskLists[index] = taskList;
    }
    return taskList;
  }

  async delete(id: string): Promise<void> {
    await this.delay();
    this.taskLists = this.taskLists.filter((list) => list.id !== id);
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
}
