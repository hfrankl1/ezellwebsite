'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CameraFlashProps {
  trigger?: boolean
  duration?: number
  intensity?: number
}

export default function CameraFlash({ 
  trigger = false, 
  duration = 0.5,
  intensity = 0.8 
}: CameraFlashProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [trigger, duration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: intensity }}
          exit={{ opacity: 0 }}
          transition={{
            duration: duration / 2,
            ease: 'easeInOut',
          }}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </AnimatePresence>
  )
}

