'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { djSets } from '@/data/sounds'
import { siteConfig } from '@/config/site'

export default function SoundsPage() {
  const [selectedAlias, setSelectedAlias] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const allGenres = Array.from(new Set(djSets.flatMap((set) => set.genreTags)))
  const filteredSets = djSets.filter((set) => {
    if (selectedAlias && set.alias !== selectedAlias) return false
    if (selectedGenre && !set.genreTags.includes(selectedGenre)) return false
    return true
  })

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Sounds</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            DJ sets and mixes by {siteConfig.djAliases.ez} and {siteConfig.djAliases.lz}.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Alias Filter */}
          <div>
            <h3 className="text-sm text-white/50 mb-3">Filter by Alias</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedAlias(null)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedAlias === null
                    ? 'bg-wine text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                All
              </button>
              {Object.values(siteConfig.djAliases).map((alias) => (
                <button
                  key={alias}
                  onClick={() => setSelectedAlias(alias)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedAlias === alias
                      ? 'bg-wine text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {alias}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div>
            <h3 className="text-sm text-white/50 mb-3">Filter by Genre</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedGenre(null)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedGenre === null
                    ? 'bg-wine text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                All
              </button>
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedGenre === genre
                      ? 'bg-wine text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sets Grid */}
        {filteredSets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50">No sets found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSets.map((set, index) => (
              <motion.div
                key={set.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {set.genreTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-white/10 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {set.embedUrl ? (
                  <div className="mt-4">
                    {/* Embed would go here */}
                    <div className="aspect-video bg-white/5 rounded">
                      <iframe
                        src={set.embedUrl}
                        className="w-full h-full rounded"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-center py-8 bg-white/5 rounded">
                    <p className="text-sm text-white/50">Coming Soon</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

