'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MIN_SUBMIT_TIME_MS = 1500 // 1.5 seconds

export default function BookingsClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formReadyAt, setFormReadyAt] = useState<number | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Track when form becomes ready
    setFormReadyAt(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setSubmitStatus('idle')

    // Bot check 1: Honeypot
    if (honeypotRef.current?.value) {
      // Bot detected - silently fail
      return
    }

    // Bot check 2: Time-based check
    if (!formReadyAt) {
      setErrors({ form: 'Please wait a moment before submitting.' })
      return
    }

    const elapsed = Date.now() - formReadyAt
    if (elapsed < MIN_SUBMIT_TIME_MS) {
      // Suspiciously fast submission - silently fail
      return
    }

    // Get form data
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Validation
    const newErrors: Record<string, string> = {}
    if (!data.name || (data.name as string).trim() === '') {
      newErrors.name = 'Name is required'
    }
    if (!data.email || (data.email as string).trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!(data.email as string).includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!data.lookingFor || (data.lookingFor as string).trim() === '') {
      newErrors.lookingFor = 'Please select what you\'re looking for'
    }
    if (!data.vibe || (data.vibe as string).trim() === '') {
      newErrors.vibe = 'Please tell us about the vibe'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Something went wrong while sending your message.')
      }

      // Success
      setSubmitStatus('success')
      form.reset()
    } catch (err: any) {
      setSubmitStatus('error')
      setErrors({ form: err.message || 'Something went wrong while sending your message. Please try again in a moment.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Title & Intro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Photos or Sounds</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Some projects start with a clear idea. Others start with a feeling.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Use this form to share what you have in mind—photo sessions, DJ sets, or both. You&apos;ll get a personal reply with options, timing, and next steps.
          </p>
        </motion.section>

        {/* Option Blocks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Photo Sessions Block */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Photo Sessions</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Portraits, editorial concepts, brand stories, and events.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              This can be anything from a one-on-one session to a full creative build: mood, styling, lighting, and direction.
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Good for:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Portraits and headshots with personality</li>
                <li>Editorial concepts and lookbooks</li>
                <li>Behind-the-scenes or event coverage</li>
                <li>Brand imagery that doesn&apos;t feel like stock</li>
              </ul>
            </div>
          </div>

          {/* DJ Sets & Sounds Block */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">DJ Sets & Sounds</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Club nights, private events, and curated sound for spaces that want more than background noise.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Sets move through Amapiano, house, rap, R&B, edits, and whatever else the night calls for.
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Good for:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Parties and nightlife events</li>
                <li>Listening sessions and creative experiences</li>
                <li>Brand or launch events that need a specific mood</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 relative">
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

            <div>
              <h2 className="text-2xl font-bold mb-2">Tell me what you&apos;re planning</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Share as much or as little detail as you have. Rough ideas are welcome.
              </p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className={`w-full bg-card border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground ${
                  errors.name ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className={`w-full bg-card border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground ${
                  errors.email ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* What are you looking for */}
            <div>
              <label htmlFor="lookingFor" className="block text-sm font-medium mb-2">
                What are you looking for? *
              </label>
              <select
                id="lookingFor"
                name="lookingFor"
                className={`w-full bg-card border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground ${
                  errors.lookingFor ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Select an option</option>
                <option value="Photo session">Photo session</option>
                <option value="DJ set / Sounds">DJ set / Sounds</option>
                <option value="Both / Not sure yet">Both / Not sure yet</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Choose the option that&apos;s closest. We can refine details later.
              </p>
              {errors.lookingFor && (
                <p className="text-sm text-red-400 mt-1">{errors.lookingFor}</p>
              )}
            </div>

            {/* Preferred date or timeframe */}
            <div>
              <label htmlFor="dateTimeframe" className="block text-sm font-medium mb-2">
                Preferred date or timeframe
              </label>
              <input
                type="text"
                id="dateTimeframe"
                name="dateTimeframe"
                placeholder="Specific date or general timing (e.g. &quot;late May&quot; or &quot;Saturday evenings&quot;)"
                className="w-full bg-card border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground"
              />
            </div>

            {/* Rough budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Rough budget (optional)
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                placeholder="If you have a range in mind, share it here."
                className="w-full bg-card border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground"
              />
            </div>

            {/* Tell me about the vibe */}
            <div>
              <label htmlFor="vibe" className="block text-sm font-medium mb-2">
                Tell me about the vibe *
              </label>
              <textarea
                id="vibe"
                name="vibe"
                rows={6}
                placeholder="What&apos;s the feeling, setting, or story? Any references or links are welcome."
                className={`w-full bg-card border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground ${
                  errors.vibe ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.vibe && (
                <p className="text-sm text-red-400 mt-1">{errors.vibe}</p>
              )}
            </div>

            {/* How did you find this work */}
            <div>
              <label htmlFor="referral" className="block text-sm font-medium mb-2">
                How did you find this work? (optional)
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                placeholder="Friend, social, event, etc."
                className="w-full bg-card border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground"
              />
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500/50 rounded px-4 py-3 text-green-400">
                You&apos;re in. Your message was received, and you&apos;ll get a reply as soon as possible with next steps.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && errors.form && (
              <div className="bg-red-500/20 border border-red-500/50 rounded px-4 py-3 text-red-400">
                {errors.form}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-wine-hover disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  )
}
