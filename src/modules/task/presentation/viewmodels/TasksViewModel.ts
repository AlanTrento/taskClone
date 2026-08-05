import type { Task } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import type { GetTasksUseCase } from '../../application/usecases/GetTasksUseCase';
import type { CreateTaskUseCase } from '../../application/usecases/CreateTaskUseCase';
import type { UpdateTaskUseCase } from '../../application/usecases/UpdateTaskUseCase';
import type { DeleteTaskUseCase } from '../../application/usecases/DeleteTaskUseCase';
import type { DeleteCompletedTasksUseCase } from '../../application/usecases/DeleteCompletedTasksUseCase';
import type { MarkOldTasksAsCompletedUseCase } from '../../application/usecases/MarkOldTasksAsCompletedUseCase';
import { notificationService } from '../../../../shared/services/NotificationService';

export type SortOption = 'order' | 'date' | 'dueDate' | 'starred' | 'title';

export class TasksViewModel {
  private taskRepository: ITaskRepository;
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
    taskRepository: ITaskRepository,
    getTasksUseCase: GetTasksUseCase,
    createTaskUseCase: CreateTaskUseCase,
    updateTaskUseCase: UpdateTaskUseCase,
    deleteTaskUseCase: DeleteTaskUseCase,
    deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase,
    markOldTasksAsCompletedUseCase: MarkOldTasksAsCompletedUseCase,
  ) {
    this.taskRepository = taskRepository;
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

  get starredCount(): number {
    return this._allTasks.filter((t) => t.starred && !t.completed).length;
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

  async loadTasks(filters?: { listId?: string; completed?: boolean; starred?: boolean }): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      this._allTasks = await this.getTasksUseCase.execute(filters);
      this.scheduleNotificationsForTasks();
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
    if (this._listFilter === 'starred') {
      this._tasks = this._allTasks.filter((t) => t.starred && !t.completed);
    } else if (this._listFilter) {
      this._tasks = this._allTasks.filter((t) => t.listId === this._listFilter);
    } else {
      this._tasks = [...this._allTasks];
    }
    this._onTasksChanged?.(this._tasks);
  }

  async createTask(title: string, description?: string, listId?: string): Promise<void> {
    this.setError(null);

    try {
      const newTask = await this.createTaskUseCase.execute({
        title,
        description,
        listId: listId || '1',
      });

      this._tasks = [newTask, ...this._tasks];
      this._allTasks = [...this._allTasks, newTask];
      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao criar tarefa');
    }
  }

  async updateTask(id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'completed' | 'starred' | 'starredAt' | 'dueDate' | 'dueTime' | 'order'>>): Promise<void> {
    this.setError(null);

    const previousTasks = [...this._tasks];
    const previousAllTasks = [...this._allTasks];

    const applyUpdates = (task: Task): Task =>
      task.id === id ? { ...task, ...updates, updatedAt: new Date() } as Task : task;

    this._tasks = this._tasks.map(applyUpdates);
    this._allTasks = this._allTasks.map(applyUpdates);
    this._onTasksChanged?.(this._tasks);

    try {
      const updatedTask = await this.updateTaskUseCase.execute(id, updates);
      this._tasks = this._tasks.map((task) => (task.id === id ? updatedTask : task));
      this._allTasks = this._allTasks.map((task) => (task.id === id ? updatedTask : task));

      if (updates.dueDate !== undefined || updates.dueTime !== undefined || updates.completed !== undefined) {
        this.handleNotificationSchedule(updatedTask);
      }

      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      if (err instanceof Error && err.message === 'Task not found') {
        return;
      }
      this._tasks = previousTasks;
      this._allTasks = previousAllTasks;
      this._onTasksChanged?.(this._tasks);
      this.setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa');
    }
  }

  async deleteTask(id: string): Promise<void> {
    this.setError(null);

    try {
      notificationService.cancel(id);
      await this.deleteTaskUseCase.execute(id);
      this._tasks = this._tasks.filter((task) => task.id !== id);
      this._allTasks = this._allTasks.filter((task) => task.id !== id);
      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao excluir tarefa');
    }
  }

  async deleteTasksByListId(listId: string): Promise<void> {
    this.setError(null);

    try {
      const tasksToDelete = this._allTasks.filter((t) => t.listId === listId);
      tasksToDelete.forEach((t) => notificationService.cancel(t.id));
      await this.deleteCompletedTasksUseCase.execute(listId);
      this._tasks = this._tasks.filter((t) => t.listId !== listId);
      this._allTasks = this._allTasks.filter((t) => t.listId !== listId);
      this._onTasksChanged?.(this._tasks);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao excluir tarefas da lista');
    }
  }

  async toggleCompleted(id: string): Promise<void> {
    const task = this._allTasks.find((t) => t.id === id);
    if (task) {
      await this.updateTask(id, { completed: !task.completed });
    }
  }

  async toggleStarred(id: string): Promise<void> {
    const task = this._allTasks.find((t) => t.id === id);
    if (task) {
      const newStarred = !task.starred;
      await this.updateTask(id, {
        starred: newStarred,
        starredAt: newStarred ? new Date() : undefined,
      });
    }
  }

  reorderTask(taskId: string, targetIndex: number): void {
    const taskIndex = this._allTasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const task = this._allTasks[taskIndex];
    const newAllTasks = [...this._allTasks];
    newAllTasks.splice(taskIndex, 1);
    newAllTasks.splice(targetIndex, 0, task);

    const reorderedTasks = newAllTasks.map((t, idx) => ({
      ...t,
      order: idx,
    }));

    this._allTasks = reorderedTasks;
    this.applyFilter();

    reorderedTasks.forEach((t) => {
      this.updateTaskUseCase.execute(t.id, { order: t.order });
    });
  }

  sortTasks(by: SortOption): void {
    this._sortOption = by;
    const sorted = [...this._tasks];
    
    switch (by) {
      case 'order':
        sorted.sort((a, b) => a.order - b.order);
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
      await this.loadTasks();
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao marcar tarefas antigas');
    }
  }

  private handleNotificationSchedule(task: Task): void {
    if (task.dueDate && !task.completed) {
      const notificationDate = new Date(task.dueDate);
      if (task.dueTime) {
        const [hours, minutes] = task.dueTime.split(':').map(Number);
        notificationDate.setHours(hours, minutes, 0, 0);
      }
      notificationService.schedule(task.id, task.title, notificationDate);
    } else {
      notificationService.cancel(task.id);
    }
  }

  private scheduleNotificationsForTasks(): void {
    this._allTasks.forEach((task) => {
      this.handleNotificationSchedule(task);
    });
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
