import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implementar autenticação',
    description: 'Criar sistema de login',
    completed: false,
    starred: true,
    listId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    dueTime: '09:00',
    starredAt: new Date('2024-01-16'),
    order: 0,
  },
  {
    id: '2',
    title: 'Configurar banco de dados',
    description: 'PostgreSQL',
    completed: true,
    starred: false,
    listId: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    order: 1,
  },
  {
    id: '3',
    title: 'Criar API REST',
    description: 'Endpoints principais',
    completed: false,
    starred: false,
    listId: '1',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    dueDate: new Date('2024-01-30'),
    order: 2,
  },
  {
    id: '4',
    title: 'Implementar testes',
    description: 'Unit e integration',
    completed: false,
    starred: true,
    listId: '1',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    starredAt: new Date('2024-01-17'),
    order: 3,
  },
  {
    id: '5',
    title: 'Documentar endpoints',
    description: 'Swagger/OpenAPI',
    completed: true,
    starred: false,
    listId: '1',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-12'),
    order: 4,
  },
  {
    id: '6',
    title: 'Reunião de planejamento',
    description: 'Sprint planning',
    completed: false,
    starred: true,
    listId: '2',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    dueDate: new Date('2024-01-20'),
    dueTime: '14:00',
    starredAt: new Date('2024-01-19'),
    order: 0,
  },
  {
    id: '7',
    title: 'Code review',
    description: 'Revisar PRs do time',
    completed: false,
    starred: false,
    listId: '2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    order: 1,
  },
  {
    id: '8',
    title: 'Comprar presentes',
    description: 'Aniversário da mãe',
    completed: false,
    starred: true,
    listId: '3',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
    dueDate: new Date('2024-01-25'),
    dueTime: '10:30',
    starredAt: new Date('2024-01-22'),
    order: 0,
  },
  {
    id: '9',
    title: 'Agendar consulta',
    description: 'Checkup anual',
    completed: false,
    starred: false,
    listId: '3',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    order: 1,
  },
];

export class MockTaskRepository implements ITaskRepository {
  private tasks: Task[] = [...mockTasks];

  async getAll(): Promise<Task[]> {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id: string): Promise<Task | null> {
    await this.delay();
    return this.tasks.find((task) => task.id === id) || null;
  }

  async create(task: Task): Promise<Task> {
    await this.delay();
    this.tasks.push(task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    await this.delay();
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    return task;
  }

  async delete(id: string): Promise<void> {
    await this.delay();
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async deleteByFilter(predicate: (task: Task) => boolean): Promise<void> {
    await this.delay();
    this.tasks = this.tasks.filter((task) => !predicate(task));
  }

  async updateByFilter(predicate: (task: Task) => boolean, updates: Partial<Task>): Promise<void> {
    await this.delay();
    this.tasks = this.tasks.map((task) => 
      predicate(task) ? { ...task, ...updates, updatedAt: new Date() } : task
    );
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
}
