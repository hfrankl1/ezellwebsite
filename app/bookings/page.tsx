'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'photography' | 'dj'>('photography')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    data.type = activeTab

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bookings</h1>
          <p className="text-lg text-white/70">
            Inquire for availability and pricing.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => {
              setActiveTab('photography')
              setSubmitStatus('idle')
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'photography'
                ? 'border-wine text-white'
                : 'border-transparent text-white/50 hover:text-white/70'
            }`}
          >
            Book Photography
          </button>
          <button
            onClick={() => {
              setActiveTab('dj')
              setSubmitStatus('idle')
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'dj'
                ? 'border-wine text-white'
                : 'border-transparent text-white/50 hover:text-white/70'
            }`}
          >
            Book DJ
          </button>
        </div>

        {/* Form */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
              />
            </div>

            {activeTab === 'photography' ? (
              <>
                <div>
                  <label htmlFor="sessionType" className="block text-sm font-medium mb-2">
                    Type of Session *
                  </label>
                  <select
                    id="sessionType"
                    name="sessionType"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  >
                    <option value="">Select a type</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Event">Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2">
                    Desired Date or Date Range *
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    required
                    placeholder="e.g., March 15, 2024 or March 15-20, 2024"
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    placeholder="City, State or specific venue"
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="referral" className="block text-sm font-medium mb-2">
                    How did you hear about Ezell?
                  </label>
                  <input
                    type="text"
                    id="referral"
                    name="referral"
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="vision" className="block text-sm font-medium mb-2">
                    Tell me about your vision *
                  </label>
                  <textarea
                    id="vision"
                    name="vision"
                    required
                    rows={5}
                    placeholder="Describe your vision for the session..."
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="setType" className="block text-sm font-medium mb-2">
                    Type of Set *
                  </label>
                  <select
                    id="setType"
                    name="setType"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  >
                    <option value="">Select a type</option>
                    <option value="Club">Club</option>
                    <option value="Private Event">Private Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="eventTime" className="block text-sm font-medium mb-2">
                    Event Time *
                  </label>
                  <input
                    type="text"
                    id="eventTime"
                    name="eventTime"
                    required
                    placeholder="e.g., 9:00 PM - 2:00 AM"
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="eventLocation" className="block text-sm font-medium mb-2">
                    Event Location *
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    required
                    placeholder="Venue name and address"
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="venueType" className="block text-sm font-medium mb-2">
                    Venue Type *
                  </label>
                  <select
                    id="venueType"
                    name="venueType"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  >
                    <option value="">Select a type</option>
                    <option value="Club">Club</option>
                    <option value="Lounge">Lounge</option>
                    <option value="Private Home">Private Home</option>
                    <option value="Event Space">Event Space</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="djReferral" className="block text-sm font-medium mb-2">
                    How did you hear about Ez/Lz?
                  </label>
                  <input
                    type="text"
                    id="djReferral"
                    name="djReferral"
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="energy" className="block text-sm font-medium mb-2">
                    What kind of energy are you looking for? *
                  </label>
                  <textarea
                    id="energy"
                    name="energy"
                    required
                    rows={5}
                    placeholder="Describe the vibe and energy you want for your event..."
                    className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  />
                </div>
              </>
            )}

            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500/50 rounded px-4 py-3 text-green-400">
                Thank you for your inquiry! We&apos;ll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500/50 rounded px-4 py-3 text-red-400">
                There was an error submitting your inquiry. Please try again or email us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-wine hover:bg-wine-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

