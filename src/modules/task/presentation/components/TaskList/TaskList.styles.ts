import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { spacing } from '../../../../../shared/styles/spacing';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  dragOver: {
    backgroundColor: colors.primaryBlueDark,
    borderRadius: 8,
  },
  taskItemWrapper: {
    borderRadius: 8,
    opacity: 1,
  },
  taskItemWrapperDragging: {
    borderRadius: 8,
    opacity: 0.5,
  },
};
