// components/TextSpecificationsTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TextSpecification {
  content: {
    headline: string;
    subheading: string;
    cta: string;
  };
  colors: {
    primary_text: string;
    secondary_text: string;
    cta_text: string;
  };
  typography: {
    primary: string;
    secondary: string;
    cta: string;
  };
  layout: {
    headline_position: string;
    subheading_position: string;
    cta_position: string;
  };
}

interface TextSpecificationsTableProps {
  specifications: TextSpecification[];
}

const TextSpecificationsTable: React.FC<TextSpecificationsTableProps> = ({ specifications }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
      <h3 className="text-xl font-semibold mb-4">Text Specifications</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Properties</TableHead>
              {specifications.map((_, index) => (
                <TableHead key={index} className="text-center">Photo {index + 1}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Content Section */}
            <TableRow className="bg-gray-50">
              <TableCell colSpan={specifications.length + 1} className="font-semibold">
                Content
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Headline</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.content.headline}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Subheading</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.content.subheading}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>CTA</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.content.cta}</TableCell>
              ))}
            </TableRow>

            {/* Typography Section */}
            <TableRow className="bg-gray-50">
              <TableCell colSpan={specifications.length + 1} className="font-semibold">
                Typography
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Primary</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.typography.primary}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Secondary</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.typography.secondary}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>CTA</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.typography.cta}</TableCell>
              ))}
            </TableRow>

            {/* Colors Section */}
            <TableRow className="bg-gray-50">
              <TableCell colSpan={specifications.length + 1} className="font-semibold">
                Colors
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Primary Text</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index} className="space-x-2">
                  <span
                    className="inline-block w-4 h-4 rounded"
                    style={{ backgroundColor: spec.colors.primary_text }}
                  />
                  <span>{spec.colors.primary_text}</span>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Secondary Text</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index} className="space-x-2">
                  <span
                    className="inline-block w-4 h-4 rounded"
                    style={{ backgroundColor: spec.colors.secondary_text }}
                  />
                  <span>{spec.colors.secondary_text}</span>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>CTA Text</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index} className="space-x-2">
                  <span
                    className="inline-block w-4 h-4 rounded"
                    style={{ backgroundColor: spec.colors.cta_text }}
                  />
                  <span>{spec.colors.cta_text}</span>
                </TableCell>
              ))}
            </TableRow>

            {/* Layout Section */}
            <TableRow className="bg-gray-50">
              <TableCell colSpan={specifications.length + 1} className="font-semibold">
                Layout
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Headline Position</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.layout.headline_position}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Subheading Position</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.layout.subheading_position}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>CTA Position</TableCell>
              {specifications.map((spec, index) => (
                <TableCell key={index}>{spec.layout.cta_position}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TextSpecificationsTable;