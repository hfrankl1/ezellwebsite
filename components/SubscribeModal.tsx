'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const SUBSCRIBE_API = '/api/subscribe'
const MIN_SUBMIT_TIME_MS = 1500 // 1.5 seconds
const POPUP_COOLDOWN_DAYS = 14 // Days before showing popup again

export default function SubscribeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formReadyAt, setFormReadyAt] = useState<number | null>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check if popup should be shown
    const checkPopupStatus = () => {
      const popupSeen = localStorage.getItem('popup_seen')
      
      if (!popupSeen) {
        // Never seen before, show after delay
        const timer = setTimeout(() => {
          setIsOpen(true)
          setFormReadyAt(Date.now())
        }, 2000) // 2 second delay
        return () => clearTimeout(timer)
      }

      // Check if cooldown period has passed
      const lastSeen = parseInt(popupSeen, 10)
      const daysSinceSeen = (Date.now() - lastSeen) / (1000 * 60 * 60 * 24)
      
      if (daysSinceSeen >= POPUP_COOLDOWN_DAYS) {
        // Cooldown expired, show after delay
        const timer = setTimeout(() => {
          setIsOpen(true)
          setFormReadyAt(Date.now())
        }, 2000)
        return () => clearTimeout(timer)
      }
    }

    checkPopupStatus()
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Store timestamp when closed
    localStorage.setItem('popup_seen', Date.now().toString())
  }

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
      setError('Please enter a valid email address. Please try again.')
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
        throw new Error(data.error || 'Email could not be added. Please try again.')
      }

      // Success
      setSubmitted(true)
      setEmail('')
      setError(null)
      
      // Store timestamp when subscribed
      localStorage.setItem('popup_seen', Date.now().toString())
      
      setTimeout(() => {
        setSubmitted(false)
        handleClose()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Email could not be added. Please try again.')
      console.error('Subscription error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-2xl relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="pr-8">
                <h2 className="text-2xl font-bold mb-2">Stay in the Conversation</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Get updates on new work, sets, and print drops.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <p className="text-green-400 font-medium">Email was added.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative">
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
                      autoFocus
                      disabled={isLoading || submitted}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                    />
                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isLoading || submitted}
                        className="flex-1 bg-accent hover:bg-wine-hover text-accent-foreground px-6 py-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-3 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Not now
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
