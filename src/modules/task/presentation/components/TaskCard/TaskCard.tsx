import type { ReactNode } from 'react';
import { memo } from 'react';
import { useIsTablet } from '../../../../../shared/hooks/useMediaQuery';
import { styles } from './TaskCard.styles';

interface TaskCardProps {
  children: ReactNode;
}

export const TaskCard = memo(function TaskCard({ children }: TaskCardProps) {
  const isTablet = useIsTablet();

  return (
    <div
      className="task-card"
      style={{
        ...styles.container,
        width: isTablet ? '100%' : 680,
        minWidth: isTablet ? '100%' : 620,
        maxWidth: isTablet ? '100%' : 720,
      }}
    >
      {children}
    </div>
  );
});
