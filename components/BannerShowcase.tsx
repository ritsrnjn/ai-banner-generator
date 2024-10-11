'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const banners = [
    '/banners/1.png',
    '/banners/2.png',
    '/banners/3.png',
    '/banners/4.png',
  ]
  

export default function BannerShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full aspect-video max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg" />
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}