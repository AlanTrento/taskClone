import type { Task } from '../../domain/entities/Task';
import { createTask } from '../../domain/entities/Task';
import type { GetTasksUseCase } from '../../application/usecases/GetTasksUseCase';
import type { CreateTaskUseCase } from '../../application/usecases/CreateTaskUseCase';
import type { UpdateTaskUseCase } from '../../application/usecases/UpdateTaskUseCase';
import type { DeleteTaskUseCase } from '../../application/usecases/DeleteTaskUseCase';
import type { DeleteCompletedTasksUseCase } from '../../application/usecases/DeleteCompletedTasksUseCase';
import type { MarkOldTasksAsCompletedUseCase } from '../../application/usecases/MarkOldTasksAsCompletedUseCase';

export type SortOption = 'order' | 'date' | 'dueDate' | 'starred' | 'title';

export class TasksViewModel {
  private getTasksUseCase: GetTasksUseCase;
  private createTaskUseCase: CreateTaskUseCase;
  private updateTaskUseCase: UpdateTaskUseCase;
  private deleteTaskUseCase: DeleteTaskUseCase;
  private deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase;
  private markOldTasksAsCompletedUseCase: MarkOldTasksAsCompletedUseCase;

  private _tasks: Task[] = [];
  private _allTasks: Task[] = [];
  private _listFilter: string | null = null;
  private _sortOption: SortOption = 'order';
  private _loading = false;
  private _error: string | null = null;

  private _onTasksChanged: ((tasks: Task[]) => void) | null = null;
  private _onLoadingChanged: ((loading: boolean) => void) | null = null;
  private _onErrorChanged: ((error: string | null) => void) | null = null;

  constructor(
    getTasksUseCase: GetTasksUseCase,
    createTaskUseCase: CreateTaskUseCase,
    updateTaskUseCase: UpdateTaskUseCase,
    deleteTaskUseCase: DeleteTaskUseCase,
    deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase,
    markOldTasksAsCompletedUseCase: MarkOldTasksAsCompletedUseCase,
  ) {
    this.getTasksUseCase = getTasksUseCase;
    this.createTaskUseCase = createTaskUseCase;
    this.updateTaskUseCase = updateTaskUseCase;
    this.deleteTaskUseCase = deleteTaskUseCase;
    this.deleteCompletedTasksUseCase = deleteCompletedTasksUseCase;
    this.markOldTasksAsCompletedUseCase = markOldTasksAsCompletedUseCase;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get sortOption(): SortOption {
    return this._sortOption;
  }

  onTasksChanged(callback: (tasks: Task[]) => void): void {
    this._onTasksChanged = callback;
  }

  onLoadingChanged(callback: (loading: boolean) => void): void {
    this._onLoadingChanged = callback;
  }

  onErrorChanged(callback: (error: string | null) => void): void {
    this._onErrorChanged = callback;
  }

  async loadTasks(): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      this._allTasks = await this.getTasksUseCase.execute();
      this.applyFilter();
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao carregar tarefas');
    } finally {
      this.setLoading(false);
    }
  }

  setListFilter(listId: string | null): void {
    this._listFilter = listId;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this._listFilter) {
      this._tasks = this._allTasks.filter((t) => t.listId === this._listFilter);
    } else {
      this._tasks = [...this._allTasks];
    }
    this._onTasksChanged?.(this._tasks);
  }

  async createTask(title: string, description?: string, listId?: string): Promise<void> {
    this.setError(null);

    const newTask = createTask({
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      starred: false,
      listId: listId || '1',
    });

    this._tasks = [newTask, ...this._tasks];
    this._onTasksChanged?.(this._tasks);

    try {
      await this.createTaskUseCase.execute({
        title,
        description,
        listId: listId || '1',
      });
    } catch (err) {
      this._tasks = this._tasks.filter((t) => t.id !== newTask.id);
      this._onTasksChanged?.(this._tasks);
      this.setError(err instanceof Error ? err.message : 'Erro ao criar tarefa');
    }
  }

  async updateTask(id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'completed' | 'starred'>>): Promise<void> {
    this.setError(null);

    try {
      const updatedTask = await this.updateTaskUseCase.execute({ id, ...updates });
      this._tasks = this._tasks.map((task) => (task.id === id ? updatedTask : task));
      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa');
    }
  }

  async deleteTask(id: string): Promise<void> {
    this.setError(null);

    try {
      await this.deleteTaskUseCase.execute(id);
      this._tasks = this._tasks.filter((task) => task.id !== id);
      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao excluir tarefa');
    }
  }

  async toggleCompleted(id: string): Promise<void> {
    const task = this._tasks.find((t) => t.id === id);
    if (task) {
      await this.updateTask(id, { completed: !task.completed });
    }
  }

  async toggleStarred(id: string): Promise<void> {
    const task = this._tasks.find((t) => t.id === id);
    if (task) {
      await this.updateTask(id, { starred: !task.starred });
    }
  }

  sortTasks(by: SortOption): void {
    this._sortOption = by;
    const sorted = [...this._tasks];
    
    switch (by) {
      case 'order':
        // Mantém a ordem original (do array)
        break;
      case 'date':
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'dueDate': {
        const maxDate = new Date('9999-12-31');
        sorted.sort((a, b) => 
          (a.dueDate ?? maxDate).getTime() - (b.dueDate ?? maxDate).getTime()
        );
        break;
      }
      case 'starred':
        sorted.sort((a, b) => 
          (b.starredAt?.getTime() ?? 0) - (a.starredAt?.getTime() ?? 0)
        );
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
        break;
    }
    
    this._tasks = sorted;
    this._onTasksChanged?.(this._tasks);
  }

  async deleteCompletedTasks(): Promise<void> {
    this.setError(null);

    try {
      const listId = this._listFilter || '1';
      await this.deleteCompletedTasksUseCase.execute(listId);
      this._tasks = this._tasks.filter((t) => !t.completed);
      this._allTasks = this._allTasks.filter((t) => !t.completed);
      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao excluir tarefas concluídas');
    }
  }

  async markOldTasksAsCompleted(): Promise<void> {
    this.setError(null);

    try {
      const listId = this._listFilter || '1';
      await this.markOldTasksAsCompletedUseCase.execute(listId);
      // Recarrega para refletir mudanças
      await this.loadTasks();
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao marcar tarefas antigas');
    }
  }

  private setLoading(loading: boolean): void {
    this._loading = loading;
    this._onLoadingChanged?.(loading);
  }

  private setError(error: string | null): void {
    this._error = error;
    this._onErrorChanged?.(error);
  }
}
