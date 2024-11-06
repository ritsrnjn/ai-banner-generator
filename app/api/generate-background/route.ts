// app/api/generate-banner/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const response = await fetch('https://ai-banner-generator-backend-74430738063.us-central1.run.app/generate-ad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        })

        if (!response.ok) {
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

        // if (!response.ok) {
        //     // Return dummy data
        //     return NextResponse.json({
        //         url: "https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg",
        //         text_specifications: [
        //             {
        //                 text: "sample test heading",
        //                 color: "#282828",
        //                 font: "Epilogue",
        //                 position: "center"
        //             },
        //             {
        //                 text: "sample test sub heading",
        //                 color: "#282828",
        //                 font: "Arial",
        //                 position: "bottom"
        //             }
        //         ]
        //     });
        // }

        // we need to convert response.json to required format
        const data = await response.json();
        return NextResponse.json({ urls: data.urls });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}