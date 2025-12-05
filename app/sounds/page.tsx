'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

const comingSoonCards = [
  {
    id: 'club-sets',
    title: 'Club Sets',
    subtitle: 'High-energy blends for clubs and festivals.',
    tags: ['House', 'Hip-hop', 'Edits'],
    status: 'Booking available now. Mixes coming soon.',
    available: true,
  },
  {
    id: 'private-events',
    title: 'Private Events',
    subtitle: 'Weddings, brand events, and intimate parties with intention.',
    status: 'Curated vibes for people who care about the music.',
    available: true,
  },
  {
    id: 'live-mix-series',
    title: 'Live Mix Series',
    subtitle: 'A series of recorded sets for YouTube and future platforms.',
    status: 'Stay tuned — first drop coming soon.',
    available: false,
  },
]

export default function SoundsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Sounds by Ez / Lz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2"
          >
            Club nights, rooftop sets, and blends that feel like late-night conversations.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-muted-foreground/70"
          >
            Live sets and mixes are coming soon.
          </motion.p>
        </motion.div>

        {/* Coming Soon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {comingSoonCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4 + index * 0.1, 
                duration: 0.5,
                ease: 'easeOut'
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
              }}
              className="bg-card border border-border rounded-lg p-6 shadow-lg hover:border-accent/50 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
              <p className="text-muted-foreground mb-4">{card.subtitle}</p>
              
              {card.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-background/50 rounded border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className={`text-sm mb-4 ${card.available ? 'text-accent' : 'text-muted-foreground'}`}>
                {card.status}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center border-t border-border pt-12"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to book Ez / Lz for your event?
          </p>
          <Link
            href="/bookings?type=dj"
            className="inline-block bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
          >
            Book Ez / Lz
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
