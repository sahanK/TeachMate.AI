import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TeachMate.AI',
  description: 'Revolutionize your teaching approach using AI-generated aids',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' flex min-h-screen flex-col items-center px-24 py-12 bg-gray-100'}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
