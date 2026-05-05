import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Essilor Memory Game',
  description: 'Essilor Memory Pairs Game',
  viewport: 'width=device-width,user-scalable=no'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="preload" as="image" href="/v3/background-solo.png" />
      <link rel="preload" as="image" href="/v3/logo-essilor-01.png" />
      <link rel="preload" as="image" href="/v3/icons/1/REVERSO.png" />
      <link rel="preload" as="image" href="/v3/icons/1/01.png" />
      <link rel="preload" as="image" href="/v3/icons/1/02.png" />
      <link rel="preload" as="image" href="/v3/icons/1/03.png" />
      <link rel="preload" as="image" href="/v3/icons/1/04.png" />
      <link rel="preload" as="image" href="/v3/icons/1/05.png" />
      <link rel="preload" as="image" href="/v3/icons/1/06.png" />
      <link rel="preload" as="image" href="/v3/icons/1/07.png" />
      <link rel="preload" as="image" href="/v3/icons/1/08.png" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
