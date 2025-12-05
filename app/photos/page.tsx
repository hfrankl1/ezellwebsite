'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { photoCollections } from '@/data/photos'
import CameraFlash from '@/components/CameraFlash'

export default function PhotosPage() {
  const [hasFlashed, setHasFlashed] = useState(false)
  const [flashTrigger, setFlashTrigger] = useState(false)

  useEffect(() => {
    // Trigger flash on initial load
    if (!hasFlashed) {
      setFlashTrigger(true)
      setHasFlashed(true)
    }
  }, [hasFlashed])

  const handleCollectionClick = () => {
    // Trigger flash when clicking into a collection
    setFlashTrigger(true)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <CameraFlash trigger={flashTrigger} duration={0.5} intensity={0.7} />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Editorial, portraits, events, and fine art photography.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {photoCollections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6 + index * 0.1, 
                duration: 0.5,
                ease: 'easeOut'
              }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/photos/${collection.slug}`} 
                className="group block"
                onClick={handleCollectionClick}
              >
                <motion.div
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300,
                    damping: 20
                  }}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border mb-4 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wine/30 to-background" />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full border border-border">
                      {collection.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-background via-background/80 to-transparent">
                    <h2 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                      {collection.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
