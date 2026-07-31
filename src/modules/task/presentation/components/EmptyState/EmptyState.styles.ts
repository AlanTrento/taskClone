import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  description: {
    color: colors.textSecondary,
  },
};
