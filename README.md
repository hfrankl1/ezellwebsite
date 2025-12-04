# Ezell Franklin Website

A cinematic, interactive marketing and portfolio website for photographer and DJ Ezell Franklin. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Dual Identity Toggle**: Switch between PHOTOS (photography) and SOUNDS (DJ) modes on the homepage
- **Photo Galleries**: Browse and view photography collections
- **Print Shop**: Inquire about purchasing creative photography prints
- **DJ Sets**: Browse DJ sets and mixes (structure ready for future content)
- **Journal**: Blog/journal for behind-the-scenes stories and thoughts
- **About Page**: Learn about Ezell's dual identity and influences
- **Booking System**: Separate forms for photography and DJ bookings

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ezellwebsite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional, for email functionality):
```env
BOOKINGS_EMAIL=info@ezellfranklin.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Add environment variables in Vercel dashboard if needed:
   - `BOOKINGS_EMAIL`: Email address to receive booking inquiries

That's it! Your site will be live and automatically deploy on every push.

## Updating Content

All content is managed through simple TypeScript config files, making it easy for non-technical users to update.

### Site Configuration

Edit `config/site.ts` to update:
- Site name and tagline
- Primary email address
- Navigation items
- Social media links
- DJ aliases

### Photo Collections

Edit `data/photos.ts` to add or modify photo collections:

```typescript
{
  slug: 'my-collection',
  title: 'My Collection',
  category: 'Portraits',
  coverImage: '/photos/my-collection/cover.jpg',
  description: 'Description of the collection',
  images: [
    '/photos/my-collection/1.jpg',
    '/photos/my-collection/2.jpg',
  ],
  date: '2024',
  location: 'New York',
  story: 'Optional story for the collection detail page',
}
```

**To add images:**
1. Create a folder in `public/photos/[collection-slug]/`
2. Add your images (cover.jpg, 1.jpg, 2.jpg, etc.)
3. Update the paths in `data/photos.ts`

### Prints

Edit `data/prints.ts` to add or modify prints:

```typescript
{
  id: 'print-001',
  title: 'Print Title',
  image: '/prints/print-image.jpg',
  description: 'Description of the print',
  sizes: ['8x10', '11x14', '16x20'],
  category: 'Portraits',
}
```

**To add print images:**
1. Add images to `public/prints/`
2. Update the paths in `data/prints.ts`

### DJ Sets

Edit `data/sounds.ts` to add or modify DJ sets:

```typescript
{
  slug: 'my-set',
  title: 'My Set',
  alias: 'Ez', // or 'Lz' or 'Ezell'
  description: 'Description of the set',
  genreTags: ['House', 'Hip-Hop'],
  embedUrl: 'https://youtube.com/embed/...', // Optional
  vibe: 'Peak hours',
  date: '2024',
}
```

### Journal Posts

Journal posts are currently stored as objects in `app/journal/[slug]/page.tsx`. For a more scalable solution, you can:

1. Create MDX files in a `data/journal/` directory
2. Use `fs.readdirSync` to read them dynamically
3. Use `@next/mdx` or a markdown parser to render them

Example structure:
```
data/journal/
  my-post.mdx
  another-post.mdx
```

## Email Integration

The booking form currently logs submissions to the console. To send actual emails:

1. Choose an email service (SendGrid, Postmark, Resend, etc.)
2. Install the SDK: `npm install @sendgrid/mail` (or your chosen service)
3. Add your API key to `.env.local`:
   ```env
   SENDGRID_API_KEY=your_api_key
   BOOKINGS_EMAIL=info@ezellfranklin.com
   ```
4. Update `app/api/bookings/route.ts` to send emails (see comments in the file)

## Project Structure

```
ezellwebsite/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── photos/            # Photo gallery pages
│   ├── prints/            # Prints page
│   ├── sounds/            # DJ sets page
│   ├── journal/           # Journal/blog pages
│   ├── about/             # About page
│   ├── bookings/          # Booking page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── BookButton.tsx
├── config/                # Configuration files
│   └── site.ts           # Site-wide config
├── data/                  # Content data
│   ├── photos.ts         # Photo collections
│   ├── prints.ts         # Prints catalog
│   └── sounds.ts         # DJ sets
└── public/                # Static assets
    ├── photos/           # Photo images
    └── prints/           # Print images
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme. The wine red accent color is defined there:

```typescript
colors: {
  wine: {
    DEFAULT: '#8B2635',
    light: '#A03D4D',
    dark: '#6B1D2A',
  },
}
```

### Fonts

The site uses system fonts by default. To add custom fonts:

1. Add fonts to `public/fonts/`
2. Import them in `app/layout.tsx`
3. Update `tailwind.config.ts` with the font family
4. Update CSS variables in `app/globals.css`

## License

Private project for Ezell Franklin.

## Support

For questions or issues, contact info@ezellfranklin.com

