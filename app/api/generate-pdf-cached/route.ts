import React from 'react';
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { PortfolioPDFWithCachedImages } from '@/lib/generatePDFWithCachedImages';
import { preloadAllImages } from '@/lib/imageCache';
import products from '@/data/products.json';
import clients from '@/data/clients.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Preload all images to ensure they're converted to supported formats
    console.log('Preloading images...');
    await preloadAllImages(products, clients);
    console.log('Images preloaded successfully');
    
    // Create the PDF component instance
    const MyDoc = React.createElement(PortfolioPDFWithCachedImages);
    
    // Render to Node Buffer
    const buffer = await renderToBuffer(MyDoc);
    // Convert to web-compatible BodyInit (Uint8Array)
    const pdfBytes = new Uint8Array(buffer);
    
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="WebUtsav_Portfolio_2025_Final.pdf"'
      }
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Error generating PDF: ' + (error.message || 'Unknown error'), { status: 500 });
  }
}