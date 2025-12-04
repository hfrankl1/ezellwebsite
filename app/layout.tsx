import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookButton from '@/components/BookButton'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.taglineExtended,
  openGraph: {
    title: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    description: siteConfig.taglineExtended,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <BookButton />
      </body>
    </html>
  )
}

