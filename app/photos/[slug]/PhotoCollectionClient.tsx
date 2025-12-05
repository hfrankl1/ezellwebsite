'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PhotoCollection } from '@/data/photos'
import CameraFlash from '@/components/CameraFlash'

interface PhotoCollectionClientProps {
  collection: PhotoCollection
}

export default function PhotoCollectionClient({ collection }: PhotoCollectionClientProps) {
  const [flashTrigger, setFlashTrigger] = useState(false)

  useEffect(() => {
    // Trigger flash when gallery page loads
    setFlashTrigger(true)
  }, [])

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <CameraFlash trigger={flashTrigger} duration={0.4} intensity={0.6} />
      
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-card border border-border mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-wine/30 to-background" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-background via-background/90 to-transparent">
              <span className="text-sm px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full mb-4 inline-block border border-border">
                {collection.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{collection.title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{collection.description}</p>
            </div>
          </div>

          {collection.story && (
            <div className="prose prose-invert max-w-3xl">
              <p className="text-lg text-foreground/80 leading-relaxed">{collection.story}</p>
            </div>
          )}

          {(collection.date || collection.location) && (
            <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
              {collection.date && <span>Date: {collection.date}</span>}
              {collection.location && <span>Location: {collection.location}</span>}
            </div>
          )}
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {collection.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border group cursor-pointer shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-wine/20 to-background opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Placeholder - replace with actual Image component when images are available */}
              <div className="w-full h-full bg-gradient-to-br from-wine/30 to-background" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

