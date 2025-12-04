'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { photoCollections } from '@/data/photos'
import { djSets } from '@/data/sounds'

export default function HomePage() {
  const [mode, setMode] = useState<'photos' | 'sounds'>('photos')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <AnimatePresence mode="wait">
            {mode === 'photos' ? (
              <motion.h1
                key="photos-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                {siteConfig.siteName}
              </motion.h1>
            ) : (
              <motion.h1
                key="sounds-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                Ez / Lz
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/70 mb-8"
          >
            {siteConfig.taglineExtended}
          </motion.p>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setMode('photos')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                mode === 'photos'
                  ? 'text-white border-b-2 border-wine'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              PHOTOS
            </button>
            <div className="w-px h-6 bg-white/20" />
            <button
              onClick={() => setMode('sounds')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                mode === 'sounds'
                  ? 'text-white border-b-2 border-wine'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              SOUNDS
            </button>
          </motion.div>
        </motion.div>

        {/* Background Accent */}
        <motion.div
          animate={{
            backgroundColor: mode === 'photos' ? 'rgba(139, 38, 53, 0.1)' : 'rgba(139, 38, 53, 0.15)',
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* Photo Collections Teaser */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Selected Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {photoCollections.slice(0, 6).map((collection) => (
                  <Link
                    key={collection.slug}
                    href={`/photos/${collection.slug}`}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-xl font-semibold mb-1">{collection.title}</h3>
                        <p className="text-sm text-white/70">{collection.category}</p>
                      </div>
                      {/* Placeholder for image */}
                      <div className="w-full h-full bg-gradient-to-br from-wine/20 to-black" />
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* CTAs */}
              <div className="text-center space-y-4">
                <p className="text-lg text-white/70 mb-8">
                  Portrait sessions and fine art prints available.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/photos"
                    className="bg-wine hover:bg-wine-light text-white px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    View Photos
                  </Link>
                  <Link
                    href="/prints"
                    className="bg-transparent border border-white/20 hover:border-wine text-white px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Shop Prints
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-white/20 hover:border-wine text-white px-8 py-3 rounded-full font-medium transition-colors"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* DJ Sets Teaser */}
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                DJ Offerings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {djSets.map((set) => (
                  <motion.div
                    key={set.slug}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-wine/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-wine text-sm font-medium">{set.alias}</span>
                      {set.vibe && (
                        <span className="text-xs text-white/50">{set.vibe}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{set.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{set.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {set.genreTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-white/10 rounded"
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
                <p className="text-lg text-white/70 mb-8">
                  Available for club sets and private events.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/sounds"
                    className="bg-wine hover:bg-wine-light text-white px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    View Sets
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-white/20 hover:border-wine text-white px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    Book Club Set
                  </Link>
                  <Link
                    href="/bookings"
                    className="bg-transparent border border-white/20 hover:border-wine text-white px-8 py-3 rounded-full font-medium transition-colors"
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

