import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boehringer Ingelheim Pairs Game',
  description: 'Boehringer Ingelheim Memory Pair Game',
  viewport: 'width=device-width,user-scalable=no'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="preload" as="image" href="/icons/01.png" />
      <link rel="preload" as="image" href="/icons/02.png" />
      <link rel="preload" as="image" href="/icons/03.png" />
      <link rel="preload" as="image" href="/icons/04.png" />
      <link rel="preload" as="image" href="/icons/05.png" />
      <link rel="preload" as="image" href="/icons/06.png" />
      <link rel="preload" as="image" href="/icons/07.png" />
      <link rel="preload" as="image" href="/icons/08.png" />
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
