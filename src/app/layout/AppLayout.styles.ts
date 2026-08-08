import type { CSSProperties } from 'react';
import { colors } from '../../shared/styles/colors';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    width: '100vw',
    backgroundColor: colors.backgroundDark,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  drawerBody: {
    padding: 0,
    backgroundColor: colors.backgroundDark,
  },
};
