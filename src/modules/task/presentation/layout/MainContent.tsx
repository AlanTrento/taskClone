import type { ReactNode } from 'react';
import { styles } from './MainContent.styles';

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
}
