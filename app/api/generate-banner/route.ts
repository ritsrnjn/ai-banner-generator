import { NextRequest, NextResponse } from 'next/server'

interface BannerImage {
  url: string;
  content_type: string;
}

interface BannerResponse {
  images: BannerImage[];
  prompt: string;
}

export async function POST(request: NextRequest) {
  try {
    const { theme, size, product, additionalInput } = await request.json()

    // Validate input
    if (!theme || !size || !product) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Make the actual API call to generate banners
    const response = await fetch('http://44.201.113.177:8000/generate-ad', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme,
        size,
        product,
        additionalInput,
      }),
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data: BannerResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error generating banner:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}