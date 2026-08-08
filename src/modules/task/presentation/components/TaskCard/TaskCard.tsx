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
        ...(isTablet ? styles.containerTablet : styles.containerDesktop),
      }}
    >
      {children}
    </div>
  );
});
