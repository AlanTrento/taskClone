import type { ReactNode } from 'react';
import { Drawer } from 'antd';
import { useIsMobile } from '../../shared/hooks/useMediaQuery';
import { styles } from './AppLayout.styles';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
}

export function AppLayout({ sidebar, children, drawerOpen, onDrawerClose }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div style={styles.container}>
      {!isMobile && sidebar}
      {isMobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={onDrawerClose}
          width={280}
          styles={{ body: styles.drawerBody }}
          closable={false}
        >
          {sidebar}
        </Drawer>
      )}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}
