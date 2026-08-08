import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { styles } from './App.styles';

function App() {
  const { 
    tasks, starredCount, loading, error, sortOption,
    createTask, updateTask, deleteTask, toggleCompleted, toggleStarred, 
    refresh, setListFilter, sortTasks, reorderTask,
    deleteCompletedTasks, deleteTasksByListId, markOldTasksAsCompleted 
  } = useTasks();
  const { taskLists, activeListId, setActiveList, createTaskList, updateTaskList, deleteTaskList } = useTaskLists();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const pendingTasks = useMemo(() => tasks.filter((t) => !t.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed), [tasks]);

  const handleUpdateTitle = useCallback(
    (id: string, title: string) => updateTask(id, { title }),
    [updateTask]
  );

  const handleUpdateDetails = useCallback(
    (id: string, description: string) => updateTask(id, { description }),
    [updateTask]
  );

  const handleSetDateTime = useCallback(
    (id: string, dueDate: Date, dueTime: string) => updateTask(id, { dueDate, dueTime }),
    [updateTask]
  );

  const handleReorder = useCallback(
    (taskId: string, targetIndex: number) => reorderTask(taskId, targetIndex),
    [reorderTask]
  );

  useEffect(() => {
    setListFilter(activeListId);
  }, [activeListId, setListFilter]);

  const handleAddTask = useCallback(
    (title: string) => {
      // Quando na view "Com estrela", criar na primeira lista real
      const listId = activeListId === 'starred'
        ? taskLists[0]?.id
        : activeListId ?? taskLists[0]?.id;
      if (!listId) return;
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
      if (activeListId && activeListId !== 'starred') {
        updateTaskList(activeListId, { name });
      }
    },
    [activeListId, updateTaskList]
  );

  const handleDelete = useCallback(
    async (listId: string) => {
      await deleteTasksByListId(listId);
      await deleteTaskList(listId);
    },
    [deleteTasksByListId, deleteTaskList]
  );

  const handleDeleteActiveList = useCallback(
    async () => {
      if (activeListId && activeListId !== 'starred') {
        await handleDelete(activeListId);
      }
    },
    [activeListId, handleDelete]
  );

  const handlePrint = useCallback(
    () => {
      window.print();
    },
    []
  );

  const activeList = taskLists.find((l) => l.id === activeListId);
  const isStarredView = activeListId === 'starred';

  const headerTitle = isStarredView
    ? 'Com estrela'
    : activeList?.name || 'Minhas tarefas';

  return (
    <div style={styles.rootContainer}>
      <TopBar onMenuClick={() => setDrawerOpen(true)} />
      <AppLayout 
        drawerOpen={drawerOpen}
        onDrawerClose={() => setDrawerOpen(false)}
        sidebar={
          <Sidebar
            activeListId={activeListId}
            starredCount={starredCount}
            taskLists={taskLists}
            onSelectList={(id) => {
              setActiveList(id);
              setDrawerOpen(false);
            }}
          onCreateList={createTaskList}
          onConfirmDelete={handleDelete}
        />
      }>
        <MainContent>
          <TaskCard>
            <TaskCardHeader 
              title={headerTitle}
              listName={headerTitle}
              sortOption={sortOption}
              onSort={handleSort}
              onRename={handleRename}
              onDelete={handleDeleteActiveList}
              onDeleteCompleted={deleteCompletedTasks}
              onMarkOldAsCompleted={markOldTasksAsCompleted}
              onPrint={handlePrint}
            />
            {activeListId && activeListId !== 'starred' && <AddTaskRow onAddTask={handleAddTask} />}
            {loading && <LoadingState />}
            {error && <ErrorState message={error} onRetry={refresh} />}
            {!loading && !error && tasks.length === 0 && <EmptyState />}
            {!loading && !error && pendingTasks.length > 0 && (
              <TaskList
                tasks={pendingTasks}
                onToggleCompleted={toggleCompleted}
                onToggleStarred={toggleStarred}
                onUpdate={handleUpdateTitle}
                onUpdateDetails={handleUpdateDetails}
                onSetDateTime={handleSetDateTime}
                onDelete={deleteTask}
                onReorder={handleReorder}
              />
            )}
            {!loading && !error && completedTasks.length > 0 && (
              <CompletedSection
                tasks={completedTasks}
                onToggleCompleted={toggleCompleted}
                onToggleStarred={toggleStarred}
                onUpdate={handleUpdateTitle}
                onUpdateDetails={handleUpdateDetails}
                onSetDateTime={handleSetDateTime}
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
