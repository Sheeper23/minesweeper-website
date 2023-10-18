import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minesweeper',
  description: 'Minesweeper with React and Next',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[100dvh] bg-neutral-500 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
