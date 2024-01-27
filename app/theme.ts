import type { Theme } from 'theme-ui';

export const theme: Theme = {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace',
    },
        colors: {
        text: '#000',
        background: '#fff',
        primary: '#33e',
    },
    buttons: {
      primary: {
        color: 'background',
        bg: 'primary',
        '&:hover': {
          bg: 'text',
        }
      },
      secondary: {
        color: 'background',
        bg: 'secondary',
      },
    },
}