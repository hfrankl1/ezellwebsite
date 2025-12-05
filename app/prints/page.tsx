'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { prints } from '@/data/prints'
import { X } from 'lucide-react'

export default function PrintsPage() {
  const [selectedPrint, setSelectedPrint] = useState<string | null>(null)
  const [showInquiry, setShowInquiry] = useState(false)

  const handleInquire = (printId: string) => {
    setSelectedPrint(printId)
    setShowInquiry(true)
  }

  const handleSubmitInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Here you would send the inquiry to your API
    // For now, we'll just log it
    console.log('Print inquiry:', {
      printId: selectedPrint,
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    })

    alert('Thank you for your inquiry! We\'ll be in touch soon.')
    setShowInquiry(false)
    setSelectedPrint(null)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Prints</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Creative photography prints available for purchase.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Each piece is made to order. Inquire for availability and pricing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prints.map((print, index) => (
            <motion.div
              key={print.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-wine/30 to-black" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleInquire(print.id)}
                    className="w-full bg-accent hover:bg-wine-hover text-accent-foreground px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Inquire to Purchase
                  </button>
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{print.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{print.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {print.sizes.map((size) => (
                  <span
                    key={size}
                    className="text-xs px-2 py-1 bg-white/10 rounded"
                  >
                    {size}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleInquire(print.id)}
                className="text-sm text-accent hover:text-wine-hover transition-colors"
              >
                Inquire to Purchase →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Inquiry Modal */}
        <AnimatePresence>
          {showInquiry && selectedPrint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowInquiry(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-lg p-8 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Print Inquiry</h2>
                  <button
                    onClick={() => setShowInquiry(false)}
                    className="p-2 hover:bg-white/10 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-card border border-border rounded px-4 py-2 focus:outline-none focus:border-accent text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-card border border-border rounded px-4 py-2 focus:outline-none focus:border-accent text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full bg-card border border-border rounded px-4 py-2 focus:outline-none focus:border-accent text-foreground"
                      placeholder="Tell us about your interest in this print..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-wine-hover text-accent-foreground px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Send Inquiry
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

