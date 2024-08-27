import React, { ReactNode } from "react";

import { ThemeProvider } from "@mui/material/styles";

import { theme } from 'styles/muiTheme';

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
