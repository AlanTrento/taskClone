import { memo } from 'react';
import { ListMenu } from './ListMenu';
import type { SortOption } from '../../viewmodels/TasksViewModel';
import { styles } from './TaskCardHeader.styles';

interface TaskCardHeaderProps {
  title?: string;
  listName?: string;
  sortOption?: SortOption;
  onSort?: (by: SortOption) => void;
  onRename?: (name: string) => void;
  onDelete?: () => void;
  onDeleteCompleted?: () => void;
  onMarkOldAsCompleted?: () => void;
  onPrint?: () => void;
}

export const TaskCardHeader = memo(function TaskCardHeader({
  title = 'Minhas tarefas',
  listName,
  sortOption = 'order',
  onSort,
  onRename,
  onDelete,
  onDeleteCompleted,
  onMarkOldAsCompleted,
  onPrint,
}: TaskCardHeaderProps) {
  return (
    <div className="task-card-header" style={styles.container}>
      <h1 style={styles.title}>
        {title}
      </h1>
      {onSort && onRename && onDelete && onDeleteCompleted && onMarkOldAsCompleted && onPrint && (
        <ListMenu
          listName={listName}
          sortOption={sortOption}
          onSort={onSort}
          onRename={onRename}
          onDelete={onDelete}
          onDeleteCompleted={onDeleteCompleted}
          onMarkOldAsCompleted={onMarkOldAsCompleted}
          onPrint={onPrint}
        />
      )}
    </div>
  );
});
