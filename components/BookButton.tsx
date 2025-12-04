'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BookButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/bookings"
        className="bg-wine hover:bg-wine-light text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-colors flex items-center gap-2"
      >
        <span>Book Ezell</span>
      </Link>
    </motion.div>
  )
}

