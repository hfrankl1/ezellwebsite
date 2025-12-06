'use client'

import { useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Wire up backend integration for email capture
    console.log('Email submitted:', email)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Email Capture Section */}
        <div className="mb-12 pb-12 border-b border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Stay in the conversation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get updates on new work, sets, and print drops. Occasional notes—no noise.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 bg-card border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-wine-hover text-accent-foreground px-6 py-2 rounded text-sm font-medium transition-colors"
            >
              {submitted ? 'Joined!' : 'Join the List'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{siteConfig.siteName}</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.taglineExtended}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact</h3>
            <a
              href={`mailto:${siteConfig.primaryEmail}`}
              className="text-sm text-muted-foreground hover:text-accent transition-colors block mb-2"
            >
              {siteConfig.primaryEmail}
            </a>
            <Link
              href="/bookings"
              className="text-sm text-muted-foreground hover:text-accent transition-colors block"
            >
              Book a Session
            </Link>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Follow</h3>
            <div className="flex flex-col space-y-2">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Instagram
                </a>
              )}
              {siteConfig.socialLinks.youtube && (
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  YouTube
                </a>
              )}
              {siteConfig.socialLinks.tiktok && (
                <a
                  href={siteConfig.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  TikTok
                </a>
              )}
              {siteConfig.socialLinks.soundcloud && (
                <a
                  href={siteConfig.socialLinks.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  SoundCloud
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Photos & Sounds by {siteConfig.siteName}.</p>
        </div>
      </div>
    </footer>
  )
}
