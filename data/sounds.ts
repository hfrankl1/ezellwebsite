/**
 * DJ Sets Data
 * 
 * To add a new DJ set:
 * 1. Add a new object to this array
 * 2. Include: slug, title, alias, description, genreTags, and embedUrl (when available)
 * 3. For future sets, leave embedUrl empty and they'll show as "Coming Soon"
 */

export interface DJSet {
  slug: string
  title: string
  alias: 'Ez' | 'Lz' | 'Ezell'
  description: string
  genreTags: string[]
  embedUrl?: string // YouTube or SoundCloud embed URL
  duration?: string
  vibe?: string // e.g., "2am rooftop", "Sunset set", "Late night"
  date?: string
}

export const djSets: DJSet[] = [
  {
    slug: 'club-set-2024',
    title: 'Club Set 2024',
    alias: 'Ez',
    description: 'A high-energy set blending house, hip-hop, and R&B. Perfect for peak hours.',
    genreTags: ['House', 'Hip-Hop', 'R&B'],
    vibe: 'Peak hours',
    date: '2024',
  },
  {
    slug: 'late-night-vibes',
    title: 'Late Night Vibes',
    alias: 'Lz',
    description: 'Smooth transitions through deep house and afrobeats. For those who stay until closing.',
    genreTags: ['Deep House', 'Afrobeats', 'R&B'],
    vibe: '2am rooftop',
    date: '2024',
  },
  {
    slug: 'private-event-mix',
    title: 'Private Event Mix',
    alias: 'Ezell',
    description: 'Curated selection for private events. Versatile and crowd-pleasing.',
    genreTags: ['Hip-Hop', 'R&B', 'Pop', 'House'],
    vibe: 'Versatile',
    date: '2024',
  },
  {
    slug: 'sunset-set',
    title: 'Sunset Set',
    alias: 'Ez',
    description: 'Warm-up vibes perfect for early evening. Smooth grooves and classic selections.',
    genreTags: ['R&B', 'Soul', 'Hip-Hop'],
    vibe: 'Sunset set',
    date: '2024',
  },
  {
    slug: 'afrobeats-special',
    title: 'Afrobeats Special',
    alias: 'Lz',
    description: 'A celebration of afrobeats, amapiano, and contemporary African sounds.',
    genreTags: ['Afrobeats', 'Amapiano', 'Afro House'],
    vibe: 'Dance floor',
    date: '2024',
  },
]

