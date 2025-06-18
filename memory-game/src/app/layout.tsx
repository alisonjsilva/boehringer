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
      <link rel="preload" as="image" href="/v2/icons/1/01.png" />
      <link rel="preload" as="image" href="/v2/icons/1/02.png" />
      <link rel="preload" as="image" href="/v2/icons/1/03.png" />
      <link rel="preload" as="image" href="/v2/icons/1/04.png" />
      <link rel="preload" as="image" href="/v2/icons/1/05.png" />
      <link rel="preload" as="image" href="/v2/icons/1/06.png" />
      <link rel="preload" as="image" href="/v2/icons/1/07.png" />
      <link rel="preload" as="image" href="/v2/icons/1/08.png" />

      <link rel="preload" as="image" href="/v2/icons/2/01.png" />
      <link rel="preload" as="image" href="/v2/icons/2/02.png" />
      <link rel="preload" as="image" href="/v2/icons/2/03.png" />
      <link rel="preload" as="image" href="/v2/icons/2/04.png" />
      <link rel="preload" as="image" href="/v2/icons/2/05.png" />
      <link rel="preload" as="image" href="/v2/icons/2/06.png" />
      <link rel="preload" as="image" href="/v2/icons/2/07.png" />
      <link rel="preload" as="image" href="/v2/icons/2/08.png" />

      <link rel="preload" as="image" href="/v2/icons/3/01.png" />
      <link rel="preload" as="image" href="/v2/icons/3/02.png" />
      <link rel="preload" as="image" href="/v2/icons/3/03.png" />
      <link rel="preload" as="image" href="/v2/icons/3/04.png" />
      <link rel="preload" as="image" href="/v2/icons/3/05.png" />
      <link rel="preload" as="image" href="/v2/icons/3/06.png" />
      <link rel="preload" as="image" href="/v2/icons/3/07.png" />
      <link rel="preload" as="image" href="/v2/icons/3/08.png" />
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
