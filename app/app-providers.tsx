'use client';
import { ThemeUIProvider } from 'theme-ui';
import { theme } from './theme';
import RoundsContextProvider from './rounds-context';

export default function AppProviders({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <RoundsContextProvider>
        <ThemeUIProvider theme={theme}>
          {children}
        </ThemeUIProvider>
      </RoundsContextProvider>
    )
  }