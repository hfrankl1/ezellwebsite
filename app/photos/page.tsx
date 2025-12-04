import { Metadata } from 'next'
import Link from 'next/link'
import { photoCollections } from '@/data/photos'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'Photos',
  description: 'Photography collections by Ezell Franklin',
}

export default function PhotosPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Photography</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Editorial, portraits, events, and fine art photography.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoCollections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/photos/${collection.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5 mb-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wine/30 to-black" />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                      {collection.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h2 className="text-xl font-semibold mb-1">{collection.title}</h2>
                    <p className="text-sm text-white/70 line-clamp-2">
                      {collection.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

