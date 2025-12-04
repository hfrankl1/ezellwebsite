/**
 * Prints Data
 * 
 * To add a new print:
 * 1. Add a new object to this array
 * 2. Include: id, title, image, description, and sizes
 * 3. Place images in the /public/prints/ directory
 * 4. Use relative paths like '/prints/image.jpg'
 */

export interface Print {
  id: string
  title: string
  image: string
  description: string
  sizes: string[]
  category?: string
  alt?: string
}

export const prints: Print[] = [
  {
    id: 'print-001',
    title: 'Urban Reflection',
    image: '/prints/urban-reflection.jpg',
    description: 'A contemplative portrait capturing the intersection of urban life and personal reflection.',
    sizes: ['8x10', '11x14', '16x20', '20x24'],
    category: 'Portraits',
    alt: 'Urban portrait print',
  },
  {
    id: 'print-002',
    title: 'Night Energy',
    image: '/prints/night-energy.jpg',
    description: 'The pulse of nightlife captured in a single frame.',
    sizes: ['11x14', '16x20', '20x24', '24x30'],
    category: 'Events',
    alt: 'Nightlife photography print',
  },
  {
    id: 'print-003',
    title: 'Minimal Form',
    image: '/prints/minimal-form.jpg',
    description: 'Stripped down to essential elements. A study in composition.',
    sizes: ['8x10', '11x14', '16x20'],
    category: 'Fine Art',
    alt: 'Minimalist fine art print',
  },
  {
    id: 'print-004',
    title: 'Fashion Moment',
    image: '/prints/fashion-moment.jpg',
    description: 'Editorial fashion photography with cinematic quality.',
    sizes: ['11x14', '16x20', '20x24'],
    category: 'Fashion',
    alt: 'Fashion editorial print',
  },
  {
    id: 'print-005',
    title: 'Street Scene',
    image: '/prints/street-scene.jpg',
    description: 'Documentary-style street photography capturing contemporary culture.',
    sizes: ['8x10', '11x14', '16x20', '20x24'],
    category: 'Editorial',
    alt: 'Street photography print',
  },
  {
    id: 'print-006',
    title: 'Portrait Study',
    image: '/prints/portrait-study.jpg',
    description: 'An intimate portrait exploring expression and emotion.',
    sizes: ['11x14', '16x20', '20x24'],
    category: 'Portraits',
    alt: 'Portrait study print',
  },
]

