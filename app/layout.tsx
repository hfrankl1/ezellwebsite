import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookButton from '@/components/BookButton'
import SubscribeModal from '@/components/SubscribeModal'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Ezell Franklin | Photography, Sound, and Creative Direction',
    template: `%s | Ezell Franklin`,
  },
  description: 'Editorial photography, portraits, nightlife coverage, DJ sets, fine art prints, and behind-the-scenes creative work—brought together through a cinematic, late-night storytelling voice.',
  openGraph: {
    title: 'Ezell Franklin | Photography, Sound, and Creative Direction',
    description: 'Editorial photography, portraits, nightlife coverage, DJ sets, fine art prints, and behind-the-scenes creative work—brought together through a cinematic, late-night storytelling voice.',
    type: 'website',
    url: 'https://ezellfranklin.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ezell Franklin | Photography, Sound, and Creative Direction',
    description: 'Editorial photography, portraits, nightlife coverage, DJ sets, fine art prints, and behind-the-scenes creative work.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ezell Franklin',
    jobTitle: 'Photographer, DJ, Creative Director',
    url: 'https://ezellfranklin.com',
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <BookButton />
        <SubscribeModal />
      </body>
    </html>
  )
}

