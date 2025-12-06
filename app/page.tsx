'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { photoCollections } from '@/data/photos'

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
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 px-4 max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Ezell Franklin
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            Photography, sound, and creative direction shaped by feeling, mood, and craft.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto"
          >
            I create images and sets that move like conversations—intimate, cinematic, and intentional.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/bookings"
              className="bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
            >
              Book Photos or Sounds
            </Link>
            <Link
              href="/photos"
              className="bg-transparent border border-border hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-colors"
            >
              View the Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Background Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10 bg-gradient-to-b from-wine/10 via-transparent to-transparent"
        />
      </section>

      {/* The Work Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Work</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-8"
              >
                <h3 className="text-xl font-semibold mb-4">Photography</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Editorial portraits, moments in motion, and visual storytelling built with light, texture, and intention.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-8"
              >
                <h3 className="text-xl font-semibold mb-4">Sound</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Curated sets and sonic experiences shaped by mood, energy, and movement.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo Collections Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Selected Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photoCollections.slice(0, 6).map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
