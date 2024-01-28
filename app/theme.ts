import type { Theme } from 'theme-ui';

export const theme: Theme = {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace',
    },
    colors: {
        text: '#333',
        background: '#fff',
        primary: '#26a283',
        secondary: '#13e5d5',
        accent: '#0f1c3a',
        highlight: '#cce5ff',
        muted: '#f0f0f0', 
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
    cards: {
      primary: {
        borderRadius: '3',
        boxShadow: '0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)',
        padding: 3
      },
      clickable: {
        borderRadius: '3',
        boxShadow: '0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)',
        padding: 3,
        cursor: 'pointer'
      }
    }
}