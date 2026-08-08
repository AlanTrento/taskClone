import { memo } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { styles } from './EmptyState.styles';

export const EmptyState = memo(function EmptyState() {
  return (
    <div style={styles.container}>
      <CheckSquareOutlined style={styles.icon} />
      <span style={styles.title}>Nenhuma tarefa ainda</span>
      <span style={styles.subtitle}>
        Adicione sua primeira tarefa usando o campo acima
      </span>
    </div>
  );
});
