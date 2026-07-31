import { useCallback, useEffect, useMemo } from 'react';
import { AppLayout } from './app/layout';
import { TopBar } from './app/layout';
import { Sidebar } from './app/layout';
import { MainContent } from './modules/task/presentation/layout';
import { TaskCard, TaskCardHeader, AddTaskRow } from './modules/task/presentation/components/TaskCard';
import { TaskList } from './modules/task/presentation/components/TaskList';
import { CompletedSection } from './modules/task/presentation/components/CompletedSection';
import { LoadingState } from './modules/task/presentation/components/LoadingState';
import { EmptyState } from './modules/task/presentation/components/EmptyState';
import { ErrorState } from './modules/task/presentation/components/ErrorState';
import { useTasks } from './modules/task/presentation/hooks/useTasks';
import { useTaskLists } from './modules/task/presentation/hooks/useTaskLists';
import type { SortOption } from './modules/task/presentation/viewmodels/TasksViewModel';

function App() {
  const { 
    tasks, loading, error, sortOption,
    createTask, updateTask, deleteTask, toggleCompleted, toggleStarred, 
    refresh, setListFilter, sortTasks, deleteCompletedTasks, markOldTasksAsCompleted 
  } = useTasks();
  const { taskLists, activeListId, setActiveList, updateTaskList, deleteTaskList } = useTaskLists();

  const pendingTasks = useMemo(() => tasks.filter((t) => !t.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed), [tasks]);

  const handleUpdateTitle = useCallback(
    (id: string, title: string) => updateTask(id, { title }),
    [updateTask]
  );

  useEffect(() => {
    setListFilter(activeListId);
  }, [activeListId, setListFilter]);

  const handleAddTask = useCallback(
    (title: string) => {
      const listId = activeListId || taskLists[0]?.id || '1';
      createTask(title, undefined, listId);
    },
    [activeListId, taskLists, createTask]
  );

  const handleSort = useCallback(
    (by: SortOption) => {
      sortTasks(by);
    },
    [sortTasks]
  );

  const handleRename = useCallback(
    (name: string) => {
      if (activeListId) {
        updateTaskList(activeListId, { name });
      }
    },
    [activeListId, updateTaskList]
  );

  const handleDelete = useCallback(
    () => {
      if (activeListId) {
        deleteTaskList(activeListId);
      }
    },
    [activeListId, deleteTaskList]
  );

  const handlePrint = useCallback(
    () => {
      window.print();
    },
    []
  );

  const activeList = taskLists.find((l) => l.id === activeListId);
  const isDefaultList = activeListId === taskLists[0]?.id;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <AppLayout sidebar={<Sidebar activeListId={activeListId} onSelectList={setActiveList} />}>
        <MainContent>
          <TaskCard>
            <TaskCardHeader 
              title={activeList?.name || 'Minhas tarefas'} 
              sortOption={sortOption}
              isDefaultList={isDefaultList}
              onSort={handleSort}
              onRename={handleRename}
              onDelete={handleDelete}
              onDeleteCompleted={deleteCompletedTasks}
              onMarkOldAsCompleted={markOldTasksAsCompleted}
              onPrint={handlePrint}
            />
            <AddTaskRow onAddTask={handleAddTask} />
            {loading && <LoadingState />}
            {error && <ErrorState message={error} onRetry={refresh} />}
            {!loading && !error && tasks.length === 0 && <EmptyState />}
            {!loading && !error && pendingTasks.length > 0 && (
              <TaskList
                tasks={pendingTasks}
                onToggleCompleted={toggleCompleted}
                onToggleStarred={toggleStarred}
                onUpdate={handleUpdateTitle}
                onDelete={deleteTask}
              />
            )}
            {!loading && !error && completedTasks.length > 0 && (
              <CompletedSection
                tasks={completedTasks}
                onToggleCompleted={toggleCompleted}
                onToggleStarred={toggleStarred}
                onUpdate={handleUpdateTitle}
                onDelete={deleteTask}
              />
            )}
          </TaskCard>
        </MainContent>
      </AppLayout>
    </div>
  );
}

export default App;
