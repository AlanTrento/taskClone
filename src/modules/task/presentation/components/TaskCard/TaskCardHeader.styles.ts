import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { typography } from '../../../../../shared/styles/typography';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.textWhite,
    margin: 0,
  },
};
