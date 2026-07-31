import { useState, useEffect, useCallback, useRef } from 'react';
import type { TaskList } from '../../domain/entities/TaskList';
import { TaskListsViewModel } from '../viewmodels/TaskListsViewModel';
import { Container } from '../../application/di/Container';

export function useTaskLists() {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const viewModelRef = useRef<TaskListsViewModel | null>(null);

  if (!viewModelRef.current) {
    viewModelRef.current = new TaskListsViewModel(
      Container.getGetTaskListsUseCase(),
      Container.getCreateTaskListUseCase(),
      Container.getUpdateTaskListUseCase(),
      Container.getDeleteTaskListUseCase(),
    );
  }

  useEffect(() => {
    const viewModel = viewModelRef.current!;

    viewModel.onTaskListsChanged(setTaskLists);
    viewModel.onActiveListChanged(setActiveListId);
    viewModel.onLoadingChanged(setLoading);
    viewModel.onErrorChanged(setError);

    viewModel.loadTaskLists();
  }, []);

  const setActiveList = useCallback((listId: string | null) => {
    viewModelRef.current?.setActiveList(listId);
  }, []);

  const getActiveList = useCallback(() => {
    return viewModelRef.current?.getActiveList();
  }, []);

  const createTaskList = useCallback(async (name: string, color: string) => {
    await viewModelRef.current?.createTaskList(name, color);
  }, []);

  const updateTaskList = useCallback(async (id: string, updates: Partial<Pick<TaskList, 'name' | 'color'>>) => {
    await viewModelRef.current?.updateTaskList(id, updates);
  }, []);

  const deleteTaskList = useCallback(async (id: string) => {
    await viewModelRef.current?.deleteTaskList(id);
  }, []);

  const refresh = useCallback(async () => {
    await viewModelRef.current?.loadTaskLists();
  }, []);

  return {
    taskLists,
    activeListId,
    loading,
    error,
    setActiveList,
    getActiveList,
    createTaskList,
    updateTaskList,
    deleteTaskList,
    refresh,
  };
}
