import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{siteConfig.siteName}</h3>
            <p className="text-sm text-white/70">
              {siteConfig.taglineExtended}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <a
              href={`mailto:${siteConfig.primaryEmail}`}
              className="text-sm text-white/70 hover:text-wine transition-colors block mb-2"
            >
              {siteConfig.primaryEmail}
            </a>
            <Link
              href="/bookings"
              className="text-sm text-white/70 hover:text-wine transition-colors block"
            >
              Book a Session
            </Link>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow</h3>
            <div className="flex flex-col space-y-2">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-wine transition-colors"
                >
                  Instagram
                </a>
              )}
              {siteConfig.socialLinks.youtube && (
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-wine transition-colors"
                >
                  YouTube
                </a>
              )}
              {siteConfig.socialLinks.tiktok && (
                <a
                  href={siteConfig.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-wine transition-colors"
                >
                  TikTok
                </a>
              )}
              {siteConfig.socialLinks.soundcloud && (
                <a
                  href={siteConfig.socialLinks.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-wine transition-colors"
                >
                  SoundCloud
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>Photos & Sounds by {siteConfig.siteName}.</p>
        </div>
      </div>
    </footer>
  )
}

