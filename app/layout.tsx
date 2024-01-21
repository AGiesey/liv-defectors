import type { Metadata } from 'next';
import './globals.scss'
import Sidebar from './sidebar';
import Header from './header';

export const metadata: Metadata = {
  title: 'Liv Defectors',
  description: 'Golf League, Est 2024. The Majestic Golf Course.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
