import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '32px 32px',
    overflowY: 'auto',
    height: 'calc(100vh - 64px)',
  },
};
