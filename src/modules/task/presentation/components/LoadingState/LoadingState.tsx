import { memo } from 'react';
import { Spin } from 'antd';
import { styles } from './LoadingState.styles';

export const LoadingState = memo(function LoadingState() {
  return (
    <div style={styles.container}>
      <Spin size="large" />
    </div>
  );
});
