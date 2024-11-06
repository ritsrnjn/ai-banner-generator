'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Download } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

// interface GeneratedImage {
//   url: string;
// }

interface ApiResponse {
  urls: string[];
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onDownload: () => void;
}

const LoadingAnimation = () => (
    // Change this outer div's classes to center it in the container
    <div className="flex items-center justify-center h-full min-h-[600px]">
      <div className="flex flex-col items-center justify-center gap-4"> {/* Added wrapper for animation + text */}
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-t-4 border-b-4 border-purple-300 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-purple-600 text-lg font-medium animate-pulse">
          Creating your banners...
        </p>
      </div>
    </div>
  );

const ImageGrid: React.FC<{
  images: string[];
  onImageClick: (url: string) => void;
  loading: boolean;
}> = ({ images, onImageClick, loading }) => {
  if (loading) {
    return <LoadingAnimation />;
  }

  if (images.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg mb-2">Ready to generate backgrounds</p>
          <p className="text-sm">Fill in the details and click Generate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {images.map((url, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          onClick={() => onImageClick(url)}
        >
          <img
            src={url}
            alt={`Generated Background ${index + 1}`}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <Button
              className="opacity-0 group-hover:opacity-100 transition-all duration-300"
              variant="secondary"
            >
              Preview
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, imageUrl, onDownload }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Generated Background"
            className="w-full h-auto"
          />
          {/* <div className="absolute top-0 right-0 left-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
            <Button
              variant="ghost"
              className="absolute right-4 top-4 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div> */}
          <Button
            onClick={onDownload}
            className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-900 font-medium shadow-lg"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BackgroundGenerator: React.FC = () => {
  // ... (previous state and handlers remain the same)

  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    guidelines_file: null as File | null,
    company_context: '',
    event_context: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      guidelines_file: file
    }));
  };

  const handleGenerate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiFormData = new FormData();
      if (formData.guidelines_file) {
        apiFormData.append('guidelines_file', formData.guidelines_file);
      }
      apiFormData.append('company_context', formData.company_context);
      apiFormData.append('event_context', formData.event_context);

      const response = await fetch('/api/generate-background', {
        method: 'POST',
        body: apiFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate backgrounds');
      }

      const data: ApiResponse = await response.json();
      setGeneratedImages(data.urls);
    } catch (error) {
      console.error('Error:', error);
      // Use dummy data for demonstration
      setGeneratedImages([
        'https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg',
        'https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg',
        'https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg',
        'https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg',
      ]);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `background-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const downloadAllImages = async () => {
    for (const url of generatedImages) {
      await downloadImage(url);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row gap-8">
          {/* Left Sidebar - Now with height matching right side */}
          <div className="w-[300px] flex-shrink-0">
            <Card className="p-6 h-[600px] sticky top-8 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Backgrounds</h2>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Guidelines File
                  </label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Company Context
                  </label>
                  <Textarea
                    name="company_context"
                    value={formData.company_context}
                    onChange={handleInputChange}
                    placeholder="E.g., finds trends in fashion and lifestyle"
                    required
                    className="w-full resize-none min-h-[80px]"
                  />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Event Context
                    </label>
                    <Textarea
                        name="event_context"
                        value={formData.event_context}
                        onChange={handleInputChange}
                        placeholder="E.g., AI and data hackathon"
                        required
                        className="w-full resize-none min-h-[80px]"  // This makes it 2 lines tall
                    />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : 'Generate Backgrounds'}
                </Button>

                {generatedImages.length > 0 && (
                  <Button 
                    onClick={downloadAllImages}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                )}
              </form>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8 min-h-[600px]">
              <ImageGrid
                images={generatedImages}
                onImageClick={(url) => setSelectedImage(url)}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ''}
        onDownload={() => selectedImage && downloadImage(selectedImage)}
      />
    </div>
  );
};

export default BackgroundGenerator;