'use client';

import { ThemeUIProvider } from 'theme-ui';
import { theme } from './theme';


export default function AppProviders({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <ThemeUIProvider theme={theme}>
        {children}
      </ThemeUIProvider>
    )
  }