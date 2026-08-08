import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';
import { colors } from '../../shared/styles/colors';

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.primaryBlue,
    colorBgContainer: colors.backgroundContainer,
    colorBgElevated: colors.backgroundElevated,
    colorBorder: colors.border,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorSuccess: colors.successGreen,
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: colors.primaryBlue,
      algorithm: true,
    },
    Drawer: {
      colorBgElevated: colors.backgroundElevated,
      colorText: colors.textPrimary,
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: colors.textPrimary,
      colorItemTextSelected: colors.textWhite,
      colorItemBgSelected: colors.primaryBlueDark,
      colorItemBgHover: colors.backgroundLight,
      colorSubMenuItemBg: colors.backgroundElevated,
      colorItemTextDisabled: colors.textDisabled,
    },
    Modal: {
      contentBg: colors.backgroundElevated,
      headerBg: colors.backgroundElevated,
      titleColor: colors.textPrimary,
      colorText: colors.textPrimary,
      colorIcon: colors.textSecondary,
      colorIconHover: colors.textPrimary,
      borderRadiusLG: 8,
    },
    Dropdown: {
      colorBgElevated: colors.backgroundElevated,
      controlItemBgHover: colors.backgroundLight,
      controlItemBgActive: colors.backgroundLight,
    },
    Input: {
      colorBgContainer: colors.backgroundInput,
      colorBorder: colors.border,
      activeBorderColor: colors.textPrimary,
      hoverBorderColor: colors.textSecondary,
    },
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ConfigProvider theme={darkTheme}>
      {children}
    </ConfigProvider>
  );
}
