import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { convertToPng } from '@/lib/imageUtils';

export const dynamic = 'force-dynamic';

// Function to create PDF using PDFKit
async function createPortfolioPDF() {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      // Store PDF data
      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err: Error) => reject(err));

      // Add content to the PDF
      doc.fontSize(20).text('WebUtsav Pvt. Ltd.', 50, 50);
      doc.fontSize(12).text('Professional Portfolio', 50, 80);
      
      // Add more content here...
      doc.text('This is a test PDF generated with PDFKit that supports all image formats.');
      
      // Finalize the PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function GET() {
  try {
    const pdfBuffer = await createPortfolioPDF();
    // Convert Node Buffer to web-compatible BodyInit
    const pdfBytes = new Uint8Array(pdfBuffer);
    
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="WebUtsav_Portfolio_2025_Final.pdf"'
      }
    });
  } catch (error) {
    console.error('Error generating PDF with PDFKit:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}