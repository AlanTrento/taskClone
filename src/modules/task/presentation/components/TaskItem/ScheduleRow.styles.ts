import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { spacing, borderRadius } from '../../../../../shared/styles/spacing';
import { typography } from '../../../../../shared/styles/typography';

export const styles: Record<string, CSSProperties> = {
  /* ── Row de botões externos ──────────────────────────────── */
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm}px 0`,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs}px ${spacing.sm}px`,
    borderRadius: borderRadius.sm,
    border: `1px solid ${colors.border}`,
    backgroundColor: 'transparent',
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
  },
  buttonActive: {
    backgroundColor: colors.primaryBlueDark,
    borderColor: colors.primaryBlue,
    color: colors.textWhite,
  },

  /* ── Modal content ─────────────────────────────────────────── */
  modalContent: {
    width: 360,
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },

  /* ── Footer ──────────────────────────────────────────────── */
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    padding: `${spacing.sm}px ${spacing.lg}`,
    borderTop: `1px solid ${colors.border}`,
  },
  cancelButton: {
    padding: `${spacing.sm}px ${spacing.lg}`,
    borderRadius: borderRadius.sm,
    border: `1px solid ${colors.border}`,
    backgroundColor: 'transparent',
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  confirmButton: {
    padding: `${spacing.sm}px ${spacing.lg}`,
    borderRadius: borderRadius.sm,
    border: 'none',
    backgroundColor: colors.primaryBlue,
    color: colors.backgroundDarkest,
    fontSize: typography.body.fontSize,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
};
