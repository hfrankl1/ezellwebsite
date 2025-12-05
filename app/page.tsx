'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { photoCollections } from '@/data/photos'
import { djSets } from '@/data/sounds'

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

export default function HomePage() {
  const [mode, setMode] = useState<'photos' | 'sounds'>('photos')

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 px-4"
        >
          <AnimatePresence mode="wait">
            {mode === 'photos' ? (
              <motion.h1
                key="photos-title"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                {siteConfig.siteName}
              </motion.h1>
            ) : (
              <motion.h1
                key="sounds-title"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                Ez and Lz
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            {siteConfig.taglineExtended}
          </motion.p>

          {/* Toggle Switch */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-12"
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
              ? 'hsl(350, 65%, 35%, 0.1)' 
              : 'hsl(350, 65%, 35%, 0.15)',
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
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* Photo Collections Teaser */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Selected Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {photoCollections.slice(0, 6).map((collection, index) => (
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
                <p className="text-lg text-muted-foreground mb-8">
                  Portrait sessions and fine art prints available.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/photos"
                    className="bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
                  >
                    View Photos
                  </Link>
                  <Link
                    href="/prints"
                    className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Shop Prints
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Book Portrait Session
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
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* DJ Sets Teaser */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                DJ Offerings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {djSets.map((set, index) => (
                  <motion.div
                    key={set.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-accent text-sm font-medium">{set.alias}</span>
                      {set.vibe && (
                        <span className="text-xs text-muted-foreground">{set.vibe}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{set.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{set.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {set.genreTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-background/50 rounded border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="text-center space-y-4">
                <p className="text-lg text-muted-foreground mb-8">
                  Available for club sets and private events.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/sounds"
                    className="bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
                  >
                    View Sets
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Book Club Set
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Book Private Event
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
