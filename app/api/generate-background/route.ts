// app/api/generate-banner/route.ts
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('guidelines_file');
        if (!file || !(file instanceof File)) {
          throw new Error('No valid file provided');
        }
    
        // Convert file to buffer directly
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create new FormData
        const newFormData = new FormData();
        
        // Create blob directly from buffer
        const fileBlob = new Blob([buffer], { type: file.type });
        
        // Set the file and other fields
        newFormData.set('guidelines_file', fileBlob, file.name);
        newFormData.set('company_context', formData.get('company_context') as string);
        newFormData.set('event_context', formData.get('event_context') as string);
        
    

        const response = await fetch('http://44.201.113.177:5001/generate-banner', {
            method: 'POST',
            body: newFormData
        });

        if (!response.ok) {
            console.error('Error processing request:', response);
            // delay by 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Return dummy data
            const mockResponse = {
                urls: [
                    "https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg",
                    "https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg",
                    "https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg",
                    "https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg"
                ]
            };
            return NextResponse.json({ urls: mockResponse.urls });
        }

        // we need to convert response.json to required format
        const data = await response.json();
        console.log('TOP URLS:', data.top_urls);
        return NextResponse.json({ urls: data.top_urls });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}