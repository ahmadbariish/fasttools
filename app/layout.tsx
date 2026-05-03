import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE_ORIGIN } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'MultiTools Hub',
    template: '%s',
  },
  description:
    'Free bilingual browser tools for images, QR codes, and text. Privacy-first, no uploads.',
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
