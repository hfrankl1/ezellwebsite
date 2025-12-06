'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

const SUBSCRIBE_API = '/api/subscribe'
const MIN_SUBMIT_TIME_MS = 1500 // 1.5 seconds

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formReadyAt, setFormReadyAt] = useState<number | null>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Track when form becomes ready
    setFormReadyAt(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Bot check 1: Honeypot
    if (honeypotRef.current?.value) {
      // Bot detected - silently fail
      return
    }

    // Bot check 2: Time-based check
    if (!formReadyAt) {
      setError('Please wait a moment before submitting.')
      return
    }

    const elapsed = Date.now() - formReadyAt
    if (elapsed < MIN_SUBMIT_TIME_MS) {
      // Suspiciously fast submission - silently fail
      return
    }

    // Validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(SUBSCRIBE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Subscription failed. Please try again.')
      }

      // Success
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Subscription error:', err)
    } finally {
      setIsLoading(false)
    }
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
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md relative">
            {/* Honeypot field */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input
                type="text"
                name="b28-ft"
                tabIndex={-1}
                autoComplete="off"
                ref={honeypotRef}
              />
            </div>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              disabled={isLoading || submitted}
              className="flex-1 bg-card border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || submitted}
              className="bg-accent hover:bg-wine-hover text-accent-foreground px-6 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : submitted ? 'Joined!' : 'Join the List'}
            </button>
          </form>
          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
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
