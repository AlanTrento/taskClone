import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  retryButton: {
    color: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  alert: {
    maxWidth: 400,
    backgroundColor: colors.backgroundContainer,
    borderColor: colors.border,
  },
};
