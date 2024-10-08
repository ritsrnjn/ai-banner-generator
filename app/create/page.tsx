'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface BannerImage {
  layout_type: string;
  prompt: string;
  url: string;
  content_type: string;
}

type BannerResponse = BannerImage[];

export default function CreatePage() {
  const [product, setProduct] = useState('')
  const [theme, setTheme] = useState('')
  const [customTheme, setCustomTheme] = useState('')
  // const [additionalInput, setAdditionalInput] = useState('')
  const [promotionalOffer, setPromotionalOffer] = useState('')
  const [size, setSize] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBanners, setGeneratedBanners] = useState<BannerResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme: theme === 'custom' ? customTheme : theme,
        size,
        product,
        promotionalOffer,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate banner')
    }

    const data: BannerResponse = await response.json()
    console.log("debug mulitple images case")
    console.log(data)

    setGeneratedBanners(data)
    } catch (error) {
      console.error('Error generating images:', error)
      setError('An Internal Server Error occurred while generating the banners. Working to fix it soon! Showing placeholder images.')
      // Set placeholder data if the API call fails
      setGeneratedBanners(
        Array(4).fill({
          url: '/coke/1.png',
          content_type: 'image/png',
                  prompt: 'Placeholder prompt for demonstration purposes'
        }),
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Create Your Banner</h1>

          {/* <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something is broken on our backend server and we are working to fix it soon! Please try again in some time.</AlertDescription>
          </Alert> */}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                Product
              </label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger id="product" className="w-full">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coca-Cola">Coca Cola</SelectItem>
                  <SelectItem value="Cadbury">Cadbury</SelectItem>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="MyWoodCup">MyWoodCup</SelectItem>
                  {/* <SelectItem value="Amul Milk">Amul Milk</SelectItem> */}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-2">For any custom product we first need to train a LoRA, Backend is ready and we are integrating with frontend soon! Please check back, Thanks!</p>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <div className="flex space-x-4">
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diwali">Diwali</SelectItem>
                    <SelectItem value="holi">Holi</SelectItem>
                    <SelectItem value="christmas">Christmas</SelectItem>
                    {/* <SelectItem value="republic-day">Republic Day</SelectItem> */}
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {theme === 'custom' && (
                  <Input
                    type="text"
                    placeholder="Enter custom theme"
                    value={customTheme}
                    onChange={(e) => setCustomTheme(e.target.value)}
                    className="flex-grow"
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="promotional-offer" className="block text-sm font-medium text-gray-700 mb-1">
                Promotional Offer
              </label>
              <Textarea
                id="promotional-offer"
                placeholder="Enter any Promotional Offer: 50% off, Buy 1 Get 1 Free, etc."
                value={promotionalOffer}
                onChange={(e) => setPromotionalOffer(e.target.value)}
                className="w-full"
              />
            </div>

            {/* <div>
              <label htmlFor="additional-input" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Input
              </label>
              <Textarea
                id="additional-input"
                placeholder="Enter any additional information"
                value={additionalInput}
                onChange={(e) => setAdditionalInput(e.target.value)}
                className="w-full"
              />
            </div> */}

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="size" className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="portrait_4_3">Portrait 4:3</SelectItem>
                  <SelectItem value="portrait_16_9">Portrait 16:9</SelectItem>
                  <SelectItem value="landscape_4_3">Landscape 4:3</SelectItem>
                  <SelectItem value="landscape_16_9">Landscape 16:9</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={isGenerating} 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Create Banner'}
            </Button>
          </form>

          {generatedBanners && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Generated Banners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {generatedBanners.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105">
                        <img src={image.url} alt={`Generated banner ${index + 1}`} className="w-full h-auto rounded" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh]">
                      {/* <DialogHeader>
                        <DialogTitle>Banner Preview</DialogTitle>
                        <DialogDescription>Click outside or press ESC to close</DialogDescription>
                      </DialogHeader> */}
                      <div className="mt-4 relative">
                        <img src={image.url} alt={`Generated banner ${index + 1}`} className="w-full h-auto" />
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 AI Banner Generator. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}