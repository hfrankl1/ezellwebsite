'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { photoCollections } from '@/data/photos'
import { djSets } from '@/data/sounds'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const featuredPhotos = [
  {
    id: 1,
    image: '/images/lillian-7.jpg',
    headline: 'Romantic Minimalism, Reimagined.',
    description: 'Soft power, sculpted light, and intentional florals in conversation.',
    alt: 'Portrait of a woman reclining among gold and floral arrangements.',
    link: '/photos',
  },
  {
    id: 2,
    image: '/images/amari_dark.jpg',
    headline: 'Color Stories With Emotional Weight.',
    description: 'Beauty portraiture where contrast, texture, and expression do the talking.',
    alt: 'Close beauty portrait with bold red makeup and hands resting on a shoulder.',
    link: '/photos',
  },
  {
    id: 3,
    image: '/images/Elexus_Finalv2.jpg',
    headline: 'Simplicity as a Statement.',
    description: 'Clean lines, precise light, and a profile that feels both calm and electric.',
    alt: 'Profile portrait of a woman with teal makeup on a teal background.',
    link: '/photos',
  },
  {
    id: 4,
    image: '/images/Faben4.jpg',
    headline: 'Where Imagery Becomes Myth.',
    description: 'Conceptual portraiture shaped through color, pattern, and ritual detail.',
    alt: 'Woman lying in a circular floral composition surrounded by leaves and flowers.',
    link: '/photos',
  },
]

export default function HomePage() {
  const [mode, setMode] = useState<'photos' | 'sounds'>('photos')

  // Get 3 most recent photo collections (last 3 in array) for Selected Collections
  const recentCollections = useMemo(() => {
    return photoCollections.slice(-3)
  }, [])

  // Get 3 most recent DJ sets (last 3 in array)
  const featuredSounds = useMemo(() => {
    return djSets.slice(-3).map((set) => ({
      id: set.slug,
      headline: set.title,
      description: set.description,
      link: `/sounds#${set.slug}`,
      genreTags: set.genreTags,
      vibe: set.vibe,
    }))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-3"
          >
            Ezell Franklin
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            Photography, sound, and creative direction shaped by feeling, mood, and craft.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground/80 mb-6 max-w-2xl mx-auto"
          >
            I create images and sets that move like conversations—intimate, cinematic, and intentional.
          </motion.p>

          {/* Toggle Switch */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => setMode('photos')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 text-sm font-medium transition-all ${
                mode === 'photos'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground/70'
              }`}
            >
              PHOTOS
              {mode === 'photos' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
            <div className="w-px h-6 bg-border" />
            <motion.button
              onClick={() => setMode('sounds')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 text-sm font-medium transition-all ${
                mode === 'sounds'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground/70'
              }`}
            >
              SOUNDS
              {mode === 'sounds' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Background Accent */}
        <motion.div
          animate={{
            backgroundColor: mode === 'photos' 
              ? 'hsl(350, 65%, 35%, 0.05)' 
              : 'hsl(350, 65%, 35%, 0.08)',
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 -z-10"
        />
      </section>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        {mode === 'photos' ? (
          <motion.section
            key="photos-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* Featured Work Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Work</h2>
                  <p className="text-sm text-muted-foreground">
                    A few frames that hold the energy of what I make.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {featuredPhotos.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link href={work.link} className="group block">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border shadow-lg mb-4"
                        >
                          <Image
                            src={work.image}
                            alt={work.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                        <div className="px-2">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                            {work.headline}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {work.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Photo Collections Teaser */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Selected Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {recentCollections.map((collection, index) => (
                  <motion.div
                    key={collection.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={`/photos/${collection.slug}`}
                      className="group block"
                    >
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                            {collection.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{collection.category}</p>
                        </div>
                        {/* Placeholder for image */}
                        <div className="w-full h-full bg-gradient-to-br from-wine/20 to-background" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="text-center space-y-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/photos"
                    className="bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
                  >
                    View Photos
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Book Photo Session
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="sounds-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* Featured Work Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Work</h2>
                  <p className="text-sm text-muted-foreground">
                    A few sets and experiences that hold the energy of what I make.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {featuredSounds.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link href={work.link} className="group block">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border shadow-lg mb-4 bg-gradient-to-br from-wine/20 to-background flex items-center justify-center"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10 text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </motion.div>
                        <div className="px-2">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                            {work.headline}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                            {work.description}
                          </p>
                          {work.genreTags && work.genreTags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {work.genreTags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-background/50 rounded border border-border text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Coming Soon Cards */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                DJ Offerings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {comingSoonCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
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

              {/* CTAs */}
              <div className="text-center space-y-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/sounds"
                    className="bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
                  >
                    View Sounds
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Book DJ Set
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
