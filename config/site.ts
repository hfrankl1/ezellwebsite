/**
 * Site Configuration
 * 
 * Edit this file to update site-wide settings like name, tagline, email, and social links.
 */

export const siteConfig = {
  siteName: 'Ezell Franklin',
  tagline: 'Photos & Sounds',
  taglineExtended: 'Images and sets that feel like late-night conversations.',
  primaryEmail: 'info@ezellfranklin.com',
  
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Photos', href: '/photos' },
    { label: 'Sounds', href: '/sounds' },
    { label: 'Journal', href: '/journal' },
    { label: 'About', href: '/about' },
    { label: 'Prints', href: '/prints' },
  ],

  socialLinks: {
    instagram: 'https://instagram.com/ezellfranklin', // Update with actual handle
    youtube: 'https://youtube.com/@ezellfranklin', // Update with actual channel
    tiktok: 'https://tiktok.com/@ezellfranklin', // Update with actual handle
    soundcloud: 'https://soundcloud.com/ezellfranklin', // Update with actual profile
    twitter: '', // Optional
  },

  djAliases: {
    ez: 'Ez',
    lz: 'Lz',
  },
}

