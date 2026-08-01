import { useState, useEffect, useCallback, useRef } from 'react';
import type { Task } from '../../domain/entities/Task';
import { TasksViewModel, type SortOption } from '../viewmodels/TasksViewModel';
import { Container } from '../../application/di/Container';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [starredCount, setStarredCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('order');

  const viewModelRef = useRef<TasksViewModel | null>(null);

  if (!viewModelRef.current) {
    viewModelRef.current = new TasksViewModel(
      Container.getGetTasksUseCase(),
      Container.getCreateTaskUseCase(),
      Container.getUpdateTaskUseCase(),
      Container.getDeleteTaskUseCase(),
      Container.getDeleteCompletedTasksUseCase(),
      Container.getMarkOldTasksAsCompletedUseCase(),
    );
  }

  useEffect(() => {
    const viewModel = viewModelRef.current!;

    viewModel.onTasksChanged((updatedTasks) => {
      setTasks(updatedTasks);
      setStarredCount(viewModel.starredCount);
    });
    viewModel.onLoadingChanged(setLoading);
    viewModel.onErrorChanged(setError);

    viewModel.loadTasks();
  }, []);

  const createTask = useCallback(async (title: string, description?: string, listId?: string) => {
    await viewModelRef.current?.createTask(title, description, listId);
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'completed' | 'starred' | 'starredAt' | 'dueDate' | 'dueTime' | 'order'>>) => {
    await viewModelRef.current?.updateTask(id, updates);
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await viewModelRef.current?.deleteTask(id);
  }, []);

  const toggleCompleted = useCallback(async (id: string) => {
    await viewModelRef.current?.toggleCompleted(id);
  }, []);

  const toggleStarred = useCallback(async (id: string) => {
    await viewModelRef.current?.toggleStarred(id);
  }, []);

  const refresh = useCallback(async () => {
    await viewModelRef.current?.loadTasks();
  }, []);

  const setListFilter = useCallback((listId: string | null) => {
    viewModelRef.current?.setListFilter(listId);
  }, []);

  const sortTasks = useCallback((by: SortOption) => {
    viewModelRef.current?.sortTasks(by);
    setSortOption(by);
  }, []);

  const reorderTask = useCallback((taskId: string, targetIndex: number) => {
    viewModelRef.current?.reorderTask(taskId, targetIndex);
  }, []);

  const deleteCompletedTasks = useCallback(async () => {
    await viewModelRef.current?.deleteCompletedTasks();
  }, []);

  const markOldTasksAsCompleted = useCallback(async () => {
    await viewModelRef.current?.markOldTasksAsCompleted();
  }, []);

  return {
    tasks,
    starredCount,
    loading,
    error,
    sortOption,
    createTask,
    updateTask,
    deleteTask,
    toggleCompleted,
    toggleStarred,
    refresh,
    setListFilter,
    sortTasks,
    reorderTask,
    deleteCompletedTasks,
    markOldTasksAsCompleted,
  };
}
