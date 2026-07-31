import { memo, useState } from 'react';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { TaskList } from '../TaskList';
import { hoverStates } from '../../../../../shared/styles/states';
import { styles } from './CompletedSection.styles';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred?: boolean;
}

interface CompletedSectionProps {
  tasks: Task[];
  onToggleCompleted?: (id: string) => void;
  onToggleStarred?: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
}

export const CompletedSection = memo(function CompletedSection({
  tasks,
  onToggleCompleted,
  onToggleStarred,
  onUpdate,
  onDelete,
}: CompletedSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (tasks.length === 0) return null;

  return (
    <div className="completed-section" style={styles.container}>
      <Button
        type="text"
        onClick={() => setIsExpanded(!isExpanded)}
        style={styles.expandButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = hoverStates.background;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {isExpanded ? <DownOutlined /> : <RightOutlined />}
        <span style={styles.label}>
          Concluídas ({tasks.length})
        </span>
      </Button>
      {isExpanded && (
        <div style={styles.expandedContent}>
          <TaskList
            tasks={tasks}
            onToggleCompleted={onToggleCompleted}
            onToggleStarred={onToggleStarred}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
});
