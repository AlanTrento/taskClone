import { memo } from 'react';
import { Alert, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { styles } from './ErrorState.styles';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = memo(function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div style={styles.container}>
      <Alert
        message="Erro"
        description={message}
        type="error"
        showIcon
        action={
          onRetry && (
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={onRetry}
              style={styles.retryButton}
            >
              Tentar novamente
            </Button>
          )
        }
        style={styles.alert}
      />
    </div>
  );
});
