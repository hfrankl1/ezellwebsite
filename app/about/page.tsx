import { Metadata } from 'next'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Ezell Franklin – Photographer & DJ | Ezell Franklin',
  description: 'Ezell Franklin is a photographer and DJ (Ez and Lz) creating editorial photography, portraits, and DJ sets. Learn about his work in photography and music.',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Photo Section - Left Side */}
          <div className="lg:sticky lg:top-24 order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Decorative accent border */}
              <div className="absolute -inset-4 border border-accent/20 rounded-lg opacity-50" />
              
              {/* Photo Container - 50% smaller */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-card border border-border shadow-2xl">
                <Image
                  src="/ezell-portrait.jpg"
                  alt="Ezell Franklin - Photographer & DJ"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Small decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-accent/30 rounded-full opacity-30" />
            </div>
          </div>

          {/* Text Section - Right Side */}
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 lg:mb-8">
              About Ezell
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none space-y-6">
              <p className="text-foreground/90 leading-relaxed text-lg font-medium">
                <strong className="text-accent">Ezell Franklin — Photographer & DJ (Ez and Lz)</strong>
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
          </div>
        </div>

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
