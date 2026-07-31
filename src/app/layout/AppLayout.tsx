import type { ReactNode } from 'react';
import { useIsMobile } from '../../shared/hooks/useMediaQuery';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      width: '100vw',
      backgroundColor: '#202124',
      overflow: 'hidden',
    }}>
      {!isMobile && sidebar}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {children}
      </main>
    </div>
  );
}
