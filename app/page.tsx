'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BannerShowcase from '@/components/BannerShowcase'
import { Play, X } from 'lucide-react'
import React, { useState, useRef } from 'react'


interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null

  const handleVideoError = () => {
    console.error("Error loading video. Please check the file path and format.");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full">
        <div className="flex justify-end p-2">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">
          <video
            ref={videoRef}
            controls
            className="w-full"
            autoPlay
            onError={handleVideoError}
          >
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}


export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const openVideoModal = () => setIsVideoModalOpen(true)
  const closeVideoModal = () => setIsVideoModalOpen(false)

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
          <div className="container mx-auto relative">
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-center lg:text-left">
                  Create Stunning <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    AI-Powered Banners
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl text-center lg:text-left">
                  Generate professional-looking banners in seconds using the power of artificial intelligence.
                </p>
                <div className="flex flex-row justify-center lg:justify-start gap-4 mb-8">
                  <Link href="/create" passHref>
                    <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100 font-bold py-3 px-6 rounded-full transition-colors shadow-lg">
                      Start Creating
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/20 font-bold py-3 px-6 rounded-full transition-colors"
                    onClick={openVideoModal}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Watch Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-8 w-full">
                <BannerShowcase />
              </div>
            </div>
          </div>
        </section>
        

        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Generate banners in seconds, not hours.</p>
              </div>
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Designs</h3>
                <p className="text-gray-600">Unique and eye-catching designs created by AI.</p>
              </div>
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Differet Sizes</h3>
                <p className="text-gray-600">Supports various sizes</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
                <p className="text-center text-gray-600">Start by uploading your product image for training.</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Theme, Offers and Sizes</h3>
                <p className="text-center text-gray-600">Select from various themes or define yours.</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Generate & Download</h3>
                <p className="text-center text-gray-600">Get your AI-created banner and download it instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Simple, Transparent Pricing</h2>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
              <p className="text-4xl font-bold mb-6">$19<span className="text-xl text-gray-600">/month</span></p>
              <ul className="text-left mb-8">
                <li className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited Banner Generation
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to All AI Styles
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority Support
                </li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Get Started
              </Button>
            </div>
          </div>
        </section> */}

        <section className="py-20 px-4 bg-purple-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Amazing Banners?</h2>
            <p className="text-xl mb-8">Start generating professional banners with AI in seconds.</p>
            <Link href="/create" passHref>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-colors">
                Create Your First Banner
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 AdVinci. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} />
    </div>
  )
}
