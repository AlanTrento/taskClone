import type { TaskList } from '../../domain/entities/TaskList';
import type { GetTaskListsUseCase } from '../../application/usecases/GetTaskListsUseCase';
import type { CreateTaskListUseCase } from '../../application/usecases/CreateTaskListUseCase';
import type { UpdateTaskListUseCase } from '../../application/usecases/UpdateTaskListUseCase';
import type { DeleteTaskListUseCase } from '../../application/usecases/DeleteTaskListUseCase';

export class TaskListsViewModel {
  private getTaskListsUseCase: GetTaskListsUseCase;
  private createTaskListUseCase: CreateTaskListUseCase;
  private updateTaskListUseCase: UpdateTaskListUseCase;
  private deleteTaskListUseCase: DeleteTaskListUseCase;

  private _taskLists: TaskList[] = [];
  private _activeListId: string | null = null;
  private _loading = false;
  private _error: string | null = null;

  private _onTaskListsChanged: ((taskLists: TaskList[]) => void) | null = null;
  private _onActiveListChanged: ((listId: string | null) => void) | null = null;
  private _onLoadingChanged: ((loading: boolean) => void) | null = null;
  private _onErrorChanged: ((error: string | null) => void) | null = null;
  private _onSuccess: ((message: string) => void) | null = null;

  constructor(
    getTaskListsUseCase: GetTaskListsUseCase,
    createTaskListUseCase: CreateTaskListUseCase,
    updateTaskListUseCase: UpdateTaskListUseCase,
    deleteTaskListUseCase: DeleteTaskListUseCase,
  ) {
    this.getTaskListsUseCase = getTaskListsUseCase;
    this.createTaskListUseCase = createTaskListUseCase;
    this.updateTaskListUseCase = updateTaskListUseCase;
    this.deleteTaskListUseCase = deleteTaskListUseCase;
  }

  get taskLists(): TaskList[] {
    return this._taskLists;
  }

  get activeListId(): string | null {
    return this._activeListId;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  onTaskListsChanged(callback: (taskLists: TaskList[]) => void): void {
    this._onTaskListsChanged = callback;
  }

  onActiveListChanged(callback: (listId: string | null) => void): void {
    this._onActiveListChanged = callback;
  }

  onLoadingChanged(callback: (loading: boolean) => void): void {
    this._onLoadingChanged = callback;
  }

  onErrorChanged(callback: (error: string | null) => void): void {
    this._onErrorChanged = callback;
  }

  onSuccess(callback: (message: string) => void): void {
    this._onSuccess = callback;
  }

  async loadTaskLists(): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      const lists = await this.getTaskListsUseCase.execute();
      this._taskLists = lists.sort((a, b) => a.order - b.order);
      this._onTaskListsChanged?.(this._taskLists);

      if (this._taskLists.length > 0 && !this._activeListId) {
        this.setActiveList(this._taskLists[0].id);
      }
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao carregar listas');
    } finally {
      this.setLoading(false);
    }
  }

  setActiveList(listId: string | null): void {
    this._activeListId = listId;
    this._onActiveListChanged?.(listId);
  }

  getActiveList(): TaskList | undefined {
    return this._taskLists.find((list) => list.id === this._activeListId);
  }

  async createTaskList(name: string, color: string): Promise<void> {
    this.setError(null);

    try {
      const newList = await this.createTaskListUseCase.execute({ name, color });
      this._taskLists = [...this._taskLists, newList].sort((a, b) => a.order - b.order);
      this._onTaskListsChanged?.(this._taskLists);
      this.setActiveList(newList.id);
      this._onSuccess?.('Lista criada');
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao criar lista');
    }
  }

  async updateTaskList(id: string, updates: Partial<Pick<TaskList, 'name' | 'color'>>): Promise<void> {
    this.setError(null);

    try {
      const updated = await this.updateTaskListUseCase.execute({ id, ...updates });
      this._taskLists = this._taskLists.map((list) => (list.id === id ? updated : list));
      this._onTaskListsChanged?.(this._taskLists);
      this._onSuccess?.('Lista atualizada');
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao atualizar lista');
    }
  }

  async deleteTaskList(id: string): Promise<void> {
    this.setError(null);

    try {
      await this.deleteTaskListUseCase.execute(id);
      this._taskLists = this._taskLists.filter((list) => list.id !== id);
      this._onTaskListsChanged?.(this._taskLists);

      if (this._activeListId === id) {
        const next = this._taskLists.length > 0 ? this._taskLists[0].id : null;
        this.setActiveList(next);
      }
      this._onSuccess?.('Lista excluída');
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao excluir lista');
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
