import { NextRequest, NextResponse } from 'next/server'

interface BannerImage {
  layout_type: string;
  prompt: string;
  url: string;
  content_type: string;
}

type BannerResponse = BannerImage[];

export const maxDuration = 50;

export async function POST(request: NextRequest) {
  try {
    const { theme, size, product, promotionalOffer } = await request.json()

    // Validate input
    if (!theme || !size || !product) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const requestBody = {
      product_name: product, 
      theme,
      extra_input: 'The Images should be like a advertisment. Text should be very minimal relvant to promotional offer', 
      promotional_offer: promotionalOffer,
      image_size: size,
      flow_type: product === 'BannerWithText' ? 'banner_creation' : 'product_marketing',
    };

    const host = process.env.BACKEND_HOST || 'http://localhost:3000'
    
    // Make the actual API call to generate banners
    const response = await fetch(host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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