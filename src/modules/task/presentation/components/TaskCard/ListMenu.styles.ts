import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';

export const styles: Record<string, CSSProperties> = {
  trigger: {
    color: colors.textSecondary,
    backgroundColor: colors.backgroundLight,
    fontSize: 16,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    borderRadius: 6,
    border: 'none',
    transition: 'background-color 0.15s',
  },
  menu: {
    minWidth: 280,
    backgroundColor: colors.backgroundElevated,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
  },
  dropdownWrapper: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    overflow: 'hidden',
  },
  checkIcon: {
    color: colors.primaryBlue,
  },
  modalHeader: {
    backgroundColor: colors.backgroundElevated,
  },
  modalContent: {
    backgroundColor: colors.backgroundElevated,
  },
  modalBody: {
    color: colors.textPrimary,
  },
  okButton: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
    color: colors.backgroundDarkest,
  },
  cancelButton: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  deleteOkButton: {
    backgroundColor: colors.errorRed,
    borderColor: colors.errorRed,
    color: colors.textWhite,
  },
};
