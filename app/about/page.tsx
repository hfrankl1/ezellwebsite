import { Metadata } from 'next'
import Image from 'next/image'
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
        <div className="mb-16">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-card border border-border">
            <Image
              src="/ezell-portrait.jpg"
              alt="Ezell Franklin - Photographer & DJ"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
        </div>

        {/* Main About Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">About Ezell</h1>
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p className="text-foreground/80 leading-relaxed text-lg">
              <strong>Ezell Franklin — Photographer & DJ (Ez and Lz)</strong>
            </p>
            
            <p className="text-foreground/80 leading-relaxed">
              Ezell is a photographer and DJ moving between coasts and cities, somewhere between the Bay and the South, always chasing good light and better sound.
            </p>
            
            <p className="text-foreground/80 leading-relaxed">
              Behind the camera, his work lives in portraiture, fashion, and editorial stories. He&apos;s drawn to people with their own flavor—quiet or loud, polished or raw—and his real obsession is translating that into images that feel like they were pulled from a memory you didn&apos;t know you had. Getting the shot is the job. Making people feel seen, beautiful, and a little more themselves is the joy.
            </p>
            
            <p className="text-foreground/80 leading-relaxed">
              When the camera is down, he becomes Ez and Lz—a two-sided DJ persona blending rap, hip-hop, house, afrobeats, and amapiano into sets built for movement. Ez and Lz spin to watch shoulders loosen, faces light up, and rooms breathe in unison with the beat. For them, a night out is just another kind of portrait: a crowd captured in motion, held together by sound.
            </p>
            
            <p className="text-foreground/80 leading-relaxed">
              Whether it&apos;s on film or on the decks, Ezell builds worlds where people can recognize themselves, feel expensive for a moment, and get lost in the story.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="text-center border-t border-border pt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Interested in working together?
          </p>
          <Link
            href="/bookings"
            className="inline-block bg-accent hover:bg-wine-hover text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  )
}
