import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Ezell Franklin, photographer and DJ.',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-wine/30 to-black" />
            {/* Placeholder for portrait image */}
          </div>
        </motion.div>

        {/* Who I Am */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Who I Am</h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-4">
            <p className="text-white/80 leading-relaxed">
              I'm Ezell Franklin—photographer, DJ, and storyteller. My work lives at the intersection of visual art and sound, where each medium informs and elevates the other.
            </p>
            <p className="text-white/80 leading-relaxed">
              As a photographer, I specialize in editorial, portraits, and event photography. My style is cinematic and intimate, drawing inspiration from high fashion and street culture. I believe every image should tell a story, capture an emotion, or reveal something true about the subject.
            </p>
            <p className="text-white/80 leading-relaxed">
              As a DJ, I perform under the aliases <strong>Ez</strong> and <strong>Lz</strong>, curating sets that blend house, hip-hop, R&B, and afrobeats. Whether it's a peak-hour club set or a late-night private event, I'm focused on creating an experience—building energy, reading the room, and keeping people moving.
            </p>
          </div>
        </motion.section>

        {/* Photos & Sounds */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Photos & Sounds</h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-4">
            <p className="text-white/80 leading-relaxed">
              The dual identity isn't a gimmick—it's who I am. <strong>Ezell Franklin</strong> is the photographer, the visual storyteller. <strong>Ez</strong> and <strong>Lz</strong> are the DJ personas, each with their own vibe and energy.
            </p>
            <p className="text-white/80 leading-relaxed">
              But they're not separate. The photographer in me sees rhythm and composition in music. The DJ in me understands pacing and flow in photography. Both are about creating moments that resonate, that make people feel something.
            </p>
            <p className="text-white/80 leading-relaxed">
              Whether you're booking a portrait session or a DJ set, you're getting the same attention to detail, the same commitment to craft, and the same passion for creating something meaningful.
            </p>
          </div>
        </motion.section>

        {/* Influences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Influences</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-white/80 leading-relaxed mb-4">
              My work is informed by a diverse range of artists and creators who've pushed boundaries and redefined what's possible:
            </p>
            <ul className="list-none space-y-2 text-white/80">
              <li><strong>Virgil Abloh</strong> — For showing how design, music, and culture can intersect</li>
              <li><strong>Kanye West</strong> — For the audacity to blend genres and mediums</li>
              <li><strong>Kaytranada</strong> — For the smooth, genre-blending production</li>
              <li><strong>Jazzy Jeff</strong> — For the technical mastery and showmanship</li>
              <li><strong>Andre 3000</strong> — For the poetic lyricism and artistic evolution</li>
              <li><strong>A$AP Rocky</strong> — For the fashion-forward aesthetic and cultural impact</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-6">
              These influences shape how I approach both photography and DJing—always pushing boundaries, always evolving, always creating.
            </p>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center border-t border-white/10 pt-12"
        >
          <p className="text-lg text-white/70 mb-6">
            Interested in working together?
          </p>
          <Link
            href="/bookings"
            className="inline-block bg-wine hover:bg-wine-light text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

