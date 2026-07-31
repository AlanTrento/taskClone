import { memo } from 'react';
import { Empty } from 'antd';
import { styles } from './EmptyState.styles';

export const EmptyState = memo(function EmptyState() {
  return (
    <div style={styles.container}>
      <Empty
        description={
          <span style={styles.description}>
            Nenhuma tarefa encontrada
          </span>
        }
      />
    </div>
  );
});
