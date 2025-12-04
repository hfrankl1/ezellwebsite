/**
 * Photo Collections Data
 * 
 * To add a new photo collection:
 * 1. Add a new object to this array
 * 2. Include: slug, title, category, coverImage, description, and images array
 * 3. Place images in the /public/photos/[slug]/ directory
 * 4. Use relative paths like '/photos/[slug]/image.jpg'
 */

export interface PhotoCollection {
  slug: string
  title: string
  category: 'Fashion' | 'Portraits' | 'Events' | 'Editorial' | 'Fine Art'
  coverImage: string
  description: string
  images: string[]
  date?: string
  location?: string
  story?: string // Optional story for the collection detail page
}

export const photoCollections: PhotoCollection[] = [
  {
    slug: 'urban-portraits-2024',
    title: 'Urban Portraits',
    category: 'Portraits',
    coverImage: '/photos/urban-portraits-2024/cover.jpg',
    description: 'A series exploring identity and place through intimate portraiture.',
    images: [
      '/photos/urban-portraits-2024/1.jpg',
      '/photos/urban-portraits-2024/2.jpg',
      '/photos/urban-portraits-2024/3.jpg',
      '/photos/urban-portraits-2024/4.jpg',
    ],
    date: '2024',
    location: 'New York',
    story: 'These portraits capture moments of quiet reflection in the urban landscape, where individual stories intersect with the city\'s rhythm.',
  },
  {
    slug: 'fashion-editorial-fall',
    title: 'Fall Editorial',
    category: 'Fashion',
    coverImage: '/photos/fashion-editorial-fall/cover.jpg',
    description: 'High fashion meets street style in this autumn collection.',
    images: [
      '/photos/fashion-editorial-fall/1.jpg',
      '/photos/fashion-editorial-fall/2.jpg',
      '/photos/fashion-editorial-fall/3.jpg',
      '/photos/fashion-editorial-fall/4.jpg',
      '/photos/fashion-editorial-fall/5.jpg',
    ],
    date: '2024',
    story: 'An exploration of texture, movement, and the changing seasons.',
  },
  {
    slug: 'nightlife-events',
    title: 'Nightlife',
    category: 'Events',
    coverImage: '/photos/nightlife-events/cover.jpg',
    description: 'Capturing the energy and atmosphere of nightlife culture.',
    images: [
      '/photos/nightlife-events/1.jpg',
      '/photos/nightlife-events/2.jpg',
      '/photos/nightlife-events/3.jpg',
      '/photos/nightlife-events/4.jpg',
    ],
    date: '2024',
    story: 'Where music, movement, and light converge.',
  },
  {
    slug: 'minimalist-portraits',
    title: 'Minimalist Portraits',
    category: 'Portraits',
    coverImage: '/photos/minimalist-portraits/cover.jpg',
    description: 'Stripped down to essence. Focus on expression and form.',
    images: [
      '/photos/minimalist-portraits/1.jpg',
      '/photos/minimalist-portraits/2.jpg',
      '/photos/minimalist-portraits/3.jpg',
    ],
    date: '2024',
    story: 'Less is more. These portraits celebrate the power of simplicity.',
  },
  {
    slug: 'street-style-editorial',
    title: 'Street Style',
    category: 'Editorial',
    coverImage: '/photos/street-style-editorial/cover.jpg',
    description: 'Documenting contemporary style on the streets.',
    images: [
      '/photos/street-style-editorial/1.jpg',
      '/photos/street-style-editorial/2.jpg',
      '/photos/street-style-editorial/3.jpg',
      '/photos/street-style-editorial/4.jpg',
    ],
    date: '2024',
    story: 'Style is personal. These images capture individual expression in public space.',
  },
  {
    slug: 'fine-art-series',
    title: 'Fine Art Series',
    category: 'Fine Art',
    coverImage: '/photos/fine-art-series/cover.jpg',
    description: 'Abstract compositions exploring light, shadow, and form.',
    images: [
      '/photos/fine-art-series/1.jpg',
      '/photos/fine-art-series/2.jpg',
      '/photos/fine-art-series/3.jpg',
      '/photos/fine-art-series/4.jpg',
    ],
    date: '2024',
    story: 'Photography as meditation. These images invite contemplation.',
  },
  {
    slug: 'concert-photography',
    title: 'Live Music',
    category: 'Events',
    coverImage: '/photos/concert-photography/cover.jpg',
    description: 'Capturing the raw energy of live performances.',
    images: [
      '/photos/concert-photography/1.jpg',
      '/photos/concert-photography/2.jpg',
      '/photos/concert-photography/3.jpg',
    ],
    date: '2024',
    story: 'Music in motion. These images document the connection between artist and audience.',
  },
  {
    slug: 'portrait-session-01',
    title: 'Portrait Session 01',
    category: 'Portraits',
    coverImage: '/photos/portrait-session-01/cover.jpg',
    description: 'Intimate portrait session exploring personal narrative.',
    images: [
      '/photos/portrait-session-01/1.jpg',
      '/photos/portrait-session-01/2.jpg',
      '/photos/portrait-session-01/3.jpg',
      '/photos/portrait-session-01/4.jpg',
    ],
    date: '2024',
    story: 'Every portrait tells a story. This session focused on capturing authentic moments.',
  },
  {
    slug: 'fashion-lookbook',
    title: 'Fashion Lookbook',
    category: 'Fashion',
    coverImage: '/photos/fashion-lookbook/cover.jpg',
    description: 'Contemporary fashion photography with editorial flair.',
    images: [
      '/photos/fashion-lookbook/1.jpg',
      '/photos/fashion-lookbook/2.jpg',
      '/photos/fashion-lookbook/3.jpg',
      '/photos/fashion-lookbook/4.jpg',
      '/photos/fashion-lookbook/5.jpg',
    ],
    date: '2024',
    story: 'Fashion as art. This lookbook showcases contemporary design through cinematic imagery.',
  },
  {
    slug: 'editorial-story',
    title: 'Editorial Story',
    category: 'Editorial',
    coverImage: '/photos/editorial-story/cover.jpg',
    description: 'Narrative-driven editorial photography.',
    images: [
      '/photos/editorial-story/1.jpg',
      '/photos/editorial-story/2.jpg',
      '/photos/editorial-story/3.jpg',
    ],
    date: '2024',
    story: 'Photography that tells a story. This editorial explores themes of identity and place.',
  },
]

