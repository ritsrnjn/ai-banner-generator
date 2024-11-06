'use client';

import React, { useState, useRef } from 'react';
// import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

// Type definitions
interface Position {
  x: number;
  y: number;
}

interface TextSpecification {
  text: string;
  color: string;
  font: string;
  placement: 'top' | 'center' | 'bottom';
}

interface ApiResponse {
  url: string;
  text_specifications: TextSpecification[];
}

interface TextElement extends TextSpecification {
  id: number;
  position: Position;
  fontSize: number;
}

interface FormData {
  guidelines_file: File | null;
  company_context: string;
  event_context: string;
}

const fonts = [
  'Arial',
  'Epilogue',
  'Times New Roman',
  'Helvetica',
  'Georgia',
  'Verdana',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Inter',
  'Playfair Display',
  'Source Sans Pro',
  'Ubuntu',
  'Merriweather'
] as const;

const fontSizes = [12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72] as const;

// API call function
const generateImage = async (formData: FormData): Promise<ApiResponse> => {
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
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Return dummy data in case of error
    return {
      url: "https://fal.media/files/monkey/-pYzAhN2ZH2yf-u17Xy-F_949708e4408c403bac4e5d99f1179bf9.jpg",
      text_specifications: [
        {
          text: "sample test heading",
          color: "#282828",
          font: "Epilogue",
          placement: "center"
        },
        {
          text: "sample test sub heading",
          color: "#282828",
          font: "Arial",
          placement: "bottom"
        }
      ]
    };
  }
};

const ImageEditor: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    guidelines_file: null,
    company_context: '',
    event_context: ''
  });

  const getInitialPosition = (position: TextSpecification['placement']): Position => {
    switch (position) {
      case 'top':
        return { x: 50, y: 50 };
      case 'center':
        return { x: 50, y: 200 };
      case 'bottom':
        return { x: 50, y: 350 };
      default:
        return { x: 50, y: 50 };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      const response = await generateImage(formData);
      setResult(response);
      
      // Initialize text elements with positions
      const initialElements: TextElement[] = response.text_specifications.map((spec, index) => ({
        ...spec,
        id: index,
        position: getInitialPosition(spec.placement),
        fontSize: 24
      }));
      
      setTextElements(initialElements);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextPropertyChange = (property: keyof Omit<TextElement, 'id' | 'position'>, value: string | number): void => {
    if (selectedElement === null) return;
    
    setTextElements(prev => prev.map(element => 
      element.id === selectedElement
        ? { ...element, [property]: value }
        : element
    ));
  };

  const handleDownload = async (): Promise<void> => {
    if (!editorRef.current) return;
    
    try {
      const canvas = await html2canvas(editorRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Fixed width sidebar */}
      <div className="w-[300px] h-full overflow-y-auto border-r bg-white p-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Guidelines File</label>
            <Input
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company Context</label>
            <Input
              name="company_context"
              value={formData.company_context}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Context</label>
            <Input
              name="event_context"
              value={formData.event_context}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : 'Generate'}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Text Properties</h3>
            
            <div>
              <label className="block text-sm mb-1">Font</label>
              <Select
                value={selectedElement !== null ? textElements[selectedElement]?.font : ''}
                onValueChange={(value) => handleTextPropertyChange('font', value)}
                disabled={selectedElement === null}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map(font => (
                    <SelectItem key={font} value={font}>{font}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-1">Size</label>
              <Select
                value={selectedElement !== null ? textElements[selectedElement]?.fontSize.toString() : ''}
                onValueChange={(value) => handleTextPropertyChange('fontSize', parseInt(value))}
                disabled={selectedElement === null}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map(size => (
                    <SelectItem key={size} value={size.toString()}>{size}px</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-1">Color</label>
              <Input
                type="color"
                value={selectedElement !== null ? textElements[selectedElement]?.color : '#000000'}
                onChange={(e) => handleTextPropertyChange('color', e.target.value)}
                disabled={selectedElement === null}
                className="h-10"
              />
            </div>

            <Button 
              onClick={handleDownload}
              className="w-full mt-4"
              disabled={!result}
            >
              Download Image
            </Button>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        {result ? (
          <div className="relative mx-auto" ref={editorRef}>
            <img
              ref={imageRef}
              src={result.url}
              alt="Generated Image"
              className="max-w-full h-auto"
            />
            
            {textElements.map((element, index) => (
              <Draggable
                key={element.id}
                defaultPosition={element.position}
                bounds="parent"
                onStop={(e, data) => {
                  const newElements = [...textElements];
                  newElements[index].position = { x: data.x, y: data.y };
                  setTextElements(newElements);
                }}
              >
                <div
                  className={`absolute cursor-move p-2 ${selectedElement === element.id ? 'ring-2 ring-blue-500' : ''}`}
                  style={{
                    fontFamily: element.font,
                    fontSize: `${element.fontSize}px`,
                    color: element.color,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.text}
                </div>
              </Draggable>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Generate an image to start editing
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;